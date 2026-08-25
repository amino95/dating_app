"use client";

import { useState } from "react";

export function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in this context; nothing to fall back to.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-full border-2 border-pink-200 px-3.5 py-1.5 text-xs font-semibold text-pink-600 transition hover:bg-pink-50"
    >
      {copied ? "Copied! ✨" : "Copy 🔗"}
    </button>
  );
}
