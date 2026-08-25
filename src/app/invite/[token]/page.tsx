import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { InviteFlow } from "./InviteFlow";
import { Stickers } from "@/components/Stickers";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { user: { select: { name: true } } },
  });

  if (!invite) notFound();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12">
      <Stickers
        items={[
          { emoji: "💖", className: "left-[8%] top-[12%]", rotate: -10 },
          { emoji: "🍕", className: "right-[10%] top-[16%]", rotate: 12, delay: 0.5 },
          { emoji: "🍣", className: "left-[10%] bottom-[18%]", rotate: 8, delay: 1 },
          { emoji: "✨", className: "right-[8%] bottom-[20%]", rotate: -8, delay: 1.4 },
        ]}
      />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-pink-100 bg-white/80 p-8 shadow-xl shadow-pink-100/60 backdrop-blur">
        <InviteFlow
          token={token}
          requesterName={invite.user.name}
          message={invite.message}
          initialStatus={invite.status}
          chosenDate={invite.chosenDate}
          chosenTime={invite.chosenTime}
          foodChoice={invite.foodChoice}
          responseMessage={invite.responseMessage}
        />
      </div>
    </main>
  );
}
