"use client";

import { useState, useTransition } from "react";
import { FOOD_OPTIONS } from "@/lib/food-options";
import { declineInviteAction, confirmInviteAction } from "./actions";

type Step = "ask" | "schedule" | "food" | "declineMessage" | "done";
type Outcome = "CONFIRMED" | "DECLINED" | null;

export function InviteFlow({
  token,
  requesterName,
  message,
  initialStatus,
  chosenDate,
  chosenTime,
  foodChoice,
  responseMessage,
}: {
  token: string;
  requesterName: string;
  message: string | null;
  initialStatus: "PENDING" | "CONFIRMED" | "DECLINED";
  chosenDate: string | null;
  chosenTime: string | null;
  foodChoice: string | null;
  responseMessage: string | null;
}) {
  const [step, setStep] = useState<Step>(initialStatus === "PENDING" ? "ask" : "done");
  const [outcome, setOutcome] = useState<Outcome>(
    initialStatus === "PENDING" ? null : initialStatus
  );
  const [date, setDate] = useState(chosenDate ?? "");
  const [time, setTime] = useState(chosenTime ?? "");
  const [food, setFood] = useState(foodChoice ?? "");
  const [note, setNote] = useState(responseMessage ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDecline() {
    startTransition(async () => {
      await declineInviteAction(token, note);
      setOutcome("DECLINED");
      setStep("done");
    });
  }

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      try {
        await confirmInviteAction(token, { date, time, food, message: note });
        setOutcome("CONFIRMED");
        setStep("done");
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  if (step === "done") {
    if (outcome === "DECLINED") {
      return (
        <div className="text-center">
          <p className="text-5xl">👋</p>
          <h1 className="mt-4 font-display text-xl font-semibold text-gray-900">No worries.</h1>
          <p className="mt-2 text-sm text-gray-500">{requesterName} has been let down gently.</p>
          {(note || responseMessage) && (
            <p className="mt-4 rounded-2xl bg-pink-50/60 px-4 py-3 text-sm text-gray-600">
              &ldquo;{note || responseMessage}&rdquo;
            </p>
          )}
        </div>
      );
    }

    const foodOption = FOOD_OPTIONS.find((f) => f.value === (food || foodChoice));

    return (
      <div className="text-center">
        <p className="text-5xl">🎉</p>
        <h1 className="mt-4 font-display text-xl font-semibold text-gray-900">
          You&apos;re all set!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {requesterName} will see that you&apos;re in for{" "}
          {foodOption ? `${foodOption.emoji} ${foodOption.label}` : "your date"} on{" "}
          {date || chosenDate} at {time || chosenTime}.
        </p>
        {(note || responseMessage) && (
          <p className="mt-4 rounded-2xl bg-pink-50/60 px-4 py-3 text-sm text-gray-600">
            &ldquo;{note || responseMessage}&rdquo;
          </p>
        )}
      </div>
    );
  }

  if (step === "ask") {
    return (
      <div className="text-center">
        <p className="text-5xl">💘</p>
        <h1 className="mt-4 font-display text-xl font-semibold text-gray-900">
          {requesterName} wants to go on a date with you.
        </h1>
        {message && <p className="mt-2 text-sm text-gray-500">&ldquo;{message}&rdquo;</p>}
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            disabled={isPending}
            onClick={() => setStep("declineMessage")}
            className="rounded-full border-2 border-pink-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-pink-50 disabled:opacity-50"
          >
            No thanks
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => setStep("schedule")}
            className="rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.03] hover:from-pink-600 hover:to-orange-500 disabled:opacity-50"
          >
            Yes! 🎉
          </button>
        </div>
      </div>
    );
  }

  if (step === "declineMessage") {
    return (
      <div>
        <p className="text-4xl">👋</p>
        <h1 className="mt-3 font-display text-xl font-semibold text-gray-900">
          Want to leave a note?
        </h1>
        <p className="mt-1 text-sm text-gray-500">Totally optional — {requesterName} will see it.</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={300}
          rows={3}
          placeholder="Maybe another time!"
          className="mt-4 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
        />
        <button
          type="button"
          disabled={isPending}
          onClick={handleDecline}
          className="mt-6 w-full rounded-full border-2 border-pink-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-pink-50 disabled:opacity-50"
        >
          {isPending ? "Sending..." : note ? "Send" : "Skip & send"}
        </button>
      </div>
    );
  }

  if (step === "schedule") {
    return (
      <div>
        <p className="text-4xl">📅</p>
        <h1 className="mt-3 font-display text-xl font-semibold text-gray-900">
          When works for you?
        </h1>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>
        <button
          type="button"
          disabled={!date || !time}
          onClick={() => setStep("food")}
          className="mt-8 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.02] hover:from-pink-600 hover:to-orange-500 disabled:opacity-50 disabled:hover:scale-100"
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-4xl">🍽️</p>
      <h1 className="mt-3 font-display text-xl font-semibold text-gray-900">
        What are you in the mood for?
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {FOOD_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFood(option.value)}
            className={`rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition ${
              food === option.value
                ? "scale-105 border-pink-400 bg-gradient-to-br from-pink-50 to-orange-50 text-pink-700 shadow-md shadow-pink-100"
                : "border-pink-100 text-gray-600 hover:scale-[1.02] hover:border-pink-200 hover:bg-pink-50/50"
            }`}
          >
            <span className="mr-2 text-lg">{option.emoji}</span>
            {option.label}
          </button>
        ))}
      </div>

      <label htmlFor="note" className="mt-6 block text-sm font-medium text-gray-700">
        Add a note <span className="text-gray-400">(optional)</span>
      </label>
      <textarea
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={300}
        rows={2}
        placeholder="Can't wait!"
        className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
      />

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        disabled={!food || isPending}
        onClick={handleConfirm}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:scale-[1.02] hover:from-pink-600 hover:to-orange-500 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending ? "Confirming..." : "Confirm date 💕"}
      </button>
    </div>
  );
}
