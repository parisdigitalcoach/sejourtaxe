import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Qui doit payer la taxe de séjour ?",
      answer: "La taxe de séjour est due par toute personne qui réside à titre payant dans un hébergement touristique français sans y posséder de résidence fiscale principale. Elle s'applique donc aux vacanciers, touristes, professionnels en déplacement temporaire, etc. Elle est perçue par l'hébergeur (ou par l'intermédiaire de réservation comme Airbnb, Booking.com) pour le compte de la commune ou de la collectivité locale."
    },
    {
      question: "Les enfants paient-ils la taxe de séjour ?",
      answer: "Non, selon la législation fiscale française (article L. 2333-31 du Code général des collectivités territoriales), les mineurs de moins de 18 ans sont totalement exonérés de la taxe de séjour dans toute la France. Cependant, dans le cas d'un hébergement non classé (calcul proportionnel), le nombre d'enfants reste comptabilisé pour diviser et déterminer le prix par personne et par nuit, bien qu'aucune taxe ne soit perçue pour eux."
    },
    {
      question: "Comment calculer la taxe de séjour pour un logement non classé ?",
      answer: (
        <div className="space-y-2">
          <p>Pour un hébergement non classé ou sans classement (comme un meublé de tourisme non labellisé), la tarification est proportionnelle au coût de la nuitée. Voici les étapes de calcul officiel :</p>
          <ol className="list-decimal pl-5 space-y-1 text-slate-700">
            <li><strong>Déterminer le coût de la nuitée par personne :</strong> Prix total HT du séjour divisé par le nombre total de voyageurs (adultes et enfants) puis divisé par le nombre de nuits.</li>
            <li><strong>Appliquer le pourcentage :</strong> Multiplier ce montant par le pourcentage fixé par la commune (entre 1% et 5% en général).</li>
            <li><strong>Vérifier le plafond :</strong> Si le montant obtenu dépasse le plafond légal de la commune ou le plafond de sa catégorie, il est ramené à la valeur du plafond.</li>
            <li><strong>Calculer la taxe finale :</strong> Multiplier ce tarif plafonné par le nombre d'adultes taxables et le nombre de nuits.</li>
          </ol>
        </div>
      )
    },
    {
      question: "La taxe de séjour est-elle différente selon la commune ?",
      answer: "Oui, la taxe de séjour est un impôt local. Chaque commune ou groupement de communes (EPCI) vote de manière autonome ses tarifs, le taux de pourcentage pour les meublés non classés, la durée de la période de perception, ainsi que l'application de taxes additionnelles (départementale de 10%, régionale, régionale transport d'Île-de-France, etc.). C'est pourquoi les tarifs varient parfois considérablement d'une localité à l'autre."
    },
    {
      question: "Airbnb collecte-t-il automatiquement la taxe de séjour ?",
      answer: "Oui, les plateformes de réservation en ligne (comme Airbnb, Booking.com, Abritel) ont l'obligation légale de collecter automatiquement la taxe de séjour lors du paiement en ligne et de la reverser directement aux collectivités, dès lors que la commune applique un tarif fixe ou au pourcentage et que la transaction est finalisée sur leur site. Si la réservation se fait en direct ou hors plateforme, c'est au propriétaire / hébergeur de la percevoir et de la déclarer manuellement."
    }
  ];

  return (
    <section className="bg-transparent py-10">
      <div className="flex items-center gap-3 mb-8 border-b border-black pb-4">
        <HelpCircle className="h-5 w-5 text-black" />
        <h2 className="text-xl font-black text-black tracking-tight uppercase">Questions Fréquentes</h2>
      </div>

      <div className="divide-y divide-black/15">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="py-6 transition-colors duration-150"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-start text-left group cursor-pointer"
              >
                <div className="flex-1 pr-4">
                  <span className="text-base sm:text-lg font-bold text-black group-hover:text-[#d1121d] transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-[#d1121d]" />
                  ) : (
                    <Plus className="h-5 w-5 text-black group-hover:text-[#d1121d]" />
                  )}
                </div>
              </button>
              
              {isOpen && (
                <div className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
