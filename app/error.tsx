"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <h1 style={{ fontFamily: "var(--display)", fontSize: 40, textTransform: "uppercase" }}>
        Something tripped
      </h1>
      <p style={{ color: "var(--sky)", maxWidth: "44ch" }}>
        A wire came loose on our end. Try again — if it keeps happening, let us know.
      </p>
      <button className="btn" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
