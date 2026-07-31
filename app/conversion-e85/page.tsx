import type { Metadata } from "next";
import Image from "next/image";
import {
  CheckCircle2,
  Fuel,
  Gauge,
  Wallet,
  XCircle,
} from "lucide-react";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conversion E85 | AMK Développement",
  description:
    "Conversion et cartographie flexfuel E85 : idées reçues, économies réelles à la pompe et calcul des gains sur une année.",
};

const MYTHS = [
  {
    mythe: "L'E85 abîme le moteur.",
    realite:
      "Avec une cartographie flexfuel développée sur mesure, le moteur s'adapte automatiquement au mélange SP98/E85. Le risque vient d'un ajout d'E85 sans adaptation, pas du carburant lui-même.",
  },
  {
    mythe: "Il faut une voiture neuve ou un modèle spécifique.",
    realite:
      "La grande majorité des moteurs essence, turbo ou atmosphériques, peuvent être convertis. Un boîtier ou une cartographie flexfuel suffit, sans toucher au moteur.",
  },
  {
    mythe: "La conversion coûte cher et met des années à être rentabilisée.",
    realite:
      "Avec l'écart de prix actuel entre le SP98 et l'E85, l'investissement est généralement amorti en quelques mois pour un usage courant. Le calcul est détaillé plus bas.",
  },
  {
    mythe: "Rouler à l'E85 fait perdre de la puissance.",
    realite:
      "L'indice d'octane plus élevé de l'E85 permet au contraire d'exploiter des réglages plus poussés : un gain de puissance est même possible avec une cartographie adaptée.",
  },
  {
    mythe: "C'est un carburant expérimental et peu fiable.",
    realite:
      "L'E85 est distribué et réglementé en France depuis 2007, disponible dans des milliers de stations, et utilisé quotidiennement par des centaines de milliers d'automobilistes.",
  },
  {
    mythe: "Ça ne vaut le coup que si on cherche de la puissance.",
    realite:
      "Une cartographie flexfuel sans objectif de puissance reste pertinente : elle sert avant tout à sécuriser le moteur sur le mélange et à faire baisser la facture à la pompe.",
  },
];

const PRIX_SP98 = 1.99;
const PRIX_E85 = 0.819;

const SAVINGS_ROWS = [
  { km: "10 000 km/an", litresSp98: 700, litresE85: 840 },
  { km: "15 000 km/an", litresSp98: 1050, litresE85: 1260 },
  { km: "20 000 km/an", litresSp98: 1400, litresE85: 1680 },
  { km: "25 000 km/an", litresSp98: 1750, litresE85: 2100 },
];

