"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export function SubmitButton({
  children,
  pendingLabel,
}: {
  children: ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.02] hover:from-pink-600 hover:to-orange-500 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
