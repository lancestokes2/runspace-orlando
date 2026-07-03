import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 22px",
        gap: 16,
      }}
    >
      <h1 style={{ fontFamily: "var(--display)", fontSize: 56, textTransform: "uppercase" }}>
        Off the route
      </h1>
      <p style={{ color: "var(--sky)", maxWidth: "44ch" }}>
        That page took a wrong turn. Let&rsquo;s get you back to the run.
      </p>
      <Link className="btn" href="/">
        Back to RunSpace →
      </Link>
    </main>
  );
}
