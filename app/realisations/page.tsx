import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { Cpu, Flame, Gauge, Wind } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { RealisationsGallery } from "@/components/RealisationsGallery";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import type { Realisation } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Réalisations | AMK Développement",
  description:
    "Les 4 stages de préparation AMK Développement et les véhicules préparés par l'atelier, courbes de puissance et chiffres à l'appui.",
};

export const revalidate = 300;

const STAGES = [
  {
    stage: "Stage 1",
    icon: Cpu,
    title: "Reprogrammation",
    description:
      "Optimisation de la cartographie d'origine, sans modifier aucune pièce : pression de turbo, injection et avance sont recalibrées. Le gain le plus accessible, adapté à un usage quotidien.",
    tag: "Aucune pièce modifiée",
    image: "/realisations/stage-1-reprogrammation.jpg",
  },
  {
    stage: "Stage 2",
    icon: Wind,
    title: "Le moteur respire",
    description:
      "La cartographie s'appuie sur des pièces qui améliorent les flux d'air : ligne d'échappement, admission, échangeur. Le moteur d'origine exprime davantage de potentiel.",
    tag: "Échappement · Admission · Échangeur",
    image: "/realisations/stage-2-le-moteur-respire.jpg",
  },
  {
    stage: "Stage 3",
    icon: Gauge,
    title: "Turbo & renforts",
    description:
      "Un turbo plus performant, accompagné de pompes, d'injecteurs et souvent d'un embrayage renforcés. La mécanique d'origine approche ses limites : on la soutient.",
    tag: "Turbo · Injection · Embrayage",
    image: "/realisations/stage-3-turbo-renforts.jpg",
  },
  {
    stage: "Stage 4",
    icon: Flame,
    title: "Moteur forgé",
    description:
      "Le moteur est ouvert et renforcé de l'intérieur — bielles, pistons, soupapes — avec un turbo dimensionné et une gestion entièrement sur mesure. Les très grosses puissances, fiabilisées.",
    tag: "Préparation complète",
    image: "/realisations/stage-4-moteur-forge.jpg",
  },
];

export default async function RealisationsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("realisations")
    .select(
      "id, marque, modele, stage, ch_origine, ch_final, couple_nm, couple_nm_origine, zero_cent, cent_deux_cent, delta_ch, delta_couple_nm, image_url, ordre_affichage, carburant, description"
    )
    .order("ordre_affichage", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<Realisation[]>();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/forfaits-pieces.jpg"
          alt="Pièces performance prêtes au montage à l'atelier AMK Développement"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />

        <Container className="relative py-20 lg:py-28">
          <SectionHeading
            eyebrow="L'atelier"
            title="De la révision au moteur forgé"
            description="Un parcours en 4 stages, du plus accessible au plus radical."
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <div className="mt-12">
            <HorizontalScroller>
              {STAGES.map(({ stage, icon: Icon, title, description, tag, image }) => (
                <div
                  key={stage}
                  className="group relative min-w-[300px] shrink-0 grow basis-[300px] snap-start overflow-hidden bg-background p-6"
                >
                  {image ? (
                    <>
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-background/85 transition-colors duration-500 group-hover:bg-background/70" />
                    </>
                  ) : null}

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-2xl text-accent">
                        {stage}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center border border-border text-accent">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>

                    <h3 className="mt-4 font-heading text-lg">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted normal-case">
                      {description}
                    </p>

                    <p className="mt-6 border-t border-border pt-4 font-heading text-xs tracking-[0.15em] text-muted">
                      {tag}
                    </p>
                  </div>
                </div>
              ))}
            </HorizontalScroller>
          </div>

          <div className="mt-20">
            <Eyebrow>Réalisations</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Elles sont passées par l&apos;atelier
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted normal-case">
              Préparées pour la performance, construites pour durer : voici
              quelques véhicules sortis de l&apos;atelier.
            </p>

            <div className="mt-10">
              <RealisationsGallery realisations={data ?? []} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
