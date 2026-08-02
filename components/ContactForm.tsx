"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitDevisRequest, type DevisFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui";
import { Combobox } from "@/components/Combobox";
import { SujetInput } from "@/components/SujetInput";
import {
  MARQUES_MODELES,
  MOTORISATIONS_PAR_MODELE,
  getMotorisationLabels,
} from "@/lib/vehicleData";

const MARQUES = Object.keys(MARQUES_MODELES);

const initialState: DevisFormState = { status: "idle" };

const inputClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none normal-case";

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-heading text-xs tracking-[0.15em] text-muted"
      >
        {label} <span className="text-accent">*</span>
      </label>
      {children}
    </div>
  );
}

export function ContactForm({
  defaultSujet = "",
  defaultMarque = "",
  defaultModele = "",
  defaultAnnee = "",
  defaultMotorisation = "",
}: {
  defaultSujet?: string;
  defaultMarque?: string;
  defaultModele?: string;
  defaultAnnee?: string;
  defaultMotorisation?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitDevisRequest,
    initialState
  );
  const [marque, setMarque] = useState(defaultMarque);
  const [annee, setAnnee] = useState(defaultAnnee);
  const [modele, setModele] = useState(defaultModele);
  const [motorisation, setMotorisation] = useState(defaultMotorisation);
  const modeles = MARQUES_MODELES[marque] ?? [];
  const motorisations = getMotorisationLabels(marque, modele, annee);
  const hasGenerationData = Boolean(MOTORISATIONS_PAR_MODELE[marque]?.[modele]);
  const motorisationEmptyMessage =
    hasGenerationData && annee.trim()
      ? `Aucune motorisation connue pour ${modele} en ${annee} — vérifiez l'année ou saisissez librement.`
      : "Pas de suggestion pour ce modèle — vous pouvez saisir librement.";

  const skipNextModeleReset = useRef(true);
  useEffect(() => {
    if (skipNextModeleReset.current) {
      skipNextModeleReset.current = false;
      return;
    }
    setModele("");
  }, [marque]);

  const skipNextMotorisationReset = useRef(true);
  useEffect(() => {
    if (skipNextMotorisationReset.current) {
      skipNextMotorisationReset.current = false;
      return;
    }
    setMotorisation("");
  }, [modele, annee]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 border border-accent/40 bg-accent-soft px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <h3 className="font-heading text-2xl">Demande envoyée</h3>
        <p className="max-w-md text-sm text-muted normal-case">
          Merci, votre demande a bien été enregistrée. L&apos;atelier revient
          vers vous rapidement pour établir votre devis ou confirmer votre
          rendez-vous.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <p className="text-xs text-muted normal-case sm:col-span-2">
        <span className="text-accent">*</span> Champs obligatoires
      </p>

      <Field label="Civilité" htmlFor="civilite">
        <select
          id="civilite"
          name="civilite"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Choisir…
          </option>
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
        </select>
      </Field>

      <Field label="Service" htmlFor="sujet">
        <SujetInput id="sujet" defaultValue={defaultSujet} />
      </Field>

      <Field label="Prénom" htmlFor="prenom">
        <input id="prenom" name="prenom" required className={inputClass} />
      </Field>

      <Field label="Nom" htmlFor="nom">
        <input id="nom" name="nom" required className={inputClass} />
      </Field>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
        />
      </Field>

      <Field label="Téléphone" htmlFor="telephone">
        <input
          id="telephone"
          name="telephone"
          type="tel"
          required
          className={inputClass}
        />
      </Field>

      <Field label="Marque du véhicule" htmlFor="vehicule_marque">
        <Combobox
          id="vehicule_marque"
          name="vehicule_marque"
          options={MARQUES}
          value={marque}
          onChange={setMarque}
          required
          placeholder="Choisir ou saisir une marque…"
          className={inputClass}
        />
      </Field>

      <Field label="Année" htmlFor="vehicule_annee">
        <input
          id="vehicule_annee"
          name="vehicule_annee"
          inputMode="numeric"
          pattern="[0-9]{4}"
          required
          value={annee}
          onChange={(event) => setAnnee(event.target.value)}
          placeholder="ex. 2019"
          className={inputClass}
        />
      </Field>

      <Field label="Modèle du véhicule" htmlFor="vehicule_modele">
        <Combobox
          id="vehicule_modele"
          name="vehicule_modele"
          options={modeles}
          value={modele}
          onChange={setModele}
          required
          placeholder="Choisir ou saisir un modèle…"
          className={inputClass}
          emptyMessage="Pas de suggestion pour cette marque — vous pouvez saisir librement."
        />
      </Field>

      <Field label="Motorisation" htmlFor="motorisation">
        <Combobox
          id="motorisation"
          name="motorisation"
          options={motorisations}
          value={motorisation}
          onChange={setMotorisation}
          required
          placeholder="ex. S58"
          className={inputClass}
          emptyMessage={motorisationEmptyMessage}
        />
      </Field>

      <Field label="Message" htmlFor="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </Field>

      {state.status === "error" ? (
        <p className="text-sm text-red-400 normal-case sm:col-span-2">
          {state.message}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          variant="primary"
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending ? "Envoi…" : "Envoyer la demande"}
        </Button>
      </div>
    </form>
  );
}
