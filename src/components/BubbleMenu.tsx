import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

const items: BubbleMenuItem[] = [
  { label: "Client", href: "/client" },
  { label: "Career", href: "/career" },
  { label: "Solution", href: "/client" },
  { label: "Let’s talk", href: "#features" },
];

export function BubbleMenu() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelsRef.current.filter(Boolean);

    if (open) {
      gsap.set(overlay, { display: "flex" });
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 16, autoAlpha: 0 });
      bubbles.forEach((bubble, index) => {
        gsap.to(bubble, { scale: 1, duration: 0.48, delay: index * 0.075, ease: "back.out(1.5)" });
        gsap.to(labels[index], { y: 0, autoAlpha: 1, duration: 0.35, delay: index * 0.075 + 0.08, ease: "power3.out" });
      });
    } else {
      gsap.to(labels, { y: 16, autoAlpha: 0, duration: 0.16, ease: "power2.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }

    return () => gsap.killTweensOf([overlay, ...bubbles, ...labels]);
  }, [open]);

  return (
    <div className="responsive-bubble-menu">
      <a className="responsive-bubble-logo" href="#top" aria-label="FaceBuilds home">
        <img src="/logo-transparent.png" alt="FaceBuilds" />
      </a>
      {!open && (
        <button
          className="responsive-bubble-toggle"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={false}
          aria-controls="responsive-bubble-links"
        >
          <span /><span />
        </button>
      )}
      <div className="responsive-bubble-overlay" id="responsive-bubble-links" ref={overlayRef} aria-hidden={!open} inert={!open}>
        <button className="responsive-bubble-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
          <span /><span />
        </button>
        <nav aria-label="Main navigation">
          {items.map((item, index) => (
            <a
              href={item.href}
              key={item.label}
              aria-label={item.ariaLabel ?? item.label}
              target={item.href.startsWith("https://") ? "_blank" : undefined}
              rel={item.href.startsWith("https://") ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              ref={(element) => { if (element) bubblesRef.current[index] = element; }}
            >
              <span ref={(element) => { if (element) labelsRef.current[index] = element; }}>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
