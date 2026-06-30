export async function onRequestPost({ request, env }: any) {
  try {
    const body = await request.json();

    const name = body.nom || body.name || "";
    const email = body.email || "";
    const rawSubject = body.sujet || body.subject || "Nouveau message";
    const message = body.message || "";
    const commune = body.commune || "";
    const website_hp = body.website_hp || "";

    // Honeypot check for spam prevention
    if (website_hp) {
      console.warn("[Spam Blocked] Honeypot field filled");
      return new Response(
        JSON.stringify({ error: "Spam suspecté." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Server-side validation
    if (!name.trim()) {
      return new Response(
        JSON.stringify({ error: "Le nom est obligatoire." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Une adresse e-mail valide est obligatoire." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!rawSubject.trim()) {
      return new Response(
        JSON.stringify({ error: "L'objet est obligatoire." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!message.trim() || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Le message est obligatoire (minimum 10 caractères)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Map subject values to clean French labels if applicable
    const subjectLabels: Record<string, string> = {
      "correction-taux": "Signaler un nouveau tarif municipal (Mise à jour)",
      "question": "Question sur le fonctionnement du calculateur",
      "partenariat": "Demande de partenariat ou régie publicitaire",
      "autre": "Autre demande générale"
    };
    const humanReadableSubject = subjectLabels[rawSubject] || rawSubject;

    const subjectLine = `[SejourTaxe] ${humanReadableSubject}`;
    const communeHtml = commune ? `<p><strong>Commune concernée :</strong> ${commune}</p>` : "";

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "SejourTaxe",
          email: env.CONTACT_FROM_EMAIL,
        },
        to: [
          {
            email: env.CONTACT_TO_EMAIL,
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject: subjectLine,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #d1121d; border-bottom: 2px solid #d1121d; padding-bottom: 10px; margin-top: 0;">Nouveau message de contact</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Objet :</strong> ${humanReadableSubject}</p>
            ${communeHtml}
            <p><strong>Message :</strong></p>
            <div style="background-color: #f9f9f9; border-left: 4px solid #d1121d; padding: 15px; margin-bottom: 20px; white-space: pre-wrap;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[Brevo API Error]: ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Une erreur est survenue lors de l'envoi du message via Brevo." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Erreur interne." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
