"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Clock, Menu, Phone, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Button, Container } from "@/components/ui";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/forfaits", label: "Forfaits" },
  {
    href: "/marques",
    label: "Reprogrammation",
    children: [
      { href: "/marques", label: "Marques" },
      { href: "/conversion-e85", label: "Conversion E85" },
    ],
  },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="hidden border-b border-border sm:block">
        <Container className="flex h-10 items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-accent" />
              Lun&nbsp;–&nbsp;Ven&nbsp;: 9h30 – 12h00 | 14h30 – 18h00
            </span>
            <a
              href="tel:+33973161543"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              09 73 16 15 43
            </a>
          </div>
          <a
            href="https://www.instagram.com/amkdeveloppement01/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AMK Développement sur Instagram"
            className="text-muted hover:text-accent"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
        </Container>
      </div>

      <div className="border-b border-border">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/brand/amk-logo.png"
              alt="AMK Développement"
              width={237}
              height={104}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.children?.some((child) => pathname === child.href) ??
                  false);

              if (link.children) {
                return (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 py-1 font-heading text-sm tracking-wide transition-colors ${
                        active
                          ? "text-accent"
                          : "text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                        strokeWidth={1.5}
                      />
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                          active ? "scale-x-100" : ""
                        }`}
                      />
                    </Link>

                    <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="min-w-[200px] border border-border bg-background py-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 font-heading text-sm tracking-wide transition-colors ${
                              pathname === child.href
                                ? "text-accent"
                                : "text-foreground/80 hover:bg-surface hover:text-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 font-heading text-sm tracking-wide transition-colors ${
                    active ? "text-accent" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                      active ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" variant="primary">
              Prendre RDV
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground lg:hidden"
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Container>
      </div>

      {open ? (
        <div className="border-b border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                (link.children?.some((child) => pathname === child.href) ??
                  false);

              if (link.children) {
                return (
                  <div key={link.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`font-heading py-3 text-sm tracking-wide ${
                          active ? "text-accent" : "text-foreground/80"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSubOpen((v) => !v)}
                        className="p-3 text-foreground/60"
                        aria-label="Afficher le sous-menu"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileSubOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                    {mobileSubOpen ? (
                      <div className="flex flex-col gap-1 border-l border-border pb-2 pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={`font-heading py-2 text-sm tracking-wide ${
                              pathname === child.href
                                ? "text-accent"
                                : "text-foreground/70"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-heading py-3 text-sm tracking-wide ${
                    active ? "text-accent" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/contact" variant="primary" className="mt-3 w-full">
              Prendre RDV
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
