"use client";

import { useEffect, useState } from "react";
import { subscribeToPushAction } from "@/app/actions/push";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribe() {
  const registration = await navigator.serviceWorker.ready;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

  const existing = await registration.pushManager.getSubscription();
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    }));

  const json = subscription.toJSON();
  await subscribeToPushAction({
    endpoint: json.endpoint!,
    keys: { p256dh: json.keys!.p256dh, auth: json.keys!.auth },
  });
}

type PermissionState = "unsupported" | "default" | "granted" | "denied";

export function NotificationSetup() {
  const [status, setStatus] = useState<PermissionState>("default");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;

    // Notification.permission has no native change event to subscribe to, so a one-time
    // read-on-mount is the only way to sync it; there's no derivable-at-render alternative.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(supported ? (Notification.permission as PermissionState) : "unsupported");

    if (supported && Notification.permission === "granted") {
      subscribe().catch(() => {});
    }
  }, []);

  async function handleEnable() {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      setStatus(permission as PermissionState);
      if (permission === "granted") {
        await subscribe();
      }
    } finally {
      setBusy(false);
    }
  }

  if (status !== "default") return null;

  return (
    <button
      type="button"
      onClick={handleEnable}
      disabled={busy}
      className="mt-4 w-full rounded-full border-2 border-pink-200 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50 disabled:opacity-50"
    >
      🔔 {busy ? "Enabling..." : "Enable notifications for responses"}
    </button>
  );
}
