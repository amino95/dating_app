"use server";

import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { FOOD_OPTIONS } from "@/lib/food-options";

export async function declineInviteAction(token: string) {
  const invite = await prisma.invite.findUnique({ where: { token } });
  if (!invite || invite.status !== "PENDING") return;

  await prisma.invite.update({
    where: { token },
    data: { status: "DECLINED", respondedAt: new Date() },
  });

  const who = invite.inviteeName || "Someone";
  await sendPushToUser(invite.userId, {
    title: "💔 They said no",
    body: `${who} declined your date invite.`,
    url: "/dashboard",
  });
}

export async function confirmInviteAction(
  token: string,
  data: { date: string; time: string; food: string }
) {
  if (!data.date || !data.time || !data.food) {
    throw new Error("Missing date, time, or food choice.");
  }

  const invite = await prisma.invite.findUnique({ where: { token } });
  if (!invite || invite.status !== "PENDING") return;

  await prisma.invite.update({
    where: { token },
    data: {
      status: "CONFIRMED",
      chosenDate: data.date,
      chosenTime: data.time,
      foodChoice: data.food,
      respondedAt: new Date(),
    },
  });

  const who = invite.inviteeName || "Someone";
  const food = FOOD_OPTIONS.find((f) => f.value === data.food);
  const foodLabel = food ? `${food.emoji} ${food.label}` : data.food;

  await sendPushToUser(invite.userId, {
    title: "🎉 They said yes!",
    body: `${who} is in for ${foodLabel} on ${data.date} at ${data.time}.`,
    url: "/dashboard",
  });
}
