import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Container } from "@/components/ui";
import { MarquesConfigurateurSection } from "@/components/MarquesConfigurateurSection";
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
        <MarquesConfigurateurSection
          marques={data ?? []}
          realisations={realisations ?? []}
        />
      </Container>
    </section>
  );
}
