import { createFileRoute, Link } from "@tanstack/react-router";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CirclePlay, Lightbulb, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustedClients } from "@/components/TrustedClients";
import { TestimonialSection } from "@/components/TestimonialSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { SiteFooter } from "@/components/SiteFooter";
import { BubbleMenu } from "@/components/BubbleMenu";
import portrait from "@/assets/mindly-wire-blue.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "We give your expertise a face" },
      { name: "description", content: "A beautiful space to capture ideas, make sense of your thoughts, and find your focus." },
      { property: "og:title", content: "We give your expertise a face" },
      { property: "og:description", content: "Capture ideas, organize your thoughts, and find your focus in one beautiful space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ideas = [
  { title: "No Results?", phase: 205 },
  { title: "Low Views?", phase: 310 },
  { title: "No Strategy?", phase: 5 },
  { title: "Wrong Positioning?", phase: 55 },
  { title: "Camera Fear?", phase: 110 },
  { title: "No Differentiation?", phase: 160 },
  { title: "Invisible Expert?", phase: 255 },
];

type OrbitHandle = { spin: () => void };

const HomeOrbit = forwardRef<OrbitHandle>(function HomeOrbit(_props, ref) {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; angle: number } | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({ spin: () => setAngle((current) => current + 72) }), []);

  useEffect(() => {
    if (dragging || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setAngle((current) => current + 1.9), 60);
    return () => window.clearInterval(timer);
  }, [dragging]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    drag.current = { x: event.clientX, angle };
    setDragging(true);
    stage.current?.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setAngle(drag.current.angle + (event.clientX - drag.current.x) * 0.45);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    drag.current = null;
    setDragging(false);
    if (stage.current?.hasPointerCapture(event.pointerId)) stage.current.releasePointerCapture(event.pointerId);
  }

  const orbitCards = ideas.map(({ title, phase }) => {
    const radians = ((phase + angle) * Math.PI) / 180;
    const depth = Math.sin(radians);
    const horizontal = Math.cos(radians);
    const left = (50 + horizontal * 46).toFixed(4);
    const top = (38 + depth * 18).toFixed(4);
    const rotateY = (-horizontal * 27).toFixed(4);
    const rotateZ = (-horizontal * 6).toFixed(4);
    const scale = (0.82 + (depth + 1) * 0.12).toFixed(4);
    return {
      front: depth >= 0,
      node: <div
        className="problem-label"
        key={title}
        style={{ left: `${left}%`, top: `${top}%`, transform: `translate(-50%, -50%) perspective(650px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})` }}
      >
        {title}
      </div>,
    };
  });

  return (
    <div className="orbit-scene">
      <div className="orbit-ring orbit-ring-back" aria-hidden="true" />
      <div className="orbit-layer orbit-back" aria-hidden="true">{orbitCards.filter((card) => !card.front).map((card) => card.node)}</div>
      <div className="portrait-wrap"><img src={portrait} alt="Abstract wire-line portrait representing the inner workings of a mind" width={1728} height={2304} decoding="async" fetchPriority="high" draggable={false} /></div>
      <div className="orbit-ring orbit-ring-front" aria-hidden="true" />
      <div className="orbit-layer orbit-front" aria-hidden="true">{orbitCards.filter((card) => card.front).map((card) => card.node)}</div>
      <div className={`orbit-stage${dragging ? " is-dragging" : ""}`} ref={stage} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} aria-label="Drag to spin the brand challenges around the portrait" />
    </div>
  );
});

const storyCards = [
  { title: "Personal Branding", description: "We position doctors and professionals as top authorities in their niche through strategic, compelling branding that builds lasting trust.", accent: "reach", image: "/personal-branding.png" },
  { title: "PR Management", description: "We amplify your reach through strategic content distribution and securing high-impact podcast features to elevate your industry presence.", accent: "story", image: "/digital-pr.png" },
  { title: "AI Content Creation", description: "We generate cutting-edge AI avatars and produce dynamic AI videos to scale your personal brand effortlessly and innovatively.", accent: "trust", image: null },
  { title: "Podcast Production", description: "We handle everything from recording to final editing, delivering professional-grade podcasts that engage your audience and build your brand.", accent: "growth", image: "/podcast-production.jpeg" },
  { title: "Performance Marketing", description: "We drive measurable growth and high-quality leads using data-driven, targeted ad campaigns designed to maximize your return on investment.", accent: "voice", image: "/performance-marketing.png" },
  { title: "Event Shoot Production", description: "We capture your live events with cinematic precision, delivering high-quality visual content that perfectly showcases your brand's true impact.", accent: "clarity", image: "/event-shoot-production.jpeg" },
  { title: "Influencer Marketing", description: "We bridge the gap, connecting impactful influencers with your brand, and securing premium brand partnerships for our own clients.", accent: "confidence", image: "/influencer-marketing.png" },
  { title: "AI Automation & Funnels", description: "We build powerful n8n workflows and custom WhatsApp funnel automations to streamline your lead generation and scale your business effortlessly.", accent: "impact", image: "/ai-automation-chat.jpeg" },
];

