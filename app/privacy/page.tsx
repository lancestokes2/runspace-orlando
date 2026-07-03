import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RunSpace Orlando handles your information.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="legal">
      <div className="wrap">
        <Link className="back" href="/">
          ← Back to {site.name}
        </Link>
        <h1>Privacy Policy</h1>
        <div className="updated">
          Last updated: <span className="ph">[DATE]</span>
        </div>

        <div className="note">
          Template starting point — not legal advice. Replace the highlighted placeholders with your
          details and have a professional review it before you scale, especially if you collect users
          outside the U.S.
        </div>

        <p>
          {site.name} (&ldquo;RunSpace,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) helps Orlando-area
          runners find run clubs and races. This policy explains what we collect and how we use it.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <b>Waitlist details</b> — your name, email, city/area, pace, and how you found us, when you
            join our waitlist, so we can send you weekly run club and race updates.
          </li>
          <li>
            <b>Messages you send us</b> — if you email us or submit a club/race, we keep what you send.
          </li>
          <li>
            <b>Basic usage data</b> — if analytics are enabled, aggregate, non-identifying information
            about how the site is used. <span className="ph">[Remove if you use no analytics.]</span>
          </li>
        </ul>
        <p>We do not collect payment information, and we do not ask for sensitive personal data.</p>

        <h2>How we use it</h2>
        <ul>
          <li>To send you the run club and race updates you signed up for.</li>
          <li>To respond to your messages and verify club/race submissions.</li>
          <li>To understand, in aggregate, what&rsquo;s useful so we can improve the site.</li>
        </ul>

        <h2>What we don&rsquo;t do</h2>
        <p>
          We don&rsquo;t sell your information. We don&rsquo;t share your email with run clubs,
          advertisers, or third parties, except service providers that help us operate (for example,
          our database and email provider, <span className="ph">[e.g., Supabase / Buttondown]</span>),
          who may only use it to provide that service.
        </p>

        <h2>Unsubscribing</h2>
        <p>
          Every email includes an unsubscribe link. You can opt out at any time, or email us at{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> to be removed.
        </p>

        <h2>Data retention &amp; your rights</h2>
        <p>
          We keep your information until you unsubscribe or ask us to delete it. To access, correct, or
          delete your information, email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>{" "}
          and we&rsquo;ll handle it promptly.
        </p>

        <h2>Children</h2>
        <p>
          RunSpace is not directed to children under 13, and we don&rsquo;t knowingly collect their
          information.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy; we&rsquo;ll change the &ldquo;last updated&rdquo; date above when we
          do.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <span className="ph">[ · mailing address required by CAN-SPAM for newsletters]</span>.
        </p>

        <footer>
          © {new Date().getFullYear()} {site.name} · <Link href="/terms">Terms</Link> ·{" "}
          <Link href="/">Home</Link>
        </footer>
      </div>
    </div>
  );
}
