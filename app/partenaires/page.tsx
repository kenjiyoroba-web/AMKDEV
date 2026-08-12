import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partenaires | AMK Développement",
  description: "Les partenaires de l'atelier AMK Développement.",
};

const PARTENAIRES = [
  {
    nom: "RM Exclusive Cars",
    description: "Véhicules d'exception.",
    logo: "/partenaires/rm-exclusive-cars.png",
    photo: "/partenaires/rm-exclusive-cars-photo.jpg",
    href: "https://rmexclusivecars.fr/nos-partenaires/amk-developpement/",
  },
];

export default function PartenairesPage() {
  return (
    <section>
      <Container className="py-16 lg:py-24">
        <SectionHeading
          eyebrow="Partenaires"
          title="Ils font confiance à l'atelier"
          description="Des acteurs qui partagent la même exigence de qualité et de performance."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PARTENAIRES.map((partenaire, index) => (
            <Reveal key={partenaire.nom} delay={index * 80}>
            <div
              className="flex h-full flex-col border border-border bg-surface text-center"
            >
              {partenaire.photo ? (
                <Link
                  href={partenaire.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[4/3] w-full overflow-hidden"
                >
                  <Image
                    src={partenaire.photo}
                    alt={partenaire.nom}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              ) : null}

              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8">
                {partenaire.logo ? (
                  <div className="flex h-16 w-full items-center justify-center bg-white px-6 py-3">
                    {partenaire.href ? (
                      <Link
                        href={partenaire.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full w-full items-center justify-center"
                      >
                        <Image
                          src={partenaire.logo}
                          alt={partenaire.nom}
                          width={1024}
                          height={457}
                          className="h-full w-auto object-contain"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={partenaire.logo}
                        alt={partenaire.nom}
                        width={1024}
                        height={457}
                        className="h-full w-auto object-contain"
                      />
                    )}
                  </div>
                ) : (
                  <span className="font-heading text-xl">{partenaire.nom}</span>
                )}
                <span className="text-sm text-muted normal-case">
                  {partenaire.description}
                </span>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
