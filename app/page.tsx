import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { RacesSection } from "@/components/RacesSection";
import { FeaturedClubs } from "@/components/FeaturedClubs";
import { clubs } from "@/lib/data";
import { copy } from "@/lib/site";

export default function HomePage() {
  const groupRunsPerWeek = clubs.reduce((sum, c) => sum + c.days.length, 0);

  return (
    <>
      <div className="protostrip">
        Launching soon in Orlando — join the waitlist below. (Real local data, updated weekly.)
      </div>

      <Nav />

      <header className="hero">
        <div className="glow" />
        <div className="wrap">
          <div className="h-eyebrow">{copy.heroEyebrow}</div>
          <h1 className="promise">
            Every run in Orlando. <em>One place.</em>
          </h1>
          <p className="subpromise">
            Every group run, race, and club — pulled out of scattered Instagram pages and event sites
            into <b>one map, updated every Monday.</b>
            {copy.heroSubProEnd}
          </p>

          <WaitlistForm variant="hero" />

          <a className="startlink" href="#newbie">
            New to running? Start here →
          </a>

          <div className="proof">
            <div className="p">
              <div className="pn">
                <span>{clubs.length}</span>
              </div>
              <div className="pl">Run clubs listed</div>
            </div>
            <div className="p">
              <div className="pn">
                <span>{groupRunsPerWeek}+</span>
              </div>
              <div className="pl">Group runs a week</div>
            </div>
            <div className="p">
              <div className="pn">
                <span>$0</span>
              </div>
              <div className="pl">To start — most are free</div>
            </div>
          </div>
        </div>
      </header>

      <svg className="routeline" viewBox="0 0 1200 18" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 12 Q 150 2 300 9 T 600 7 T 900 11 T 1200 5" />
        <circle cx="600" cy="7" r="4.5" />
      </svg>

      <RacesSection variant="home" />

      <FeaturedClubs />

      <section className="founder">
        <div className="wrap">
          <div className="avatar" aria-hidden="true" />
          <p>{copy.founder}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
