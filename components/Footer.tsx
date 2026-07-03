import Link from "next/link";
import { site } from "@/lib/site";
import { copy } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap">
        <a
          className="btn ghost"
          href={`mailto:${site.contactEmail}?subject=Submit%20a%20club%20or%20race`}
          style={{ color: "var(--ink)", borderColor: "#d9cdb8" }}
        >
          ＋ Submit a club or race
        </a>
        <p className="fnote">{copy.footerNote}</p>
        <p className="fnote legalbar">
          © {year} {site.name} ·{" "}
          <Link href="/privacy">Privacy</Link> ·{" "}
          <Link href="/terms">Terms</Link> ·{" "}
          <a href={`mailto:${site.contactEmail}`}>Contact</a>
        </p>
      </div>
    </footer>
  );
}
