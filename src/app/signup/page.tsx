"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";
import { Stickers } from "@/components/Stickers";

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, null);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
      <Stickers
        items={[
          { emoji: "💕", className: "left-[10%] top-[12%]", rotate: -10 },
          { emoji: "🎊", className: "right-[10%] top-[16%]", rotate: 12, delay: 0.6 },
          { emoji: "🍔", className: "left-[8%] bottom-[16%]", rotate: 8, delay: 1.2 },
        ]}
      />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-pink-100 bg-white/80 p-8 shadow-xl shadow-pink-100/60 backdrop-blur">
        <p className="text-3xl">🎀</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-500">Start sending date invites.</p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <SubmitButton pendingLabel="Creating account...">Sign up</SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-pink-600 hover:text-pink-700">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
