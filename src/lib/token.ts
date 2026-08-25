import { randomBytes } from "crypto";

export function generateInviteToken() {
  return randomBytes(16).toString("base64url");
}
