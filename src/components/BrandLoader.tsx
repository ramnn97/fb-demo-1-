import { useEffect, useState } from "react";

export default function BrandLoader() {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showDuration = reducedMotion ? 700 : 2250;
    const exitDuration = reducedMotion ? 250 : 450;
    const exitTimer = window.setTimeout(() => setLeaving(true), showDuration);
    const hideTimer = window.setTimeout(() => setHidden(true), showDuration + exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`brand-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading FaceBuilds"
    >
      <div className="brand-loader__mark">
        <div className="brand-loader__reveal">
          <img src="/facebuilds-wordmark-cutout.png" alt="FACEBUILDS, personal branding company" />
        </div>
        <span className="brand-loader__caret" aria-hidden="true" />
      </div>
    </div>
  );
}
