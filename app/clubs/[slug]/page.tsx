import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clubs, getClub, getProfile } from "@/lib/data";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import { ClubActions } from "@/components/ClubActions";
import { WaitlistForm } from "@/components/WaitlistForm";

export function generateStaticParams() {
  return clubs.filter((c) => c.hasProfile).map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) return {};
  const desc = `What ${club.name} is actually like: real pace, turnout, parking and first-timer tips before you show up. ${club.time} at ${club.location}, ${club.area}.`;
  return {
    title: `${club.name} — what it's actually like`,
    description: desc,
    alternates: { canonical: `/clubs/${club.slug}` },
    openGraph: {
      type: "article",
      title: `${club.name} — what it's actually like`,
      description: desc,
      url: `${site.url}/clubs/${club.slug}`,
    },
    twitter: { card: "summary_large_image", title: club.name, description: desc },
  };
}

function Dots({ value, kind }: { value: number; kind: "begin" | "social" | "train" }) {
  const cls = kind === "social" ? "score social" : kind === "train" ? "score train" : "score";
  return { cls, dots: Array.from({ length: 5 }, (_, i) => i < value) };
}

export default async function ClubProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = getClub(slug);
  const profile = getProfile(slug);
  if (!club || !profile) notFound();

  return (
    <div className="club-page">
      <div className="protostrip">
        Example profile — details marked <b>EX</b> are illustrative until verified on the ground.
      </div>

      <nav>
        <Link className="back" href="/">
          ← All Orlando run clubs
        </Link>
        <Link href="/" className="pbrand">
          RUN<span>SPACE</span>
        </Link>
      </nav>

      <header className="chero">
        <div className="wrap">
          <div className="eyebrow">
            <span className="verified">● Updated weekly</span> · Thursday-night run club
          </div>
          <h1 className="club">{club.name}</h1>
          <p className="bestfor-line">
            <b>Best for:</b> {profile.bestFor}
          </p>
          <div className="keystrip">
            <div className="ks">
              <div className="k">When</div>
              <div className="v">{club.time}</div>
            </div>
            <div className="ks">
              <div className="k">Where</div>
              <div className="v">{club.location}</div>
            </div>
            <div className="ks">
              <div className="k">Real pace</div>
              <div className="v accent">{profile.realPace}</div>
            </div>
            <div className="ks">
              <div className="k">Typical turnout</div>
              <div className="v">{profile.turnout}</div>
            </div>
          </div>
          <ClubActions club={club} />
        </div>
      </header>

      <main>
        <section className="dsec">
          <div className="wrap">
            <h2 className="dsec-h">What it&rsquo;s actually like</h2>
            <p className="dsec-sub">
              The stuff you actually wonder about before showing up somewhere new.
            </p>
            <div className="qgrid">
              {profile.cards.map((card) => (
                <div className="q" key={card.label}>
                  <div className="qhead">
                    <div className="ic">
                      <Icon name={card.icon} />
                    </div>
                    <div className="ql">
                      {card.label}
                      {card.example && <span className="eg">EX</span>}
                    </div>
                  </div>
                  <div className="qa">{card.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="dsec-h">Is it a fit for you?</h2>
            <p className="dsec-sub">No club is for everyone — here&rsquo;s the honest read.</p>
            <div className="fit">
              <div className="fitcard good">
                <h3>Great if you…</h3>
                <ul>
                  {profile.fitGood.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="fitcard less">
                <h3>Look elsewhere if you…</h3>
                <ul>
                  {profile.fitLess.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="scores">
              {profile.scores.map((s) => {
                const { cls, dots } = Dots({ value: s.value, kind: s.kind });
                return (
                  <div className={cls} key={s.label}>
                    <div className="sl">{s.label}</div>
                    <div className="sv">
                      {s.value}
                      <span>/5</span>
                    </div>
                    <div className="dots">
                      {dots.map((on, i) => (
                        <span className={`dot${on ? " on" : ""}`} key={i} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="take">
              <div className="tlabel">Our take</div>
              {profile.ourTake.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="byline">— RunSpace · written from community notes</div>
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="dsec-h">Your first time, step by step</h2>
            <p className="dsec-sub">Exactly how to show up without the guesswork.</p>
            <div className="steps">
              {profile.steps.map((s) => (
                <div className="step" key={s.title}>
                  <h3>
                    {s.title}
                    {s.example && <span className="eg">EX</span>}
                  </h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="dsec-h">The route</h2>
            <p className="dsec-sub">{profile.route.summary}</p>
            <div className="route">
              <div className="routemap">
                <svg viewBox="0 0 600 150" preserveAspectRatio="none" aria-hidden="true">
                  <path className="rl" d="M30 110 C 140 30, 240 130, 330 70 S 520 30, 570 90" />
                  <circle className="pin" cx="30" cy="110" r="6" />
                  <circle className="pin" cx="570" cy="90" r="6" />
                </svg>
                <span className="lbl">Approximate loop · starts &amp; ends at {club.location}</span>
              </div>
              <div className="routebody">
                <div className="rt">{profile.route.detail}</div>
                <a
                  className="btn ghost"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${club.location}, ${club.area}, Orlando FL`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--ink)" }}
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="dsec-h">Reviews</h2>
            <div className="reviews">
              <div className="em">Be the first to review</div>
              <p>
                Been to a {club.name} run? Tell other runners what it was really like — pace, vibe,
                and whether you&rsquo;d go back.
              </p>
              <a className="btn" href={`mailto:${site.contactEmail}?subject=Review:%20${encodeURIComponent(club.name)}`}>
                Leave a review
              </a>
              <div className="soon">User reviews &amp; accounts are coming soon.</div>
            </div>
          </div>
        </section>

        <section className="dsec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="dwl">
              <div>
                <h3>Get this every Monday</h3>
                <p>This weekend&rsquo;s Orlando races and any new clubs — one email, that&rsquo;s it.</p>
              </div>
              <WaitlistForm variant="compact" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p className="fnote">
            Club details reflect the usual weekly schedule and may shift around holidays — always
            confirm on the club&rsquo;s Instagram before heading out. ·{" "}
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> ·{" "}
            <a href={`mailto:${site.contactEmail}`}>Contact</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