function Home() {
  const [statsProgress, setStatsProgress] = useState(0);
  const orbit = useRef<OrbitHandle>(null);
  const storySection = useRef<HTMLElement>(null);
  const storyViewport = useRef<HTMLDivElement>(null);
  const storyTrack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const duration = 2000;
    let frame = 0;
    let startTime: number | undefined;
    const animate = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      setStatsProgress(1 - (1 - progress) ** 4);
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatsProgress(1);
    } else {
      frame = window.requestAnimationFrame(animate);
    }
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let context: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !storySection.current || !storyViewport.current || !storyTrack.current) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const distance = () => Math.max(0, storyTrack.current!.scrollWidth - storyViewport.current!.clientWidth);
        gsap.to(storyTrack.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: storySection.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
      }, storySection);
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <>
    <main>
      <div className="page-frame">
        <header className="site-header home-header">
          <a className="wordmark home-wordmark" href="#top" aria-label="FaceBuilds home">
            <img className="brand-monogram" src="/logo-transparent.png" alt="" />
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/client"><UsersRound size={18} strokeWidth={2} aria-hidden="true" />Client</Link>
            <Link to="/career"><BriefcaseBusiness size={18} strokeWidth={2} aria-hidden="true" />Career</Link>
            <Link to="/client"><Lightbulb size={18} strokeWidth={2} aria-hidden="true" />Solution</Link>
          </nav>
          <a className="header-action home-explore" href="#features">Let’s talk <ArrowUpRight size={15} strokeWidth={1.8} /></a>
          <BubbleMenu />
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              <span className="hero-title-left">We give your</span>
              <br className="hero-title-break" />
              <span className="hero-title-right"><em>expertise a <span className="brand-blue">face</span></em></span>
            </h1>
          </div>

          <HomeOrbit ref={orbit} />
          <div className="hero-stat hero-stat-left">
            <strong className="hero-stat-value">{Math.round(1000 * statsProgress).toLocaleString()}<span>M+</span></strong>
            <span className="hero-stat-label">Views</span>
            <small>All Organically<br />Within an Year</small>
          </div>
          <div className="hero-stat hero-stat-right">
            <strong className="hero-stat-value">{Math.round(50 * statsProgress)}<span>+</span></strong>
            <span className="hero-stat-label">Clients</span>
            <small>Across the Globe</small>
          </div>
          <div className="hero-actions">
            <Button variant="hero" size="lg" asChild><a href="#features">Explore the space <ArrowRight /></a></Button>
            <Button variant="heroOutline" size="lg" onClick={() => orbit.current?.spin()}><CirclePlay /> Spin the ideas</Button>
          </div>
        </section>
      </div>

      <section className="story-section" id="features" ref={storySection}>
        <div className="story-heading">
          <div><h2>Make your expertise<br /><em>impossible to miss.</em></h2></div>
          <p className="story-intro">A clear point of view. A story people remember. A personal brand built around what makes you, you.</p>
        </div>
        <div className="story-viewport" ref={storyViewport}>
          <div className="story-track" ref={storyTrack}>
            {storyCards.map((card, index) => (
              <article className={`story-card story-card-${card.accent}`} key={card.title}>
                <span className="story-card-number">{String(index + 1).padStart(2, "0")}.</span>
                <div className={`story-card-art${card.image ? " has-image" : ""}`} aria-hidden="true">
                  {card.image ? <img src={card.image} alt="" loading="lazy" /> : <><span /><span /><span /><span /></>}
                </div>
                <div className="story-card-copy"><h3>{card.title}</h3><p>{card.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustedClients compact />
      <WhyChooseSection />
      <TestimonialSection />
    </main>
    <SiteFooter />
    </>
  );
}
