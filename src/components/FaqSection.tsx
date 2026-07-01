import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();

  const faqTranslations: Record<string, { title: string; items: FaqItem[] }> = {
    fr: {
      title: "Questions Fréquentes",
      items: [
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
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
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
        },
        {
          question: "Quel est l'impact de la taxe de séjour sur l'investissement immobilier locatif (achat maison ou appartement en location saisonnière) ?",
          answer: "Pour un investisseur locatif, l'achat d'une maison ou d'un appartement destiné au tourisme et à la location saisonnière de vacances exige d'anticiper la taxe de séjour. Elle influe directement sur le rendement locatif net et la gestion locative globale du bien. Lors de l'estimation immobilière d'un projet d'achat ou d'un calcul de rentabilité pour une vente immobilière, l'investisseur doit intégrer ces taux communaux et taxes additionnelles pour optimiser son plan de financement et son rendement d'investissement immobilier."
        },
        {
          question: "Comment la taxe de séjour est-elle gérée dans la gestion locative professionnelle et l'estimation immobilière ?",
          answer: "La gestion locative professionnelle de meublés de tourisme et de gîtes de vacances inclut la collecte et la déclaration rigoureuse des taxes de séjour locales. En cas de vente immobilière d'un bien immobilier de rendement, l'historique des déclarations de taxe de séjour sert de justificatif officiel de la performance touristique et de l'occupation réelle du logement, ce qui valorise l'estimation immobilière auprès d'un futur acquéreur ou d'une agence immobilière."
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Who has to pay the tourist tax?",
          answer: "The tourist tax is payable by any person staying for a fee in a French tourist accommodation who does not have their main tax residence there. It therefore applies to holidaymakers, tourists, professionals on temporary business travel, etc. It is collected by the host (or by reservation intermediaries such as Airbnb, Booking.com) on behalf of the municipality or local authority."
        },
        {
          question: "Do children pay the tourist tax?",
          answer: "No, according to French tax legislation (article L. 2333-31 of the General Code of Local Authorities), minors under 18 years of age are completely exempt from the tourist tax throughout France. However, in the case of unclassified accommodation (proportional calculation), the number of children is still counted to divide and determine the price per person per night, although no tax is collected for them."
        },
        {
          question: "How is the tourist tax calculated for unclassified accommodation?",
          answer: (
            <div className="space-y-2">
              <p>For unclassified or non-rated accommodation (such as a non-certified holiday rental), the rate is proportional to the night's cost. Here are the official calculation steps:</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                <li><strong>Determine the night cost per person:</strong> Total price excl. tax divided by the total number of travelers (adults and children) and then divided by the number of nights.</li>
                <li><strong>Apply the percentage:</strong> Multiply this amount by the percentage set by the municipality (usually between 1% and 5%).</li>
                <li><strong>Check the cap:</strong> If the amount obtained exceeds the legal cap of the municipality or the category cap, it is reduced to the cap value.</li>
                <li><strong>Calculate final tax:</strong> Multiply this capped rate by the number of taxable adults and the number of nights.</li>
              </ol>
            </div>
          )
        },
        {
          question: "Is the tourist tax different in each municipality?",
          answer: "Yes, the tourist tax is a local tax. Each municipality or group of municipalities (EPCI) independently votes on its rates, the percentage rate for unclassified rentals, the collection period, and the application of additional taxes (departmental tax of 10%, regional tax, Île-de-France regional transport tax, etc.). This is why rates can vary significantly from one locality to another."
        },
        {
          question: "Does Airbnb automatically collect the tourist tax?",
          answer: "Yes, online booking platforms (such as Airbnb, Booking.com, Abritel) are legally required to automatically collect the tourist tax during online payment and transfer it directly to local authorities, as long as the municipality applies a fixed or percentage rate and the transaction is finalized on their website. If the booking is made directly with the host or outside of a platform, the owner / host is responsible for collecting and declaring it manually."
        },
        {
          question: "How does the tourist tax impact real estate investment (buying a house or apartment for holiday rentals)?",
          answer: "For real estate investors, purchasing a property (house or villa) for tourism or seasonal holiday rentals in France requires careful planning of the local tourist tax. It directly affects the net rental yield and the property management costs of the estate. When conducting a property valuation or estimating the returns on a real estate investment or potential real estate sale, including the local municipal tourist tax rates is crucial for a successful purchase and optimal investment performance."
        },
        {
          question: "How is the tourist tax handled in professional property management and real estate valuation?",
          answer: "Professional property management services for tourist accommodations handle the collection and reporting of the 'taxe de séjour'. When listing a property for a real estate sale, providing accurate, historical records of tourist tax payments serves as official proof of the rental history and commercial viability, which greatly enhances the property valuation for potential buyers or real estate agencies."
        }
      ]
    },
    de: {
      title: "Häufig gestellte Fragen",
      items: [
        {
          question: "Wer muss die Kurtaxe bezahlen?",
          answer: "Die Kurtaxe ist von jeder Person zu entrichten, die gegen Entgelt in einer französischen Touristenunterkunft übernachtet und dort nicht ihren Hauptwohnsitz hat. Sie gilt daher für Urlauber, Touristen, Geschäftsreisende usw. Sie wird vom Gastgeber (oder über Buchungsportale wie Airbnb, Booking.com) im Namen der Gemeinde oder der lokalen Behörde erhoben."
        },
        {
          question: "Zahlen Kinder die Kurtaxe?",
          answer: "Nein, nach der französischen Steuergesetzgebung (Artikel L. 2333-31 des Code général des collectivités territoriales) sind Minderjährige unter 18 Jahren in ganz Frankreich vollständig von der Kurtaxe befreit. Bei nicht klassifizierten Unterkünften (proportionale Berechnung) wird die Anzahl der Kinder jedoch weiterhin mitgezählt, um den Preis pro Person und Nacht zu ermitteln, obwohl für sie keine Steuer erhoben wird."
        },
        {
          question: "Wie wird die Kurtaxe für eine nicht klassifizierte Unterkunft berechnet?",
          answer: (
            <div className="space-y-2">
              <p>Für nicht klassifizierte Unterkünfte (z. B. eine nicht zertifizierte Ferienwohnung) ist der Tarif proportional zu den Übernachtungskosten. Hier sind die offiziellen Berechnungsschritte:</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                <li><strong>Ermitteln Sie die Übernachtungskosten pro Person:</strong> Gesamtpreis ohne MwSt. geteilt durch die Gesamtzahl der Reisenden (Erwachsene und Kinder) und dann geteilt durch die Anzahl der Nächte.</li>
                <li><strong>Prozentsatz anwenden:</strong> Multiplizieren Sie diesen Betrag mit dem von der Gemeinde festgelegten Prozentsatz (in der Regel zwischen 1 % und 5 %).</li>
                <li><strong>Obergrenze prüfen:</strong> Wenn der ermittelte Betrag die gesetzliche Obergrenze der Gemeinde oder der Kategorie überschreitet, wird er auf den Höchstbetrag begrenzt.</li>
                <li><strong>Endgültige Steuer berechnen:</strong> Multiplizieren Sie diesen gedeckelten Satz mit der Anzahl der steuerpflichtigen Erwachsenen und der Anzahl der Nächte.</li>
              </ol>
            </div>
          )
        },
        {
          question: "Ist die Kurtaxe je nach Gemeinde unterschiedlich?",
          answer: "Ja, die Kurtaxe ist eine lokale Steuer. Jede Gemeinde oder Gemeindeverband (EPCI) beschließt unabhängig über ihre Tarife, den Prozentsatz für nicht klassifizierte Unterkünfte, den Erhebungszeitraum sowie die Erhebung zusätzlicher Steuern (z. B. Departementssteuer von 10 %, Regionalsteuern usw.). Deshalb variieren die Tarife zwischen den einzelnen Orten teilweise erheblich."
        },
        {
          question: "Erhebt Airbnb die Kurtaxe automatisch?",
          answer: "Ja, Online-Buchungsplattformen (wie Airbnb, Booking.com, Abritel) sind gesetzlich verpflichtet, die Kurtaxe bei der Online-Zahlung automatisch einzuziehen und direkt an die Gemeinden abzuführen, sofern die Gemeinde einen festen oder prozentualen Tarif anwendet und die Transaktion auf ihrer Website abgeschlossen wird. Bei Direktbuchungen oder außerhalb einer Plattform muss der Eigentümer/Gastgeber die Steuer manuell einziehen und deklarieren."
        }
      ]
    },
    es: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Quién debe pagar la tasa de estancia?",
          answer: "La tasa de estancia la debe pagar cualquier persona que se aloje previo pago en un alojamiento turístico francés sin tener allí su residencia fiscal principal. Por tanto, se aplica a veraneantes, turistas, profesionales en viaje de negocios temporal, etc. La recauda el anfitrión (o a través de intermediarios como Airbnb, Booking.com) en nombre del municipio o de la administración local."
        },
        {
          question: "¿Los niños pagan la tasa de estancia?",
          answer: "No, según la legislación fiscal francesa (artículo L. 2333-31 del Código General de las Entidades Locales), los menores de 18 años están totalmente exentos de la tasa de estancia en toda Francia. Sin embargo, en el caso de alojamientos no clasificados (cálculo proporcional), el número de niños se sigue contabilizando para dividir y determinar el precio por persona y noche, aunque no se recauda ninguna tasa por ellos."
        },
        {
          question: "¿Cómo se calcula la tasa de estancia para un alojamiento no clasificado?",
          answer: (
            <div className="space-y-2">
              <p>Para un alojamiento no clasificado o sin categoría (como un alquiler vacacional no certificado), la tarifa es proporcional al coste de la noche. Pasos oficiales para el cálculo:</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                <li><strong>Determinar el coste de la noche por persona:</strong> Precio total sin IVA del alojamiento dividido por el número total de viajeros (adultos y niños) y luego dividido por el número de noches.</li>
                <li><strong>Aplicar el porcentaje:</strong> Multiplicar este importe por el porcentaje fijado por el municipio (generalmente entre el 1% y el 5%).</li>
                <li><strong>Verificar el límite máximo:</strong> Si el importe obtenido supera el límite legal del municipio o de su categoría, se reduce al valor límite.</li>
                <li><strong>Calcular la tasa final:</strong> Multiplicar esta tarifa limitada por el número de adultos imponibles y el número de noches.</li>
              </ol>
            </div>
          )
        },
        {
          question: "¿La tasa de estancia es diferente según el municipio?",
          answer: "Sí, la tasa de estancia es un impuesto local. Cada municipio o agrupación de municipios (EPCI) aprueba de forma autónoma sus tarifas, el porcentaje para los alojamientos no clasificados, el periodo de cobro y la aplicación de tasas adicionales (tasa departamental del 10%, tasa regional, etc.). Por eso las tarifas varían significativamente de una localidad a otra."
        },
        {
          question: "¿Airbnb cobra automáticamente la tasa de estancia?",
          answer: "Sí, las plataformas de reserva en línea (como Airbnb, Booking.com, Abritel) ont la obligación legal de cobrar automáticamente la tasa de estancia durante el pago en línea y transferirla directamente a las administraciones locales, siempre que el municipio aplique una tarifa fija o un porcentaje y la transacción se finalice en su web. Si la reserva se realiza directamente o fuera de las plataformas, corresponde al propietario/anfitrión cobrarla y declararla manualmente."
        },
        {
          question: "¿Cómo afecta la tasa de estancia a la inversión inmobiliaria (compra de casa o apartamento para alquiler vacacional)?",
          answer: "Para un inversor inmobiliario, la compra de una casa o apartamento destinado al turismo y alquiler de vacaciones requiere anticipar la tasa de estancia. Esto influye directamente en el rendimiento de la inversión neta y la gestión de la propiedad. Al realizar la valoración o estimación inmobiliaria de un proyecto de compra o venta de inmuebles de rendimiento, es esencial incluir estas tasas locales para optimizar el plan de financiación."
        },
        {
          question: "¿Cómo se gestiona la tasa de estancia en la administración de propiedades y la valoración inmobiliaria?",
          answer: "La gestión profesional de alquileres turísticos de apartamentos y casas de vacaciones incluye la recaudación y declaración rigurosa de las tasas de estancia locales. En caso de venta inmobiliaria de un alojamiento turístico, el historial de tasas pagadas sirve como justificante de rentabilidad real para los compradores, lo que mejora considerablemente la estimación de valor del inmueble por parte de las agencias inmobiliarias."
        }
      ]
    },
    it: {
      title: "Domande Frequenti",
      items: [
        {
          question: "Chi deve pagare la tassa di soggiorno?",
          answer: "La tassa di soggiorno è dovuta da chiunque soggiorni a pagamento in una struttura ricettiva francese senza avervi la residenza fiscale principale. Si applica quindi a villeggianti, turisti, professionisti in trasferta temporanea, ecc. Viene riscossa dall'host (o tramite intermediari di prenotazione come Airbnb, Booking.com) per conto del comune o dell'ente locale."
        },
        {
          question: "I bambini pagano la tassa di soggiorno?",
          answer: "No, ai sensi della legislazione fiscale francese (articolo L. 2333-31 del Codice generale degli enti locali), i minori di 18 anni sono totalmente esenti dalla tassa di soggiorno in tutta la Francia. Tuttavia, nel caso di alloggi non classificati (calcolo proporzionale), il numero di bambini viene comunque conteggiato per dividere e determinare il prezzo a persona a notte, sebbene non venga riscossa alcuna tassa per loro."
        },
        {
          question: "Come si calcola la tassa di soggiorno per un alloggio non classificato?",
          answer: (
            <div className="space-y-2">
              <p>Per gli alloggi non classificati o senza categoria (come un affitto turistico non certificato), la tariffa è proporzionale al costo del pernottamento. Ecco i passaggi di calcolo ufficiali:</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                <li><strong>Determinare il costo del pernottamento per persona:</strong> Prezzo totale esente da IVA diviso per il numero totale di viaggiatori (adulti e bambini) e poi diviso per il numero di notti.</li>
                <li><strong>Applicare la percentuale:</strong> Moltiplicare questo importo per la percentuale stabilita dal comune (di solito tra l'1% e il 5%).</li>
                <li><strong>Verificare il limite massimo (cap):</strong> Se l'importo ottenuto supera il limite massimo legale del comune o della categoria, viene ricondotto al valore massimo consentito.</li>
                <li><strong>Calcolare la tassa finale:</strong> Moltiplicare questa tariffa limitata per il numero di adulti imponibili e il numero di notti.</li>
              </ol>
            </div>
          )
        },
        {
          question: "La tassa di soggiorno è diversa a seconda del comune?",
          answer: "Sì, la tassa di soggiorno è un'imposta locale. Ciascun comune o raggruppamento di comuni (EPCI) delibera in autonomia le proprie tariffe, la percentuale per gli alloggi non classificati, il periodo di riscossione e l'applicazione di tasse addizionali (tassa provinciale del 10%, tasse regionali, ecc.). Per questo motivo le tariffe variano talvolta in modo significativo da una località alla altra."
        },
        {
          question: "Airbnb riscuote automaticamente la tassa di soggiorno?",
          answer: "Sì, le piattaforme di prenotazione online (come Airbnb, Booking.com, Abritel) hanno l'obbligo legale di riscuotere automaticamente la tassa di soggiorno al momento del pagamento online e di riversarla direttamente agli enti locali, a condizione che il comune applichi una tariffa fissa o percentuale e che la transazione sia completata sul loro sito. Se la prenotazione avviene direttamente o fuori piattaforma, spetta al proprietario/host riscuoterla e dichiararla manualmente."
        }
      ]
    },
    zh: {
      title: "常见问题解答 (FAQ)",
      items: [
        {
          question: "谁需要缴纳旅游税 (Taxe de séjour)？",
          answer: "在法国任何收费性旅游住宿场所（如民宿、酒店、露营地等）中居住、且其主要申报纳税地址不在该地方行政区的所有非本地居民，均需缴纳旅游税。这主要适用于度假者、游客、临时出差的专业人员等。该税由房东或预订代理平台（如Airbnb、Booking.com）代收，并最终全额转交给当地市政府或市镇联合体。"
        },
        {
          question: "儿童需要缴纳旅游税吗？",
          answer: "不需要。根据法国地方行政合作税法典第 L. 2333-31 条的明确规定，全法国范围内未满18周岁的未成年人一律免征旅游税。不过，如果是未评级的非标准住宿（适用比例百分比计税法），在计算每人每晚的平均房费时，儿童仍会作为计税基数的分母之一参与除法，以公摊单间房费，但在最终收取税款时，会自动排除属于儿童的份额。"
        },
        {
          question: "无星级评级的非标准民宿，其旅游税该如何计算？",
          answer: (
            <div className="space-y-2">
              <p>对于未获得官方星级分类评级（Non classé）或无等级的住宿源，旅游税采取按每人每夜实际房费一定比例（比例税率）计算。法国官方规定的标准步骤如下：</p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                <li><strong>确定每人每晚的净房价：</strong>将扣除增值税 (HT) 后的租房总价，除以入住的总人数（包括成人和儿童），再除以总入住天数（晚数）。</li>
                <li><strong>应用比例税率：</strong>用上述算出的单人净房费，乘以当地市政府决议确定的百分比税率（通常在 1% 到 5% 之间）。</li>
                <li><strong>检查官方最高限额：</strong>如果算出的税额高于该市政府针对这一级别住宿所设定的法定上限（Plafond），则一律按上限金额收取。</li>
                <li><strong>计算最终税款总额：</strong>将经过上限校验后的每人每晚税额，乘以实际需要缴税的成年人数量（剔除未成年人），再乘以入住天数。</li>
              </ol>
            </div>
          )
        },
        {
          question: "不同城市的旅游税标准是一样的吗？",
          answer: "完全不同。旅游税在法国属于地方自治税。每个市镇或市镇联盟（EPCI）均有权自主投票决定其具体的固定税率、未评级住宿的比例税率百分比、每年的征收周期，以及是否加征额外的省/大区附加税（例如 10% 的省附加税或大区交通税等）。因此，不同城市之间的税率可能存在极大的差距。"
        },
        {
          question: "Airbnb 等在线平台会自动扣缴旅游税吗？",
          answer: "是的。根据法国最新财税法案规定，凡是通过 Airbnb、Booking.com、Abritel 等第三方在线预订平台完成线上支付的，平台必须代扣代缴旅游税，并直接申报转交至目的地市政财政部门。然而，如果房东与房客是私下直订或未通过平台结算，则必须由房东在宿处现场收取并手动申报该笔税款。"
        }
      ]
    }
  };

  const currentFaq = faqTranslations[language] || faqTranslations.fr;
  const faqs = currentFaq.items;

  return (
    <section className="bg-transparent py-10" id="faq-section">
      <div className="flex items-center gap-3 mb-8 border-b border-black pb-4">
        <HelpCircle className="h-5 w-5 text-black" />
        <h2 className="text-xl font-black text-black tracking-tight uppercase">{currentFaq.title}</h2>
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
                <div className="mt-4 text-slate-700 leading-relaxed text-sm sm:text-base animate-fade-in font-medium">
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
