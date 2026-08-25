import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { Stickers } from "@/components/Stickers";

export default async function Home() {
  const userId = await getSessionUserId();
  if (userId) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <Stickers
        items={[
          { emoji: "💌", className: "left-[8%] top-[15%]", rotate: -12 },
          { emoji: "🍕", className: "right-[10%] top-[20%]", rotate: 10, delay: 0.5 },
          { emoji: "✨", className: "left-[15%] bottom-[22%]", rotate: 6, delay: 1 },
          { emoji: "🍣", className: "right-[14%] bottom-[18%]", rotate: -8, delay: 1.5 },
          { emoji: "📅", className: "left-[6%] top-[55%]", rotate: 14, delay: 0.8 },
          { emoji: "🎉", className: "right-[8%] top-[55%]", rotate: -14, delay: 0.3 },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-md">
        <p className="text-5xl">💘</p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
          Ask them out, the easy way
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Create a link and send it. They pick yes or no, then the date, time, and food — no
          account needed on their end.
        </p>

        <div className="mt-9 flex justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.03] hover:from-pink-600 hover:to-orange-500"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-full border-2 border-pink-200 bg-white/70 px-7 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur transition hover:bg-white"
          >
            Log in
          </Link>
        </div>

        <Link
          href="/privacy"
          className="mt-10 inline-block text-xs text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </main>
  );
}
