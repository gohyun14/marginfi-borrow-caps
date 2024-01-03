"use client";

import { useFormStatus } from "react-dom";

export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="rounded-md bg-zinc-500 px-3 py-2"
    >
      {pending ? "Searching..." : "Search"}
    </button>
  );
}
