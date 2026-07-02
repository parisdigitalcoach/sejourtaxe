import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enforce HTTPS Redirection in Production (Cloud Run / Proxies)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers["x-forwarded-proto"];
    if (proto && proto !== "https") {
      console.log(`[HTTPS Redirect] Redirecting HTTP request to HTTPS: ${req.headers.host}${req.url}`);
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
  }
  next();
});

// Body parser
app.use(express.json());

// Simple In-Memory IP Rate Limiting Store
interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimits = new Map<string, RateLimitInfo>();

const getClientIp = (req: express.Request): string => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ipStr = typeof forwarded === "string" ? forwarded : forwarded[0];
    return ipStr.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
};

const checkRateLimit = (ip: string): { allowed: boolean; waitMinutes?: number } => {
  const now = Date.now();
  const limitWindow = 15 * 60 * 1000; // 15 minutes window
  const maxRequests = 5; // Max 5 emails per 15 minutes

  const clientLimit = rateLimits.get(ip);
  if (!clientLimit) {
    rateLimits.set(ip, { count: 1, resetTime: now + limitWindow });
    return { allowed: true };
  }

  if (now > clientLimit.resetTime) {
    // Reset window
    rateLimits.set(ip, { count: 1, resetTime: now + limitWindow });
    return { allowed: true };
  }

  if (clientLimit.count >= maxRequests) {
    const waitMs = clientLimit.resetTime - now;
    const waitMinutes = Math.ceil(waitMs / (60 * 1000));
    return { allowed: false, waitMinutes };
  }

  clientLimit.count += 1;
  return { allowed: true };
};

// API POST endpoint for contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { nom, email, sujet, message, commune, website_hp } = req.body;
    const userAgent = req.headers["user-agent"] || "Inconnu";
    const dateStr = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
    const clientIp = getClientIp(req);

    // 1. Honeypot check (Spam Prevention)
    if (website_hp) {
      console.warn(`[Spam Blocked] Honeypot field filled from IP ${clientIp}: ${website_hp}`);
      // Silently return success to avoid letting the bot know we blocked it, or return 400
      return res.status(400).json({ error: "Spam suspecté." });
    }

    // 2. Form Input Validation
    if (!nom || !nom.trim()) {
      return res.status(400).json({ error: "Le nom est obligatoire." });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Une adresse e-mail valide est obligatoire." });
    }
    if (!sujet || !sujet.trim()) {
      return res.status(400).json({ error: "L'objet est obligatoire." });
    }
    if (!message || !message.trim() || message.trim().length < 10) {
      return res.status(400).json({ error: "Le message est obligatoire (minimum 10 caractères)." });
    }

    // 3. Rate Limiting Check
    const rateLimitResult = checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({ 
        error: `Trop de demandes. Veuillez patienter ${rateLimitResult.waitMinutes} minute(s) avant de soumettre un nouveau message.` 
      });
    }

    // 4. Lazy Brevo API Key Verification (Fail fast with clear error if missing)
    const requiredEnv = [
      "BREVO_API_KEY",
      "CONTACT_TO_EMAIL",
      "CONTACT_FROM_EMAIL"
    ];
    const missingEnv = requiredEnv.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      console.error(`[Brevo API Error] Configuration manquante : ${missingEnv.join(", ")}`);
      return res.status(500).json({ 
        error: "Le service de messagerie n'est pas configuré. Veuillez contacter l'administrateur.",
        details: `Variables manquantes : ${missingEnv.join(", ")}`
      });
    }

    // Subject mappings for cleaner display
    const sujetLabels: Record<string, string> = {
      "correction-taux": "Signaler un nouveau tarif municipal (Mise à jour)",
      "question": "Question sur le fonctionnement du calculateur",
      "partenariat": "Demande de partenariat ou régie publicitaire",
      "autre": "Autre demande générale"
    };
    const humanReadableSubject = sujetLabels[sujet] || sujet;

    // Compose Email HTML
    const emailSubject = `[SejourTaxe] ${humanReadableSubject}`;
    const communeHtml = commune ? `<p><strong>Commune concernée :</strong> ${commune}</p>` : "";

    const htmlBody = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
  <h2 style="color: #d1121d; border-bottom: 2px solid #d1121d; padding-bottom: 10px; margin-top: 0;">Nouveau message de contact</h2>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 6px 0; font-weight: bold; width: 120px;">Nom :</td>
      <td style="padding: 6px 0;">${nom}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; font-weight: bold;">Email :</td>
      <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 6px 0; font-weight: bold;">Objet :</td>
      <td style="padding: 6px 0;">${humanReadableSubject}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0; font-weight: bold;">Date :</td>
      <td style="padding: 6px 0;">${dateStr}</td>
    </tr>
    ${communeHtml}
    <tr>
      <td style="padding: 6px 0; font-weight: bold;">IP Client :</td>
      <td style="padding: 6px 0; font-family: monospace; font-size: 12px;">${clientIp}</td>
    </tr>
  </table>
  
  <div style="background-color: #f9f9f9; border-left: 4px solid #d1121d; padding: 15px; margin-bottom: 20px; white-space: pre-wrap;">
<strong>Message :</strong><br/>
${message}
  </div>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <p style="font-size: 11px; color: #888; margin-bottom: 0;">
    Ce message a été généré automatiquement depuis le formulaire de contact de SejourTaxe.com.<br/>
    Navigateur client : ${userAgent}
  </p>
</div>
    `.trim();

    // Call Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "SejourTaxe",
          email: process.env.CONTACT_FROM_EMAIL!,
        },
        to: [
          {
            email: process.env.CONTACT_TO_EMAIL!,
          },
        ],
        replyTo: {
          email,
          name: nom,
        },
        subject: emailSubject,
        htmlContent: htmlBody,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      throw new Error(`Erreur Brevo API: ${errorText}`);
    }

    console.log(`[Email Sent] Successfully sent contact email from ${email} via Brevo (IP: ${clientIp})`);
    return res.status(200).json({ success: true, message: "Message envoyé avec succès." });

  } catch (error: any) {
    console.error("[Brevo Error] Failed to send email:", error);
    return res.status(500).json({ 
      error: "Une erreur interne est survenue lors de l'envoi de votre e-mail.",
      details: error.message || error
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve client router fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} (http://localhost:${PORT})`);
  });
}

startServer();
