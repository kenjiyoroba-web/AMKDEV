"use client";

import { useEffect, useRef, useState } from "react";

export function Combobox({
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  required,
  className,
  emptyMessage = "Aucune suggestion — vous pouvez saisir librement.",
}: {
  id: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  emptyMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const query = value.trim().toLowerCase();
  const filtered = query
    ? options.filter((option) => option.toLowerCase().includes(query))
    : options;

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id={id}
        name={name}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={className}
      />
      {open ? (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto border border-border bg-background shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((option) => (
              <button
                key={option}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange(option);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left text-sm text-foreground/80 normal-case hover:bg-surface hover:text-foreground"
              >
                {option}
              </button>
            ))
          ) : (
            <p className="px-4 py-2.5 text-xs text-muted normal-case">
              {emptyMessage}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
