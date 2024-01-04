"use client";

import { useFormStatus } from "react-dom";

export default function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="rounded-md bg-zinc-500 px-3 py-2 text-[18px] hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-rose-600 active:bg-zinc-500 disabled:cursor-not-allowed disabled:bg-zinc-400"
    >
      {pending ? "Searching..." : "Search"}
    </button>
  );
}
