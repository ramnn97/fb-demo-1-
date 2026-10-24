import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";

export function WhyChooseSection() {
  const [expanded, setExpanded] = useState(false);
  const [near, setNear] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const expansionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!expanded) {
      video?.pause();
      if (video) video.currentTime = 0;
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    video?.play().catch(() => undefined);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  function openPanel() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setExpanded(true);
  }

  function closePanel() {
    setExpanded(false);
    setNear(false);
    triggerRef.current?.style.setProperty("--proximity-scale", "1");
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  function resetVideoOnLeave(event: PointerEvent<HTMLVideoElement>) {
    event.currentTarget.pause();
    event.currentTarget.currentTime = 0;
    closePanel();
  }

  function updateProximity(event: PointerEvent<HTMLElement>) {
    const button = triggerRef.current;
    if (!button) return;
    const bounds = button.getBoundingClientRect();
    const distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
    const proximity = Math.max(0, 1 - distance / 360);
    button.style.setProperty("--proximity-scale", (1 + proximity * 0.26).toFixed(3));
    expansionRef.current?.style.setProperty("--preview-scale", (0.4 + proximity * 0.6).toFixed(3));
    expansionRef.current?.style.setProperty("--preview-radius", `${Math.round(80 + proximity * 220)}px`);
    const isNear = proximity > 0.04;
    if (isNear && !near && !expanded) setOrigin({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
    setNear(isNear && !expanded);
  }

  return (
    <section className="why-choose-section" id="why-choose" aria-labelledby="why-choose-title" onPointerMove={updateProximity} onPointerLeave={() => { triggerRef.current?.style.setProperty("--proximity-scale", "1"); setNear(false); }}>
      <div className="why-choose-content">
        <p className="section-label">WHY CHOOSE US</p>
        <h2 id="why-choose-title">Why choose <em>us?</em></h2>
        <button ref={triggerRef} className="why-choose-trigger" type="button" onClick={openPanel} onPointerEnter={openPanel} onPointerMove={updateProximity} aria-haspopup="dialog" aria-expanded={expanded}>
          <span>Move closer</span><ArrowUpRight aria-hidden="true" />
        </button>
      </div>

      <div
        ref={expansionRef}
        className={`why-choose-expansion${near ? " is-near" : ""}${expanded ? " is-open" : ""}`}
        style={{ "--reveal-x": `${origin.x}px`, "--reveal-y": `${origin.y}px` } as CSSProperties}
        role={expanded ? "dialog" : undefined}
        aria-modal={expanded || undefined}
        aria-label="Why choose FaceBuilds"
        aria-hidden={!expanded}
      >
        <div className="why-choose-expanded-content">
          <video
            ref={videoRef}
            className="why-choose-video"
            src="/why-choose-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="FaceBuilds video"
            onPointerLeave={resetVideoOnLeave}
          />
        </div>
      </div>
    </section>
  );
}
