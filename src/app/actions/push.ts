"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { sendPushToUser } from "@/lib/push";

export async function subscribeToPushAction(subscription: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}) {
  const userId = await getSessionUserId();
  if (!userId) return;

  await prisma.pushSubscription.upsert({
    where: { endpoint: subscription.endpoint },
    update: { userId, p256dh: subscription.keys.p256dh, auth: subscription.keys.auth },
    create: {
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      userId,
    },
  });

  await sendPushToUser(userId, {
    title: "Welcome to Ask Them Out! 🎉",
    body: "We'll notify you here as soon as someone responds to your invites.",
    url: "/dashboard",
  });
}
