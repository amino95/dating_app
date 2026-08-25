import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Ask Them Out",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm font-medium text-pink-600 hover:text-pink-700">
        ← Back home
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold text-gray-900">Privacy Policy</h1>
      <p className="mt-1 text-sm text-gray-500">Effective date: August 25, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">Overview</h2>
          <p className="mt-2">
            Ask Them Out (&quot;the App&quot;, &quot;we&quot;, &quot;us&quot;) lets a Requester
            create a link to invite someone on a date. This policy explains what information we
            collect, how we use it, and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">
            Information we collect
          </h2>
          <p className="mt-2 font-medium text-gray-900">From the person who creates an account (the Requester)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Name and email address</li>
            <li>Your password, stored only as a one-way hash — we never store or can see your actual password</li>
            <li>Any invite details you create, such as the invitee&apos;s name and your message</li>
          </ul>

          <p className="mt-4 font-medium text-gray-900">From the person who receives an invite link (the Invitee)</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>No account or personal information is required to open an invite link</li>
            <li>
              If you accept an invite, we store the date, time, and food choice you select,
              tied to that specific invite link
            </li>
            <li>
              If you leave an optional note when responding (whether you accept or decline), we
              store that note and show it to the Requester
            </li>
            <li>
              We do not collect your name, email, or any other identifying information, unless
              the Requester already entered your name when creating the invite
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">
            How we use information
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To create and manage Requester accounts</li>
            <li>To generate invite links and display their responses to the Requester</li>
            <li>To keep Requesters signed in via a secure session cookie</li>
          </ul>
          <p className="mt-2">
            We do not use your information for advertising, and we do not sell or share it with
            third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">Cookies</h2>
          <p className="mt-2">
            We use a single essential cookie to keep Requesters signed in. It is not used for
            tracking or advertising, and it expires automatically after 30 days. Invitees who
            don&apos;t have an account never receive this cookie.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">Data storage</h2>
          <p className="mt-2">
            Data is stored in a hosted database (Turso) and the App is hosted on Vercel. Both
            providers act as infrastructure processors on our behalf and do not use your data for
            their own purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">
            Data retention &amp; deletion
          </h2>
          <p className="mt-2">
            We retain account and invite data until you ask us to delete it. To request deletion
            of your account and associated data, contact us using the email below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">
            Children&apos;s privacy
          </h2>
          <p className="mt-2">
            This App is not directed to children under 13, and we do not knowingly collect
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">
            Changes to this policy
          </h2>
          <p className="mt-2">
            We may update this policy from time to time. Changes will be posted on this page with
            a new effective date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-gray-900">Contact</h2>
          <p className="mt-2">
            Questions about this policy, or requests to delete your data? Contact us at{" "}
            <span className="font-medium text-gray-900">[your contact email]</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
