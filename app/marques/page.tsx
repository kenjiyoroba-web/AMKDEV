import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { MarquesGrid } from "@/components/MarquesGrid";
import { VehiculeConfigurateur } from "@/components/VehiculeConfigurateur";
import type { Marque, Realisation } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Marques | AMK Développement",
  description:
    "Les marques prises en charge par l'atelier AMK Développement — spécialiste VAG/Audi RS, BMW M, Mercedes-AMG, et bien d'autres.",
};

export const revalidate = 300;

export default async function MarquesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("marques")
    .select("id, nom, logo_url")
    .order("nom", { ascending: true })
    .returns<Marque[]>();

  const { data: realisations } = await supabase
    .from("realisations")
    .select(
      "id, marque, modele, stage, ch_origine, ch_final, couple_nm, couple_nm_origine, zero_cent, cent_deux_cent, delta_ch, delta_couple_nm, image_url, ordre_affichage, carburant, description"
    )
    .order("ordre_affichage", { ascending: true })
    .returns<Realisation[]>();

  return (
    <section>
      <Container className="py-16 lg:py-24">
        <SectionHeading
          eyebrow="Configurateur"
          title="Trouvez votre véhicule"
          description="Choisissez une marque et un modèle parmi ceux pris en charge par l'atelier. Si ce véhicule est déjà passé au banc, les gains réels de puissance et de couple s'affichent étage par étage ; sinon, demandez un devis gratuit pour une estimation."
        />

        <div className="mt-10">
          <VehiculeConfigurateur realisations={realisations ?? []} />
        </div>

        <div className="mt-20">
          <Eyebrow>Marques</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
            Toutes les marques prises en charge
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted normal-case">
            Spécialiste reconnu du groupe VAG, de BMW M et Mercedes-AMG,
            l&apos;atelier intervient sur la plupart des marques, sportives
            ou non.
          </p>

          <div className="mt-10">
            <MarquesGrid marques={data ?? []} />
          </div>
        </div>
      </Container>
    </section>
  );
}
