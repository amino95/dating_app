"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { generateInviteToken } from "@/lib/token";

export async function createInviteAction(formData: FormData) {
  const user = await requireUser();

  const inviteeName = (formData.get("inviteeName") as string | null)?.trim() || null;
  const message = (formData.get("message") as string | null)?.trim() || null;

  await prisma.invite.create({
    data: {
      token: generateInviteToken(),
      userId: user.id,
      inviteeName,
      message,
    },
  });

  revalidatePath("/dashboard");
}
