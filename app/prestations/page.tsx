import type { Metadata } from "next";
import Image from "next/image";
import { Cpu, Disc3, Flame, Fuel, Gauge, Wrench } from "lucide-react";
import { Button, Container, Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Prestations | AMK Développement",
  description:
    "Reprogrammation, préparation moteur, entretien & mécanique, banc & diagnostic — les prestations de l'atelier AMK Développement.",
};

const SERVICES = [
  {
    icon: Cpu,
    label: "Cartographie",
    title: "Reprogrammation",
    description:
      "Cartographies moteur et boîte développées sur mesure, validées au banc.",
    items: ["Stage 1 → Stage 4", "Multimap & éthanol", "Déblocage calculateur"],
    image: "/prestations/reprogrammation.jpg",
  },
  {
    icon: Flame,
    label: "Performance",
    title: "Préparation moteur",
    description: "Du bolt-on au moteur forgé, des montages pensés pour durer.",
    items: ["Turbo, admission, échangeur", "Bielles & pistons forgés", "Ligne d'échappement"],
    image: "/prestations/preparation-moteur-v2.jpg",
  },
  {
    icon: Wrench,
    label: "Atelier",
    title: "Entretien & mécanique",
    description:
      "Révisions et forfaits atelier au tarif annoncé avant l'intervention.",
    items: ["Vidanges moteur & boîte", "Freinage, purge RBF600", "Distribution, révisions"],
    image: "/prestations/entretien-mecanique.jpg",
  },
  {
    icon: Gauge,
    label: "Mesure",
    title: "Banc & diagnostic",
    description: "Mesure de puissance avant/après et recherche de panne.",
    items: ["Courbes puissance & couple", "Diagnostic électronique", "Compte-rendu détaillé"],
    image: "/prestations/banc-diagnostic.jpg",
  },
  {
    icon: Disc3,
    label: "Équipement",
    title: "Pièces performance",
    description:
      "Fourniture et montage de pièces performance choisies avec vous, adaptées à votre usage.",
    items: ["Cales de carrossage", "Ressorts courts & suspension", "Gros freins & jantes"],
    image: "/prestations/pieces-performance.jpg",
  },
];

const FLEXFUEL_ITEMS = [
  "Compatible SP98, E85 et tout mélange",
  "Économies immédiates à la pompe",
  "Gain de puissance à la clé",
  "Multimap possible : plusieurs cartographies au choix",
];

export default function PrestationsPage() {
  return (
    <>
      <section>
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="Prestations"
            title="De la révision au moteur forgé"
            description="Un seul fil conducteur : des interventions justes, des pièces de qualité et des résultats mesurés — pas annoncés."
          />

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`group relative flex flex-col overflow-hidden bg-background p-6 ${
                  index === SERVICES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {service.image ? (
                  <>
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/85 transition-colors duration-500 group-hover:bg-background/70" />
                  </>
                ) : null}

                <div className="relative flex flex-1 flex-col">
                  <span className="flex h-12 w-12 items-center justify-center border border-border text-accent">
                    <service.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span className="mt-4 font-heading text-xs tracking-[0.2em] text-accent">
                    {service.label}
                  </span>
                  <h3 className="mt-3 font-heading text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted normal-case">
                    {service.description}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-4">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground/80 normal-case"
                      >
                        <span className="mt-1 text-muted">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-accent/40 bg-accent-soft p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_auto_1fr] lg:items-center">
              <div>
                <Eyebrow>Carburant · Superéthanol</Eyebrow>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-accent/50 text-accent">
                    <Fuel className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl">
                    Conversion E85 &amp; Flexfuel
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted normal-case">
                  Cartographie flexfuel développée sur mesure : le moteur
                  s&apos;adapte automatiquement au SP98, à l&apos;E85 ou à
                  n&apos;importe quel mélange des deux dans le réservoir.
                  Roulez au superéthanol, environ deux fois moins cher à la
                  pompe, tout en gagnant en puissance — l&apos;éthanol
                  supporte des réglages plus performants. Validation au banc,
                  comme toujours.
                </p>
                <Button
                  href={`/contact?sujet=${encodeURIComponent("Conversion E85")}`}
                  variant="primary"
                  className="mt-6"
                >
                  Demander un devis
                </Button>
              </div>

              <span className="hidden h-full w-px bg-border lg:block" />

              <ul className="flex flex-col divide-y divide-border">
                {FLEXFUEL_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 text-sm text-foreground/90 normal-case"
                  >
                    <span className="mt-1 text-muted">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-8 border border-accent/40 bg-accent-soft px-8 py-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                Une prestation sur mesure ?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted normal-case">
                Chaque intervention fait l&apos;objet d&apos;un devis gratuit et
                détaillé après échange sur votre véhicule et vos objectifs.
              </p>
            </div>
            <Button href="/contact" variant="primary" className="shrink-0">
              Demander un devis
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
