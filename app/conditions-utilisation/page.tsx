import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | AMK Développement",
  description: "Conditions générales d'utilisation du site AMK Développement.",
};

export default function ConditionsUtilisationPage() {
  return (
    <section>
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow="Informations légales" title="Conditions d'utilisation" />

        <div className="mt-12 flex max-w-3xl flex-col gap-10 text-sm leading-relaxed text-muted normal-case">
          <div>
            <h2 className="font-heading text-lg text-foreground">1. Objet</h2>
            <p className="mt-3">
              Les présentes conditions ont pour objet de définir les modalités
              de mise à disposition et d&apos;utilisation du site AMK
              Développement (ci-après &laquo;&nbsp;le site&nbsp;&raquo;). Toute
              utilisation du site implique l&apos;acceptation pleine et
              entière des présentes conditions.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">2. Accès au site</h2>
            <p className="mt-3">
              Le site est accessible gratuitement à tout utilisateur disposant
              d&apos;un accès à internet. Tous les frais nécessaires à
              l&apos;accès au site (matériel informatique, connexion
              internet...) sont à la charge de l&apos;utilisateur. AMK
              Développement met tout en œuvre pour assurer un accès continu au
              site, sans obligation de résultat, et ne saurait être tenu
              responsable de toute interruption ou indisponibilité, y compris
              pour maintenance.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              3. Nature des informations présentées
            </h2>
            <p className="mt-3">
              Le site présente les prestations de l&apos;atelier (reprogrammation,
              préparation moteur, entretien, mécanique) ainsi que des exemples
              de réalisations. Les informations de puissance, couple et
              chronométrage indiquées pour chaque véhicule proviennent de
              mesures ou de communications propres à chaque projet ; elles
              sont données à titre indicatif et peuvent varier selon le
              véhicule, son état et les conditions de mesure. Les tarifs
              affichés sur la page Forfaits sont donnés &laquo;&nbsp;à partir
              de&nbsp;&raquo; et ajustés selon le véhicule ; toute autre
              prestation fait l&apos;objet d&apos;un devis. Le site ne permet
              aucune vente en ligne ni paiement : toute prestation fait
              l&apos;objet d&apos;un devis et d&apos;un rendez-vous préalables.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              4. Formulaire de contact / devis
            </h2>
            <p className="mt-3">
              Les informations transmises via le formulaire de contact
              (civilité, coordonnées, informations véhicule, message) sont
              utilisées exclusivement par AMK Développement pour traiter la
              demande de devis ou de rendez-vous, et ne sont ni vendues ni
              transmises à des tiers à des fins commerciales.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              5. Propriété intellectuelle
            </h2>
            <p className="mt-3">
              L&apos;ensemble des éléments du site (textes, photographies,
              logo, charte graphique...) est protégé par le droit de la
              propriété intellectuelle. Toute reproduction, représentation ou
              diffusion, totale ou partielle, sans autorisation préalable
              d&apos;AMK Développement, est interdite.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              6. Liens hypertextes
            </h2>
            <p className="mt-3">
              Le site peut contenir des liens vers des sites tiers (réseaux
              sociaux, partenaires). AMK Développement n&apos;exerce aucun
              contrôle sur ces sites et décline toute responsabilité quant à
              leur contenu.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">
              7. Droit applicable
            </h2>
            <p className="mt-3">
              Les présentes conditions sont soumises au droit français. En cas
              de litige, et à défaut de résolution amiable, les tribunaux
              français compétents seront seuls saisis.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg text-foreground">8. Contact</h2>
            <p className="mt-3">
              Pour toute question relative aux présentes conditions,
              l&apos;atelier est joignable au{" "}
              <a href="tel:+33973161543" className="text-accent hover:text-accent-hover">
                09 73 16 15 43
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
