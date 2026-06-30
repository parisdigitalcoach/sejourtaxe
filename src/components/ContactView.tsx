import React, { useState } from "react";
import { Mail, Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "correction-taux",
    message: "",
    commune: "",
    website_hp: "" // Honeypot anti-spam field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Frontend validations
    if (!formData.nom.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Veuillez compléter tous les champs obligatoires du formulaire.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage("Votre message doit contenir au moins 10 caractères.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi de votre message.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Une erreur inattendue est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10" id="contact-container">
      {/* Header */}
      <div className="py-8 border-b border-black/10" id="contact-header">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]">
          Contactez <span className="text-[#d1121d]">l'Équipe</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          Une question sur le calculateur, ou un changement de taux municipal de taxe de séjour à nous signaler pour une commune ? Transmettez-nous vos retours.
        </p>
      </div>

      <div className="border border-black p-6 sm:p-10 bg-white" id="contact-form-card">
        {isSubmitted ? (
          <div className="text-center py-10 space-y-6" id="success-state">
            <div className="h-12 w-12 bg-black text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6 text-[#d1121d]" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Message envoyé</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-medium">
              Merci pour votre message. Notre équipe d'édition de SejourTaxe étudiera vos informations ou signalements de taux municipaux pour mettre à jour le simulateur dans les plus brefs délais.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setFormData({ nom: "", email: "", sujet: "correction-taux", message: "", commune: "", website_hp: "" });
                  setIsSubmitted(false);
                  setErrorMessage(null);
                }}
                className="bg-black hover:bg-[#d1121d] text-white text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 transition-all cursor-pointer"
                id="btn-send-another"
              >
                Envoyer un autre message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
            {errorMessage && (
              <div className="bg-red-50 text-red-800 text-xs p-4 flex items-start gap-2 border border-red-200" id="error-banner">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                <div className="font-bold flex-1">
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Honeypot field (hidden from visual users) */}
            <div className="absolute -z-10 opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
              <label htmlFor="website_hp">Do not fill this field if you are human</label>
              <input
                id="website_hp"
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  Votre nom <span className="text-[#d1121d]">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Jean Dupont"
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  Votre adresse e-mail <span className="text-[#d1121d]">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jean.dupont@exemple.com"
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sujet */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  Objet de votre demande
                </label>
                <select
                  disabled={isLoading}
                  value={formData.sujet}
                  onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                  className="w-full bg-white border border-black p-3 text-black text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="select-sujet"
                >
                  <option value="correction-taux">Signaler un nouveau tarif municipal (Mise à jour)</option>
                  <option value="question">Question sur le fonctionnement du calculateur</option>
                  <option value="partenariat">Demande de partenariat ou régie publicitaire</option>
                  <option value="autre">Autre demande générale</option>
                </select>
              </div>

              {/* Commune (Optionnel) */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  Commune concernée <span className="text-slate-400 font-normal">(optionnel)</span>
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={formData.commune}
                  onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                  placeholder="Ex: Paris, Bordeaux..."
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-commune"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Votre message <span className="text-[#d1121d]">*</span>
              </label>
              <textarea
                required
                rows={5}
                disabled={isLoading}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez votre demande en précisant bien le département, le type d'hébergement ainsi que les sources des nouveaux tarifs officiels de taxe de séjour..."
                className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all leading-relaxed disabled:opacity-50"
                id="textarea-message"
              />
            </div>

            <div className="border-t border-black/10 pt-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#d1121d] shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                En soumettant ce formulaire, vous acceptez que l'adresse e-mail saisie soit conservée pour nous permettre d'apporter une réponse à votre demande. Aucun démarchage commercial ou revente de vos données n'aura lieu.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d1121d] hover:bg-black text-white text-xs uppercase tracking-widest font-black py-4 px-8 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
                id="btn-submit-contact"
              >
                {isLoading ? (
                  <>
                    <span>Envoi en cours...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Envoyer le message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
