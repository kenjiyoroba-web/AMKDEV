import type { Metadata } from "next";
import Image from "next/image";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | AMK Développement",
  description:
    "Demandez un devis ou prenez rendez-vous avec l'atelier AMK Développement.",
};

const MAPS_QUERY = "AMK Développement, 4 Rue Denis Papin, 77680 Roissy-en-Brie";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sujet?: string; marque?: string; modele?: string }>;
}) {
  const { sujet, marque, modele } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/contact-local-gate.jpg"
          alt="Locaux de l'atelier AMK Développement"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/75" />

        <Container className="relative py-20 lg:py-28">
          <SectionHeading
            eyebrow="Contact"
            title="Devis & rendez-vous"
            description="Décrivez votre véhicule et votre projet, l'atelier revient vers vous avec un devis détaillé."
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-4 text-sm">
                <a
                  href="tel:+33973161543"
                  className="flex items-center gap-3 text-foreground/80 hover:text-accent"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  09 73 16 15 43
                </a>
                <p className="flex items-start gap-3 text-muted normal-case">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    Lun – Ven : 9h30 – 12h00
                    <br />
                    14h30 – 18h00
                  </span>
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-foreground/80 normal-case hover:text-accent"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    4 rue Denis Papin
                    <br />
                    77680 Roissy-en-Brie
                  </span>
                </a>
              </div>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 block aspect-square overflow-hidden border border-border"
              >
                <iframe
                  src={MAPS_EMBED_SRC}
                  title="Localisation d'AMK Développement sur Google Maps"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-full w-full grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 font-heading text-xs tracking-wide text-white">
                    Ouvrir dans Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            </div>

            <div className="lg:col-span-2">
              <ContactForm
                defaultSujet={sujet ?? ""}
                defaultMarque={marque ?? ""}
                defaultModele={modele ?? ""}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
