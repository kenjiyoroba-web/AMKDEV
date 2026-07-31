"use server";

import { sendMail } from "@/lib/mailer";
import { createAdminClient } from "@/utils/supabase/admin";

export type DevisFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

export async function submitDevisRequest(
  _prevState: DevisFormState,
  formData: FormData
): Promise<DevisFormState> {
  const civilite = required(formData.get("civilite"));
  const sujet = required(formData.get("sujet"));
  const prenom = required(formData.get("prenom"));
  const nom = required(formData.get("nom"));
  const email = required(formData.get("email"));
  const telephone = required(formData.get("telephone"));
  const message = required(formData.get("message"));
  const vehiculeMarque = required(formData.get("vehicule_marque"));
  const vehiculeAnnee = required(formData.get("vehicule_annee"));
  const vehiculeModele = required(formData.get("vehicule_modele"));
  const motorisation = required(formData.get("motorisation"));

  if (
    !civilite ||
    !sujet ||
    !prenom ||
    !nom ||
    !email ||
    !telephone ||
    !message ||
    !vehiculeMarque ||
    !vehiculeAnnee ||
    !vehiculeModele ||
    !motorisation
  ) {
    return {
      status: "error",
      message: "Merci de renseigner tous les champs obligatoires.",
    };
  }

  // La table devis_requests stocke motorisation + année dans une seule
  // colonne texte ; on les combine ici pour ne pas avoir à faire évoluer le
  // schéma alors que le formulaire, lui, sépare bien les deux champs.
  const motorisationAnnee = `${motorisation} (${vehiculeAnnee})`;

  if (civilite !== "M." && civilite !== "Mme") {
    return { status: "error", message: "Civilité invalide." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Adresse email invalide." };
  }

  try {
    const supabase = createAdminClient();

    const { error } = await supabase.from("devis_requests").insert({
      civilite,
      sujet,
      prenom,
      nom,
      email,
      telephone,
      vehicule_marque: vehiculeMarque,
      vehicule_modele: vehiculeModele,
      motorisation_annee: motorisationAnnee,
      message,
    });

    if (error) {
      console.error("devis_requests insert error", error);
      return {
        status: "error",
        message: "Une erreur est survenue, merci de réessayer.",
      };
    }
  } catch (adminError) {
    console.error("devis_requests admin client error", adminError);
    return {
      status: "error",
      message: "Une erreur est survenue, merci de réessayer.",
    };
  }

  try {
    await sendMail({
      to: process.env.CONTACT_EMAIL_TO || (process.env.SMTP_USER as string),
      subject: `Nouvelle demande de devis — ${prenom} ${nom}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>${civilite} ${prenom} ${nom}</strong></p>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Véhicule :</strong> ${vehiculeMarque ?? "—"} ${vehiculeModele ?? ""}</p>
        <p><strong>Motorisation &amp; année :</strong> ${motorisationAnnee ?? "—"}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (emailError) {
    // La demande est déjà enregistrée en base ; un échec d'envoi d'email
    // ne doit pas faire échouer la soumission côté utilisateur.
    console.error("smtp email error", emailError);
  }

  return { status: "success" };
}
