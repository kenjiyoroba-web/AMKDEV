import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Container } from "@/components/ui";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/forfaits", label: "Forfaits" },
  { href: "/marques", label: "Reprogrammation" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/brand/amk-logo.png"
            alt="AMK Développement"
            width={237}
            height={104}
            className="h-11 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Atelier de préparation et de reprogrammation moteur, spécialiste
            reconnu des moteurs TFSI et du groupe VAG, intervenant sur toutes
            les marques sportives — Audi RS, BMW M. Chaque préparation est
            validée sur banc de puissance.
          </p>
          <a
            href="https://www.instagram.com/amkdeveloppement01/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AMK Développement sur Instagram"
            className="mt-5 inline-block text-muted hover:text-accent"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-[0.2em] text-muted">
            Navigation
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm tracking-[0.2em] text-muted">
            Contact
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-foreground/80">
            <a href="tel:+33973161543" className="hover:text-accent">
              09 73 16 15 43
            </a>
            <p className="text-muted">
              Lun – Ven : 9h30 – 12h00
              <br />
              14h30 – 18h00
            </p>
            <Link
              href="/contact"
              className="font-heading text-sm tracking-wide text-accent hover:text-accent-hover"
            >
              Prendre rendez-vous →
            </Link>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} AMK Développement. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-accent">
              Mentions légales
            </Link>
            <Link href="/conditions-utilisation" className="hover:text-accent">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
