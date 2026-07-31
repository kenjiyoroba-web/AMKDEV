import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mentions légales | AMK Développement",
  description: "Mentions légales du site AMK Développement.",
};

export default function MentionsLegalesPage() {
  return (
    <section>
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow="Informations légales" title="Mentions légales" />

        <div className="mt-12 flex max-w-3xl flex-col gap-10 text-sm leading-relaxed text-muted normal-case">
          <div>
            <h2 className="font-heading text-lg text-foreground">Éditeur du site</h2>
            <p className="mt-3">
              Nom commercial : AMK Développement
              <br />
              Forme juridique : SASU, société par actions simplifiée
              unipersonnelle
              <br />
              SIRET : 852 855 436 00014
              <br />
              Adresse du siège social : 4 rue Denis Papin, 77680
              Roissy-en-Brie
              <br />
              Téléphone :{" "}
              <a href="tel:+33973161543" className="text-accent hover:text-accent-hover">
                09 73 16 15 43
              </a>
              <br />
              Directeur de la publication : [à compléter]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">Hébergement</h2>
            <p className="mt-3">
              Ce site est hébergé par : Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis
              <br />
              Base de données : Supabase Inc., 970 Toa Payoh North #07-04,
              Singapore 318992
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              Propriété intellectuelle
            </h2>
            <p className="mt-3">
              L&apos;ensemble du contenu de ce site (textes, images, logo,
              charte graphique) est la propriété d&apos;AMK Développement,
              sauf mention contraire, et ne peut être reproduit sans
              autorisation préalable.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              Données personnelles
            </h2>
            <p className="mt-3">
              Les données transmises via le formulaire de contact (civilité,
              nom, prénom, email, téléphone, informations véhicule, message)
              sont collectées par AMK Développement pour le traitement des
              demandes de devis et de rendez-vous. Elles ne sont transmises à
              aucun tiers à des fins commerciales. Conformément au Règlement
              Général sur la Protection des Données (RGPD) et à la loi
              &laquo;&nbsp;Informatique et Libertés&nbsp;&raquo;, vous
              disposez d&apos;un droit d&apos;accès, de rectification et de
              suppression de vos données, à exercer par téléphone au{" "}
              <a href="tel:+33973161543" className="text-accent hover:text-accent-hover">
                09 73 16 15 43
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">Cookies</h2>
            <p className="mt-3">
              Ce site ne dépose pas de cookie de suivi publicitaire ou
              analytique tiers. Seuls des cookies techniques strictement
              nécessaires à son fonctionnement peuvent être utilisés.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
