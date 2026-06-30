// @ts-nocheck
import nodemailer from "nodemailer";

interface Env {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_SECURE: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

// In-memory rate limiting map for Cloudflare Workers (per isolate)
const rateLimits = new Map<string, { count: number; resetTime: number }>();

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body: any = await request.json();
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
    const userAgent = request.headers.get("User-Agent") || "unknown";
    const dateStr = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

    const { nom, email, sujet, message, commune, website_hp } = body;

    // 1. Honeypot check (Spam Protection)
    if (website_hp) {
      console.warn(`[Spam Blocked] Honeypot filled by IP ${clientIp}`);
      return new Response(JSON.stringify({ error: "Spam suspecté." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Validate inputs
    if (!nom || !nom.trim()) {
      return new Response(JSON.stringify({ error: "Le nom est obligatoire." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Une adresse e-mail valide est obligatoire." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!sujet || !sujet.trim()) {
      return new Response(JSON.stringify({ error: "L'objet est obligatoire." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!message || !message.trim() || message.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Le message est obligatoire (minimum 10 caractères)." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. Basic IP Rate Limiting (Workers are serverless but this protects the isolate/origin)
    const now = Date.now();
    const limitWindow = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    const clientLimit = rateLimits.get(clientIp);
    if (!clientLimit) {
      rateLimits.set(clientIp, { count: 1, resetTime: now + limitWindow });
    } else if (now > clientLimit.resetTime) {
      rateLimits.set(clientIp, { count: 1, resetTime: now + limitWindow });
    } else if (clientLimit.count >= maxRequests) {
      const waitMinutes = Math.ceil((clientLimit.resetTime - now) / (60 * 1000));
      return new Response(JSON.stringify({
        error: `Trop de demandes. Veuillez patienter ${waitMinutes} minute(s) avant de soumettre un nouveau message.`
      }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      clientLimit.count += 1;
    }

    // 4. Validate Cloudflare Environment Variables
    const requiredEnvKeys: (keyof Env)[] = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "CONTACT_TO_EMAIL",
      "CONTACT_FROM_EMAIL"
    ];
    const missingEnv = requiredEnvKeys.filter((key) => !env[key]);
    if (missingEnv.length > 0) {
      console.error(`[SMTP Error] Configuration manquante : ${missingEnv.join(", ")}`);
      return new Response(JSON.stringify({
        error: "Le serveur de messagerie n'est pas configuré. Veuillez contacter l'administrateur.",
        details: `Variables manquantes : ${missingEnv.join(", ")}`
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 5. Setup nodemailer transporter (Requires nodejs_compat enabled in Cloudflare Pages settings)
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT || "587", 10),
      secure: env.SMTP_SECURE === "true",
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    });

    const sujetLabels: Record<string, string> = {
      "correction-taux": "Signaler un nouveau tarif municipal (Mise à jour)",
      "question": "Question sur le fonctionnement du calculateur",
      "partenariat": "Demande de partenariat ou régie publicitaire",
      "autre": "Autre demande générale"
    };
    const humanReadableSubject = sujetLabels[sujet] || sujet;

    const emailSubject = `[SejourTaxe] ${humanReadableSubject}`;
    const communeText = commune ? `Commune concernée : ${commune}\n` : "";

    const textBody = `
Nouveau message de contact reçu sur SejourTaxe.com (Cloudflare Pages)

Nom : ${nom}
Email : ${email}
Objet : ${humanReadableSubject}
Date : ${dateStr}
IP Client : ${clientIp}
User-Agent : ${userAgent}
${communeText}
---------------------------------------------------------
Message :
${message}
---------------------------------------------------------
    `.trim();

    const htmlBody = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
  <h2 style="color: #d1121d; border-bottom: 2px solid #d1121d; padding-bottom: 10px; margin-top: 0;">Nouveau message de contact (Cloudflare Pages)</h2>
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
    ${commune ? `<tr><td style="padding: 6px 0; font-weight: bold;">Commune :</td><td style="padding: 6px 0;">${commune}</td></tr>` : ""}
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

    await transporter.sendMail({
      from: `"${nom} via SejourTaxe" <${env.CONTACT_FROM_EMAIL}>`,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody
    });

    return new Response(JSON.stringify({ success: true, message: "Message envoyé avec succès." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("[Cloudflare SMTP Error]", error);
    return new Response(JSON.stringify({
      error: "Une erreur est survenue lors du traitement de l'envoi de l'e-mail.",
      details: error.message || error
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