export default function ConversionE85Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/conversion-e85/pompe-e85.jpg"
          alt="Plein d'essence à la pompe"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />

        <Container className="relative py-20 lg:py-28">
          <SectionHeading
            eyebrow="Reprogrammation · Conversion E85"
            title="Rouler moins cher, sans sacrifier la fiabilité"
            description="Une cartographie flexfuel développée sur mesure, validée au banc, pour rouler au superéthanol en toute sécurité — avec ou sans recherche de puissance."
          />
          <Button
            href={`/contact?sujet=${encodeURIComponent("Conversion E85")}`}
            variant="primary"
            className="mt-8"
          >
            Demander un devis conversion E85
          </Button>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Idées reçues"
            title="Ce qu'on entend souvent sur l'E85"
            description="Entre bouche-à-oreille et forums, beaucoup de préjugés circulent. Voici ce qu'il en est réellement."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
            {MYTHS.map((item) => (
              <div key={item.mythe} className="flex flex-col gap-4 bg-background p-6">
                <div className="flex items-start gap-3">
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-medium leading-relaxed text-foreground/70 normal-case line-through decoration-muted/60">
                    {item.mythe}
                  </p>
                </div>
                <div className="flex items-start gap-3 border-t border-border pt-4">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm leading-relaxed text-muted normal-case">
                    {item.realite}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface">
        <Container className="py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>Contexte économique</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-[1.05] sm:text-4xl">
                Le plein pèse de plus en plus dans le budget
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted normal-case">
                Entre la hausse du coût de la vie et des prix des carburants
                qui restent élevés, le plein d&apos;essence est devenu un
                poste de dépense qu&apos;on surveille de près. L&apos;écart de
                prix entre le SP98 et l&apos;E85 reste, lui, structurellement
                important : le superéthanol coûte régulièrement plus de deux
                fois moins cher à la pompe.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted normal-case">
                Pas besoin de viser plus de puissance pour que la conversion
                soit intéressante : pour un usage quotidien, c&apos;est
                d&apos;abord une décision de bon sens pour le porte-monnaie.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border">
              <Image
                src="/conversion-e85/prix-station.jpg"
                alt="Tarifs à la pompe : E85 à 0,819€ contre 1,990€ pour le SP98"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-background/85 px-4 py-3 text-xs text-muted normal-case">
                Relevé en station TotalEnergies : SP98 à 1,990&nbsp;€/L, E85 à
                0,819&nbsp;€/L. Les prix varient selon la région et le
                distributeur.
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Le calcul"
            title="Combien économisez-vous sur une année ?"
            description={`Estimation sur une consommation de base de 7 L/100 km en SP98, avec une surconsommation moyenne de 20 % en E85 — cohérente avec le moindre pouvoir calorifique du superéthanol. Prix retenus : SP98 à ${PRIX_SP98.toFixed(3).replace(".", ",")} €/L, E85 à ${PRIX_E85.toFixed(3).replace(".", ",")} €/L.`}
          />

          <div className="mt-10 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm normal-case">
              <thead>
                <tr className="border-b border-border bg-surface text-left font-heading text-xs tracking-wide text-muted">
                  <th className="px-5 py-4">Kilométrage annuel</th>
                  <th className="px-5 py-4">Coût en SP98</th>
                  <th className="px-5 py-4">Coût en E85</th>
                  <th className="px-5 py-4 text-accent">Économie / an</th>
                </tr>
              </thead>
              <tbody>
                {SAVINGS_ROWS.map((row) => {
                  const coutSp98 = row.litresSp98 * PRIX_SP98;
                  const coutE85 = row.litresE85 * PRIX_E85;
                  const economie = coutSp98 - coutE85;
                  return (
                    <tr key={row.km} className="border-b border-border last:border-b-0">
                      <td className="px-5 py-4 font-heading text-sm">{row.km}</td>
                      <td className="px-5 py-4 text-muted">
                        {coutSp98.toLocaleString("fr-FR", {
                          maximumFractionDigits: 0,
                        })}
                        &nbsp;€
                      </td>
                      <td className="px-5 py-4 text-muted">
                        {coutE85.toLocaleString("fr-FR", {
                          maximumFractionDigits: 0,
                        })}
                        &nbsp;€
                      </td>
                      <td className="px-5 py-4 font-heading text-accent">
                        +
                        {economie.toLocaleString("fr-FR", {
                          maximumFractionDigits: 0,
                        })}
                        &nbsp;€
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted normal-case">
            Estimation à titre indicatif, hors variations de prix en cours
            d&apos;année et de style de conduite. Un devis précis est établi
            après échange sur votre véhicule et votre kilométrage réel.
          </p>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border lg:order-2">
              <Image
                src="/conversion-e85/plein-e85.jpg"
                alt="Automobiliste faisant le plein d'E85"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:order-1">
              <Eyebrow>Sans chercher la puissance</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-[1.05] sm:text-4xl">
                Une conversion qui fait du bien au portefeuille
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted normal-case">
                Pas besoin de viser un gain de chevaux pour que la conversion
                E85 ait du sens. La cartographie flexfuel s&apos;adapte
                automatiquement à tout mélange SP98/E85 dans le réservoir :
                vous roulez normalement, sans y penser, et la facture baisse
                dès le premier plein.
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
                <li className="flex items-start gap-3 text-sm text-foreground/90 normal-case">
                  <Fuel className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  Compatible SP98, E85 ou tout mélange des deux
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/90 normal-case">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  Économies dès le premier plein, sans changer d&apos;usage
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/90 normal-case">
                  <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                  Cartographie validée au banc, gain de puissance possible en option
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-8 border border-accent/40 bg-accent-soft px-8 py-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                Une estimation sur votre véhicule ?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted normal-case">
                Chaque conversion fait l&apos;objet d&apos;un devis gratuit,
                calculé sur votre kilométrage et votre véhicule.
              </p>
            </div>
            <Button
              href={`/contact?sujet=${encodeURIComponent("Conversion E85")}`}
              variant="primary"
              className="shrink-0"
            >
              Demander un devis
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
