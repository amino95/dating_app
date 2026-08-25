import { requireUser } from "@/lib/require-user";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/app/actions/auth";
import { createInviteAction } from "./actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { FOOD_OPTIONS } from "@/lib/food-options";

export default async function DashboardPage() {
  const user = await requireUser();
  const invites = await prisma.invite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.BASE_URL ?? "http://localhost:3100";

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-gray-900">
            Hi, {user.name} 👋
          </h1>
          <p className="text-sm text-gray-500">Create a link, send it, see what they say.</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border-2 border-transparent px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:border-pink-200 hover:text-pink-600"
          >
            Log out
          </button>
        </form>
      </div>

      <section className="mt-8 rounded-3xl border border-pink-100 bg-white/80 p-6 shadow-xl shadow-pink-100/50 backdrop-blur">
        <h2 className="font-display text-lg font-semibold text-gray-900">💌 New date invite</h2>
        <form action={createInviteAction} className="mt-4 space-y-4">
          <div>
            <label htmlFor="inviteeName" className="block text-sm font-medium text-gray-700">
              Their name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="inviteeName"
              name="inviteeName"
              type="text"
              placeholder="e.g. Alex"
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message <span className="text-gray-400">(optional)</span>
            </label>
            <input
              id="message"
              name="message"
              type="text"
              maxLength={200}
              placeholder="Want to grab a bite this weekend?"
              className="mt-1 w-full rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
          <SubmitButton pendingLabel="Creating link...">Create invite link ✨</SubmitButton>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-gray-900">Your invites</h2>

        {invites.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            No invites yet. Create one above to get started. 🎈
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {invites.map((invite) => {
              const link = `${baseUrl}/invite/${invite.token}`;
              const food = FOOD_OPTIONS.find((f) => f.value === invite.foodChoice);

              return (
                <li
                  key={invite.id}
                  className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-lg shadow-pink-100/40 backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">
                        {invite.inviteeName || "Untitled invite"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Sent {invite.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={invite.status} />
                  </div>

                  {invite.status === "PENDING" && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        readOnly
                        value={link}
                        className="w-full truncate rounded-full border border-pink-100 bg-pink-50/60 px-3.5 py-1.5 text-xs text-gray-600"
                      />
                      <CopyLinkButton link={link} />
                    </div>
                  )}

                  {invite.status === "CONFIRMED" && (
                    <div className="mt-3 rounded-2xl bg-gradient-to-r from-pink-50 to-orange-50 px-3.5 py-2.5 text-sm text-gray-700">
                      📅 {invite.chosenDate} at {invite.chosenTime} &middot;{" "}
                      {food ? `${food.emoji} ${food.label}` : invite.foodChoice}
                    </div>
                  )}

                  {invite.status === "DECLINED" && (
                    <p className="mt-3 text-sm text-gray-500">💔 They said no this time.</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-emerald-100 text-emerald-700",
    DECLINED: "bg-gray-100 text-gray-500",
  };
  const labels: Record<string, string> = {
    PENDING: "⏳ Waiting",
    CONFIRMED: "🎉 Confirmed",
    DECLINED: "💔 Declined",
  };
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
