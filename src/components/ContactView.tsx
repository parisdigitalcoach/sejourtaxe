import React, { useState } from "react";
import { Mail, Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactView() {
  const { language } = useLanguage();

  const translations: Record<string, any> = {
    fr: {
      title: "Contactez ",
      highlight: "l'Équipe",
      subtitle: "Une question sur le calculateur, ou un changement de taux municipal de taxe de séjour à nous signaler pour une commune ? Transmettez-nous vos retours.",
      success_title: "Message envoyé",
      success_desc: "Merci pour votre message. Notre équipe d'édition de SejourTaxe étudiera vos informations ou signalements de taux municipaux pour mettre à jour le simulateur dans les plus brefs délais.",
      btn_another: "Envoyer un autre message",
      err_required: "Veuillez compléter tous les champs obligatoires du formulaire.",
      err_email: "Veuillez saisir une adresse e-mail valide.",
      err_length: "Votre message doit contenir au moins 10 caractères.",
      lbl_name: "Votre nom",
      lbl_email: "Votre adresse e-mail",
      lbl_subject: "Objet de votre demande",
      lbl_commune: "Commune concernée",
      lbl_commune_opt: "(optionnel)",
      lbl_message: "Votre message",
      ph_name: "Jean Dupont",
      ph_email: "jean.dupont@exemple.com",
      ph_commune: "Ex: Paris, Bordeaux...",
      ph_message: "Décrivez votre demande en précisant bien le département, le type d'hébergement ainsi que les sources des nouveaux tarifs officiels de taxe de séjour...",
      opt1: "Signaler un nouveau tarif municipal (Mise à jour)",
      opt2: "Question sur le fonctionnement du calculateur",
      opt3: "Demande de partenariat ou régie publicitaire",
      opt4: "Autre demande générale",
      disclaimer: "En soumettant ce formulaire, vous acceptez que l'adresse e-mail saisie soit conservée pour nous permettre d'apporter une réponse à votre demande. Aucun démarchage commercial ou revente de vos données n'aura lieu.",
      btn_sending: "Envoi en cours...",
      btn_send: "Envoyer le message"
    },
    en: {
      title: "Contact the ",
      highlight: "Team",
      subtitle: "Have a question about the calculator, or a change in municipal tourist tax rates to report? Send us your feedback.",
      success_title: "Message Sent",
      success_desc: "Thank you for your message. Our editing team will review your information or rate reports to update the simulator as soon as possible.",
      btn_another: "Send another message",
      err_required: "Please fill in all required fields.",
      err_email: "Please enter a valid email address.",
      err_length: "Your message must be at least 10 characters long.",
      lbl_name: "Your name",
      lbl_email: "Your email address",
      lbl_subject: "Subject of your request",
      lbl_commune: "Concerned municipality",
      lbl_commune_opt: "(optional)",
      lbl_message: "Your message",
      ph_name: "John Doe",
      ph_email: "john.doe@example.com",
      ph_commune: "e.g., Paris, Bordeaux...",
      ph_message: "Describe your request, detailing the department, accommodation type, and official source of the tourist tax rates...",
      opt1: "Report a new municipal rate (Update)",
      opt2: "Question about the calculator",
      opt3: "Partnership or advertising request",
      opt4: "Other general inquiry",
      disclaimer: "By submitting this form, you agree that your email address will be stored to allow us to reply to your inquiry. No commercial solicitation or data resale will take place.",
      btn_sending: "Sending...",
      btn_send: "Send message"
    },
    de: {
      title: "Kontaktieren Sie das ",
      highlight: "Team",
      subtitle: "Haben Sie Fragen zum Rechner oder möchten Sie eine Änderung der kommunalen Kurtaxensätze für eine Gemeinde melden? Senden Sie uns Ihr Feedback.",
      success_title: "Nachricht gesendet",
      success_desc: "Vielen Dank für Ihre Nachricht. Unser Redaktionsteam wird Ihre Informationen oder Tarifmeldungen prüfen, um den Simulator so schnell wie möglich zu aktualisieren.",
      btn_another: "Eine weitere Nachricht senden",
      err_required: "Bitte füllen Sie alle Pflichtfelder des Formulars aus.",
      err_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      err_length: "Ihre Nachricht muss mindestens 10 Zeichen lang sein.",
      lbl_name: "Ihr Name",
      lbl_email: "Ihre E-Mail-Adresse",
      lbl_subject: "Gegenstand Ihrer Anfrage",
      lbl_commune: "Betroffene Gemeinde",
      lbl_commune_opt: "(optional)",
      lbl_message: "Ihre Nachricht",
      ph_name: "Max Mustermann",
      ph_email: "max.mustermann@example.com",
      ph_commune: "Z.B. Paris, Bordeaux...",
      ph_message: "Beschreiben Sie Ihre Anfrage und geben Sie dabei das Departement, die Unterkunftsart und die Quellen der neuen offiziellen Kurtaxensätze an...",
      opt1: "Einen neuen kommunalen Tarif melden (Aktualisierung)",
      opt2: "Frage zur Funktionsweise des Rechners",
      opt3: "Anfrage für eine Partnerschaft oder ein Werbenetzwerk",
      opt4: "Andere allgemeine Anfrage",
      disclaimer: "Mit dem Absenden dieses Formulars erklären Sie sich damit einverstanden, dass Ihre E-Mail-Adresse gespeichert wird, damit wir Ihre Anfrage beantworten können. Es erfolgt keine kommerzielle Werbung oder Weitergabe Ihrer Daten.",
      btn_sending: "Wird gesendet...",
      btn_send: "Nachricht senden"
    },
    es: {
      title: "Contactar con el ",
      highlight: "Equipo",
      subtitle: "¿Tiene alguna pregunta sobre la calculadora, o desea informarnos sobre un cambio de tarifas de la tasa de estancia de algún municipio? Envíenos sus comentarios.",
      success_title: "Mensaje enviado",
      success_desc: "Gracias por su mensaje. Nuestro equipo de redacción revisará su información o informes de tarifas para actualizar el simulador lo antes posible.",
      btn_another: "Enviar otro mensaje",
      err_required: "Por favor, complete todos los campos obligatorios del formulario.",
      err_email: "Por favor, introduzca una dirección de correo electrónico válida.",
      err_length: "Su mensaje debe tener al menos 10 caracteres.",
      lbl_name: "Su nombre",
      lbl_email: "Su correo electrónico",
      lbl_subject: "Asunto de su solicitud",
      lbl_commune: "Municipio afectado",
      lbl_commune_opt: "(opcional)",
      lbl_message: "Su mensaje",
      ph_name: "Juan Pérez",
      ph_email: "juan.perez@example.com",
      ph_commune: "Ej: París, Burdeos...",
      ph_message: "Describa su solicitud, detallando el departamento, el tipo de alojamiento y las fuentes de las nuevas tarifas oficiales de la tasa de estancia...",
      opt1: "Informar de una nueva tarifa municipal (Actualización)",
      opt2: "Pregunta sobre el funcionamiento de la calculadora",
      opt3: "Solicitud de colaboración o publicidad",
      opt4: "Otra consulta general",
      disclaimer: "Al enviar este formulario, acepta que su correo electrónico se almacene para responder a su solicitud. No se realizará ningún tipo de publicidad comercial ni venta de sus datos.",
      btn_sending: "Enviando...",
      btn_send: "Enviar mensaje"
    },
    it: {
      title: "Contatta il ",
      highlight: "Team",
      subtitle: "Hai una domanda sul calcolatore o vuoi segnalarci una variazione delle tariffe comunali della tassa di soggiorno? Inviaci la tua segnalazione.",
      success_title: "Messaggio inviato",
      success_desc: "Grazie per il messaggio. Il nostro team di redazione esaminerà le informazioni o le segnalazioni per aggiornare il simulatore nel più breve tempo possibile.",
      btn_another: "Invia un altro messaggio",
      err_required: "Si prega di completare tutti i campi obbligatori del modulo.",
      err_email: "Si prega di inserire un indirizzo e-mail valido.",
      err_length: "Il messaggio deve contenere almeno 10 caratteri.",
      lbl_name: "Il tuo nome",
      lbl_email: "Il tuo indirizzo e-mail",
      lbl_subject: "Oggetto della richiesta",
      lbl_commune: "Comune interessato",
      lbl_commune_opt: "(opzionale)",
      lbl_message: "Il tuo messaggio",
      ph_name: "Mario Rossi",
      ph_email: "mario.rossi@example.com",
      ph_commune: "Es: Parigi, Bordeaux...",
      ph_message: "Descrivi la tua richiesta, specificando bene il dipartimento, il tipo di struttura e le fonti delle nuove tariffe ufficiali della tassa di soggiorno...",
      opt1: "Segnalare una nuova tariffa comunale (Aggiornamento)",
      opt2: "Domanda sul funzionamento del calcolatore",
      opt3: "Richiesta di partnership o pubblicità",
      opt4: "Altra richiesta generale",
      disclaimer: "Inviando questo modulo, accetti che l'indirizzo e-mail inserito venga conservato per consentirci di rispondere alla tua richiesta. Non verrà effettuata alcuna attività di marketing o rivendita dei dati.",
      btn_sending: "Invio in corso...",
      btn_send: "Invia il messaggio"
    },
    zh: {
      title: "联系我们的",
      highlight: "内容编审团队",
      subtitle: "对本计算器有任何改进疑问，或者发现某个法国城市的最新旅游税率发生变动？欢迎随时通过此表单向我们提交反馈。",
      success_title: "留言发送成功",
      success_desc: "非常感谢您的留言与纠错反馈！SejourTaxe 编审中心将在核实对应省市的最新政府公报后，第一时间校准并更新本计算器的基础数据库。",
      btn_another: "发送另一条留言",
      err_required: "请填写表单中的所有必填项。",
      err_email: "请输入有效的电子邮箱地址。",
      err_length: "留言内容不得少于10个字。",
      lbl_name: "您的姓名",
      lbl_email: "您的电子邮箱",
      lbl_subject: "咨询或反馈的主题",
      lbl_commune: "涉及的法国城市/市镇",
      lbl_commune_opt: "(选填)",
      lbl_message: "反馈内容",
      ph_name: "张伟",
      ph_email: "zhangwei@example.com",
      ph_commune: "例如：巴黎 (Paris), 波尔多 (Bordeaux)...",
      ph_message: "请尽可能详细地写下您的诉求，若为纠错，请写明具体的省份（Département）、住宿类型，以及当地政府颁布最新税率公报的链接或来源...",
      opt1: "反馈或纠错城市最新的税率变动 (更新数据库)",
      opt2: "关于计算器算法及折算方式的技术疑问",
      opt3: "商务合作、友情链接或网站广告位投放咨询",
      opt4: "其他通用事务垂询",
      disclaimer: "提交此表单即代表您同意我们将您的电子邮箱安全存储在后台，仅用于后续回复您的本次咨询。本站严格遵守信息合规，绝不用于任何商业推广或将数据出售给第三方。",
      btn_sending: "正在安全传输中...",
      btn_send: "一键发送反馈邮件"
    }
  };

  const curr = translations[language] || translations.fr;

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
      setErrorMessage(curr.err_required);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage(curr.err_email);
      return;
    }

    if (formData.message.trim().length < 10) {
      setErrorMessage(curr.err_length);
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
          {curr.title}<span className="text-[#d1121d]">{curr.highlight}</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl font-medium">
          {curr.subtitle}
        </p>
      </div>

      <div className="border border-black p-6 sm:p-10 bg-white" id="contact-form-card">
        {isSubmitted ? (
          <div className="text-center py-10 space-y-6" id="success-state">
            <div className="h-12 w-12 bg-black text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6 text-[#d1121d]" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-black">{curr.success_title}</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-medium">
              {curr.success_desc}
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setFormData({ nom: "", email: "", sujet: "correction-taux", message: "", commune: "", website_hp: "" });
                  setIsSubmitted(false);
                  setErrorMessage(null);
                }}
                className="bg-black hover:bg-[#d1121d] text-white text-xs uppercase tracking-widest font-extrabold py-3.5 px-8 transition-all cursor-pointer border border-transparent"
                id="btn-send-another"
              >
                {curr.btn_another}
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
                  {curr.lbl_name} <span className="text-[#d1121d]">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder={curr.ph_name}
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  {curr.lbl_email} <span className="text-[#d1121d]">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={curr.ph_email}
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sujet */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  {curr.lbl_subject}
                </label>
                <select
                  disabled={isLoading}
                  value={formData.sujet}
                  onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                  className="w-full bg-white border border-black p-3 text-black text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="select-sujet"
                >
                  <option value="correction-taux">{curr.opt1}</option>
                  <option value="question">{curr.opt2}</option>
                  <option value="partenariat">{curr.opt3}</option>
                  <option value="autre">{curr.opt4}</option>
                </select>
              </div>

              {/* Commune (Optionnel) */}
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                  {curr.lbl_commune} <span className="text-slate-400 font-normal">{curr.lbl_commune_opt}</span>
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  value={formData.commune}
                  onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                  placeholder={curr.ph_commune}
                  className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50"
                  id="input-commune"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                {curr.lbl_message} <span className="text-[#d1121d]">*</span>
              </label>
              <textarea
                required
                rows={5}
                disabled={isLoading}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={curr.ph_message}
                className="w-full bg-white border border-black p-3 text-black text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black transition-all leading-relaxed disabled:opacity-50"
                id="textarea-message"
              />
            </div>

            <div className="border-t border-black/10 pt-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-[#d1121d] shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {curr.disclaimer}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d1121d] hover:bg-black text-white text-xs uppercase tracking-widest font-black py-4 px-8 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed border border-transparent"
                id="btn-submit-contact"
              >
                {isLoading ? (
                  <>
                    <span>{curr.btn_sending}</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{curr.btn_send}</span>
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
