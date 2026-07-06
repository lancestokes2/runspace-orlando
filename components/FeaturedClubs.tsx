import Link from "next/link";
import { clubs, getClub } from "@/lib/data";
import { copy } from "@/lib/site";

const FEATURED = [
  { slug: "park-brewing-run-club", archetype: "★ Beginner-friendly" },
  { slug: "orlando-social-run-club", archetype: "★ Big & social" },
  { slug: "runcfl", archetype: "★ Serious training" },
] as const;

export function FeaturedClubs() {
  return (
    <section className="sec" id="newbie" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="newbie">
          <div className="nb-eyebrow">★ New to Orlando running?</div>
          <h2>Start here — there&rsquo;s a club for every kind of runner</h2>
          <p className="nb-lead">{copy.newbieLead}</p>
          <div className="nb-cards">
            {FEATURED.map(({ slug, archetype }) => {
              const c = getClub(slug);
              if (!c) return null;
              return (
                <div className="nb-card" key={c.slug}>
                  <div className="nb-day">{archetype}</div>
                  <h3>
                    {c.hasProfile ? (
                      <Link href={`/clubs/${c.slug}`} style={{ color: "inherit" }}>
                        {c.name}
                      </Link>
                    ) : (
                      c.name
                    )}
                  </h3>
                  <p>{c.newbie ?? c.perk}</p>
                </div>
              );
            })}
          </div>
          <Link className="btn ghost" href="/clubs" style={{ marginTop: 24, display: "inline-flex" }}>
            See all {clubs.length} Orlando run clubs →
          </Link>
        </div>
      </div>
    </section>
  );
}
