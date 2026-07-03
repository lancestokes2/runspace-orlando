import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using RunSpace Orlando.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="legal">
      <div className="wrap">
        <Link className="back" href="/">
          ← Back to {site.name}
        </Link>
        <h1>Terms of Service</h1>
        <div className="updated">
          Last updated: <span className="ph">[DATE]</span>
        </div>

        <div className="note">
          Template starting point — not legal advice. Replace placeholders and have a professional
          review before scaling.
        </div>

        <p>By using {site.name} (the &ldquo;Site&rdquo;), you agree to these terms.</p>

        <h2>What RunSpace is</h2>
        <p>
          RunSpace is a free directory of Orlando-area run clubs and running events. We aggregate and
          summarize publicly available information to help runners decide where to run.
        </p>

        <h2>Accuracy &amp; &ldquo;verify before you go&rdquo;</h2>
        <p>
          We work hard to keep listings current, but run clubs and races change times, locations, and
          schedules — especially around holidays — often without notice.{" "}
          <b>
            Listings are provided &ldquo;as is,&rdquo; and you should always confirm details directly
            with the club or event organizer before attending.
          </b>{" "}
          We are not responsible for cancellations, changes, or information that turns out to be out of
          date.
        </p>

        <h2>Assumption of risk</h2>
        <p>
          Running and physical activity carry inherent risks. RunSpace does not organize, run, or
          supervise any club or event listed, and is not affiliated with them unless stated. You
          participate at your own risk and are responsible for your own safety and health decisions.
        </p>

        <h2>Third-party links</h2>
        <p>
          The Site links to third-party pages (Instagram, maps, registration, club sites). We
          don&rsquo;t control those and aren&rsquo;t responsible for their content or practices.
        </p>

        <h2>Submissions</h2>
        <p>
          If you submit a club, event, or correction, you confirm the information is accurate to your
          knowledge and that you have the right to share it. We may publish, edit, or decline
          submissions at our discretion.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Don&rsquo;t misuse the Site, scrape it at scale, or attempt to disrupt it.</li>
          <li>Don&rsquo;t submit false, misleading, or harmful information.</li>
        </ul>

        <h2>No warranty &amp; limitation of liability</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest
          extent permitted by law, RunSpace is not liable for any damages arising from your use of the
          Site or attendance at any listed club or event.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms; continued use after changes means you accept them.</p>

        <h2>Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Governed by
          the laws of <span className="ph">[State of Florida]</span>.
        </p>

        <footer>
          © {new Date().getFullYear()} {site.name} · <Link href="/privacy">Privacy</Link> ·{" "}
          <Link href="/">Home</Link>
        </footer>
      </div>
    </div>
  );
}
