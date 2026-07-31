import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, Cpu, Layers, Wrench } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Button, Container, Eyebrow } from "@/components/ui";
import { BrandMarquee } from "@/components/BrandMarquee";
import { PowerCurveChart } from "@/components/PowerCurveChart";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";
import type { Realisation } from "@/lib/supabase/types";

const SECTIONS = [
  {
    href: "/prestations",
    icon: Cpu,
    title: "Prestations",
    description:
      "Reprogrammation, préparation moteur, entretien & mécanique, banc & diagnostic.",
  },
  {
    href: "/realisations",
    icon: Layers,
    title: "Réalisations",
    description:
      "Les 4 stages de l'atelier et les véhicules sortis, courbes de puissance à l'appui.",
  },
  {
    href: "/forfaits",
    icon: Wrench,
    title: "Forfaits",
    description: "Des tarifs clairs, annoncés avant l'intervention.",
  },
];

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: allRealisations } = await supabase
    .from("realisations")
    .select(
      "id, marque, modele, stage, ch_origine, ch_final, couple_nm, couple_nm_origine, zero_cent, cent_deux_cent, delta_ch, delta_couple_nm, image_url, ordre_affichage, carburant, description"
    )
    .returns<Realisation[]>();

  const featured =
    allRealisations && allRealisations.length > 0
      ? allRealisations[Math.floor(Math.random() * allRealisations.length)]
      : null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-grid pointer-events-none absolute inset-0" />

        <Container className="relative grid grid-cols-1 gap-16 py-16 lg:grid-cols-2 lg:items-start lg:py-24">
          <div>
            <Eyebrow>Préparateur automobile · Reprogrammation &amp; mécanique</Eyebrow>

            <h1 className="mt-6 text-5xl font-bold leading-[1.08] sm:text-6xl">
              PERFORMANCE.
              <br />
              <span className="text-accent">FIABILITÉ.</span>
              <br />
              EXPERTISE.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted normal-case">
              Atelier de préparation et de reprogrammation moteur,{" "}
              <strong className="font-semibold text-foreground">
                spécialiste reconnu des moteurs TFSI et du groupe VAG
              </strong>
              , intervenant sur toutes les marques sportives — Audi RS, BMW M,
              Mercedes-AMG…{" "}
              <strong className="font-semibold text-foreground">
                Chaque préparation est validée sur banc de puissance.
              </strong>
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary">
                Prendre rendez-vous
              </Button>
              <Button href="/realisations" variant="outline">
                Voir les réalisations
              </Button>
            </div>
          </div>

          <div className="border border-border bg-surface">
            <div className="relative h-64 w-full overflow-hidden sm:h-72">
              {featured?.image_url ? (
                <Image
                  src={featured.image_url}
                  alt={`${featured.marque} ${featured.modele}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <VehiclePlaceholder className="h-full w-full" />
              )}
              <span className="absolute left-4 top-4 bg-accent px-3 py-1.5 font-heading text-xs tracking-wide text-white">
                Stage {featured?.stage ?? 2}
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-xs tracking-[0.2em] text-muted">
                  Passage au banc
                </span>
                <span className="font-heading text-sm">
                  {featured
                    ? `${featured.marque} ${featured.modele} · Stage ${featured.stage}`
                    : "Audi RS6 C8 · Stage 2"}
                </span>
              </div>

              <PowerCurveChart
                chOrigine={featured?.ch_origine ?? 600}
                chFinal={featured?.ch_final ?? 744}
                stageLabel={`Stage ${featured?.stage ?? 2}`}
                className="mt-4 w-full"
              />

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm normal-case">
                <span className="text-muted">
                  {featured?.ch_origine ?? 600} →{" "}
                  <span className="text-accent">{featured?.ch_final ?? 744} ch</span>
                  {featured?.couple_nm ? (
                    <>
                      {" · "}
                      <span className="text-foreground">{featured.couple_nm} Nm</span>
                    </>
                  ) : null}
                </span>
                <span className="text-muted">
                  Carburant : <span className="text-accent">{featured?.carburant ?? "SP98"}</span>
                </span>
              </div>

              {featured?.description ? (
                <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-muted normal-case">
                  {featured.description
                    .replace(/\.$/, "")
                    .split(",")
                    .map((part) => part.trim())
                    .filter(Boolean)
                    .map((part, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{part}</span>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          </div>
        </Container>

        <div className="relative py-10 sm:py-12">
          <BrandMarquee />
        </div>
      </section>

      <section className="border-b border-border">
        <Container className="py-16 lg:py-24">
          <Eyebrow>L&apos;atelier en un coup d&apos;œil</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            De la révision au moteur forgé
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            {SECTIONS.map(({ href, icon: Icon, title, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col justify-between gap-6 bg-background p-6 transition-colors hover:bg-surface"
              >
                <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <div>
                  <h3 className="font-heading text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted normal-case">
                    {description}
                  </p>
                </div>
                <span className="flex items-center gap-2 font-heading text-xs tracking-wide text-accent">
                  Découvrir
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-8 border border-accent/40 bg-accent-soft px-8 py-12 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                Un projet de préparation ?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted normal-case">
                Décrivez votre véhicule et vos objectifs, on revient vers vous
                avec un devis détaillé et chiffré.
              </p>
            </div>
            <Button href="/contact" variant="primary" className="shrink-0">
              Prendre rendez-vous
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
