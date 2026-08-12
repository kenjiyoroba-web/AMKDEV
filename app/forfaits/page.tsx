import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Container, SectionHeading } from "@/components/ui";
import { ForfaitsGrid } from "@/components/ForfaitsGrid";
import type { Forfait } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Forfaits | AMK Développement",
  description:
    "Des tarifs clairs, annoncés avant l'intervention : vidange, purge freins, mise à jour cartographie et préparation sur devis.",
};

export const revalidate = 300;

export default async function ForfaitsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("forfaits")
    .select("id, nom, prix, description, badge, ordre_affichage")
    .order("ordre_affichage", { ascending: true })
    .returns<Forfait[]>();

  const forfaits = data ?? [];

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
            eyebrow="Forfaits atelier"
            title="Des tarifs clairs, annoncés avant l'intervention"
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-24">
          {forfaits.length === 0 ? (
            <p className="mt-12 text-sm text-muted normal-case">
              Les forfaits seront bientôt disponibles ici.
            </p>
          ) : (
            <>
              <p className="mt-6 max-w-2xl text-sm text-muted normal-case">
                Un seul forfait à la fois ? Cliquez directement sur son bouton.
                Plusieurs interventions en même temps (vidange, freins,
                autobloquant…) ? Cochez-les et regroupez votre demande de devis.
              </p>
              <div className="mt-8">
                <ForfaitsGrid forfaits={forfaits} />
              </div>
            </>
          )}

          <p className="mt-10 text-xs text-muted normal-case">
            Tarifs TTC, ajustés selon le véhicule. Toute autre prestation
            (entretien, préparation, reprogrammation) fait l&apos;objet d&apos;un
            devis gratuit et détaillé.
          </p>
        </Container>
      </section>
    </>
  );
}
