"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

export function SujetInput({
  id,
  defaultValue = "",
}: {
  id: string;
  defaultValue?: string;
}) {
  const [tags, setTags] = useState<string[]>(() =>
    defaultValue
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  );
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.setCustomValidity(
      tags.length === 0 ? "Merci de préciser au moins un service." : ""
    );
  }, [tags]);

  function addTag(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setTags((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setDraft("");
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(draft);
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div>
      <input type="hidden" name="sujet" value={tags.join(", ")} />
      <div
        onClick={() => document.getElementById(id)?.focus()}
        className="flex w-full flex-wrap items-center gap-2 border border-border bg-surface px-3 py-2.5 focus-within:border-accent"
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 bg-accent-soft py-1 pl-2.5 pr-1.5 text-xs text-accent normal-case"
          >
            {tag}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                removeTag(tag);
              }}
              className="text-accent/70 hover:text-accent"
              aria-label={`Retirer ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(draft)}
          placeholder={
            tags.length === 0
              ? "Reprogrammation, devis moteur forgé, prise de RDV…"
              : "Ajouter un autre sujet…"
          }
          className="min-w-[140px] flex-1 bg-transparent py-1 text-sm text-foreground placeholder:text-muted focus:outline-none normal-case"
        />
      </div>
    </div>
  );
}
