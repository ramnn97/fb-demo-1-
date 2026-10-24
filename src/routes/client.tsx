import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/client")({
  head: () => ({
    meta: [
      { title: "Our Solutions — FaceBuilds" },
      { name: "description", content: "Explore FaceBuilds solutions for personal branding, content, PR, marketing, events, and automation." },
      { property: "og:title", content: "Our Solutions — FaceBuilds" },
      { property: "og:description", content: "A complete creative and growth system for building a brand people remember." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientPage,
});

const solutions = [
  {
    number: "01",
    title: "Personal Branding",
    promise: "Be the name they remember.",
    description: "People don't just buy products, they buy people they trust. We turn your story, skills, and personality into a brand that feels real, looks sharp, and stays in people's minds long after they scroll past.",
    points: ["Story & positioning", "Content roadmap", "Profile makeover", "Signature look & feel"],
  },
  {
    number: "02",
    title: "Podcast Production",
    promise: "You bring the talk, we bring the polish.",
    description: "From the first topic idea to the final upload, we take care of the heavy lifting. You get a podcast that sounds crisp, looks pro, and makes you the go-to voice in your space.",
    points: ["Topic & guest planning", "High-quality studio recording", "Clean editing & mixing", "Reels from podcasts"],
  },
  {
    number: "03",
    title: "Performance Marketing",
    promise: "Ads that earn, not just run.",
    description: "Budget kahan gaya? Never a question you'll have to ask. We build ad campaigns around numbers, testing, and smart targeting, so every rupee works harder and brings you real customers.",
    points: ["Meta & Google ads", "Smart audience targeting", "Scroll-stopping Reels & creatives", "Clear monthly reports"],
  },
  {
    number: "04",
    title: "Influencer Marketing",
    promise: "Right faces. Real trust.",
    description: "Likes are easy, belief is rare. We match you with brands your audience already listens to, and shape collaborations that feel natural, not forced.",
    points: ["Brand hunt & shortlisting", "Deals & coordination", "Campaign brief & planning", "Results tracking"],
  },
  {
    number: "05",
    title: "Event Shoot Production",
    promise: "Moments end. Content doesn't.",
    description: "Your event takes weeks to plan and one day to happen. We capture every spark and turn it into videos, reels, and photos that keep working for you for months afterward.",
    points: ["Photo & video coverage", "Same-day reels", "Guest soundbites", "Pre & post-event marketing"],
  },
  {
    number: "06",
    title: "PR Management",
    promise: "Let the right people talk about you.",
    description: "Good work deserves good headlines. We craft your story, pitch it to podcast channels, distribute content across multiple channels, and protect your reputation—so you earn credibility money can't buy through ads.",
    points: ["Content distribution", "Podcast outreach", "Image & reputation care", "Interviews & features"],
  },
  {
    number: "07",
    title: "AI Content Creation",
    promise: "More content. Less waiting.",
    description: "Why wait weeks for one video? We use AI to create ads, visuals, and scripts at lightning speed while keeping your voice and feel completely intact.",
    points: ["AI organic videos & ads", "Scripts & captions", "Creative visuals", "Multi-language versions"],
  },
  {
    number: "08",
    title: "AI Automation & Funnels",
    promise: "Your business, always on.",
    description: "Stop chasing every lead by hand. We build smart systems that catch interested people, follow up on time, and guide them to buy, even when you're asleep or busy.",
    points: ["Landing pages & funnels", "WhatsApp & email flows", "Automated lead follow-up workflows", "Chatbot & AI calling setup"],
  },
];

function ClientPage() {
  const pageRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = page.querySelectorAll<HTMLElement>("[data-reveal]");
    let observer: IntersectionObserver | undefined;

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -7% 0px" });
      revealTargets.forEach((target) => observer.observe(target));
    }

    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <main className="client-page solutions-page" ref={pageRef}>
      <div className="solutions-reading-progress" ref={progressRef} aria-hidden="true" />
      <header className="solutions-header">
        <Link to="/" className="wordmark" aria-label="FaceBuilds home"><img src="/logo-transparent.png" alt="FaceBuilds" /></Link>
        <nav aria-label="Main navigation">
          <a className="is-current" href="#solutions">Solutions</a>
          <Link to="/">Home</Link>
        </nav>
        <a className="solutions-header-cta" href="#solutions">Explore solutions <ArrowDown aria-hidden="true" /></a>
      </header>

      <section className="solutions-hero" aria-labelledby="solutions-title">
        <div className="solutions-hero-copy" data-reveal>
          <p className="solutions-eyebrow"><span /> FaceBuilds <span className="solutions-eyebrow-slash">/</span> Our capabilities</p>
          <h1 id="solutions-title">Make your brand<br /><em>impossible to miss.</em></h1>
          <p className="solutions-hero-intro">One connected team for the strategy, stories, and systems that turn attention into lasting growth.</p>
          <a className="solutions-hero-link" href="#solutions">Explore the solutions <ArrowDown aria-hidden="true" /></a>
        </div>
        <div className="solutions-hero-aside" data-reveal>
          <span className="solutions-index">08</span>
          <span>Ways to build momentum.<br />One team behind it.</span>
        </div>
      </section>

      <section className="solutions-list" id="solutions" aria-label="Our solutions">
        <div className="solutions-list-intro" data-reveal>
          <span>Our solutions</span>
          <span>Strategy <i>·</i> Content <i>·</i> Growth</span>
        </div>
        {solutions.map((solution) => (
          <article className="solution-entry" data-reveal aria-label={`${solution.number}. ${solution.title}`} key={solution.number}>
            <div className="solution-entry-index"><span>{solution.number}</span><i>FACEBUILDS / SERVICE</i></div>
            <div className="solution-entry-copy">
              <p className="solution-entry-promise">{solution.promise}</p>
              <h2>{solution.title}</h2>
              <p className="solution-entry-description">{solution.description}</p>
            </div>
            <ul className="solution-entry-points" aria-label={`${solution.title} includes`}>
              {solution.points.map((point) => <li key={point}><span aria-hidden="true" />{point}</li>)}
            </ul>
            <span className="solution-entry-arrow" aria-hidden="true"><ArrowUpRight /></span>
          </article>
        ))}
      </section>

      <section className="solutions-outro" data-reveal>
        <p className="solutions-eyebrow"><span /> Your next chapter starts here</p>
        <div className="solutions-outro-line">
          <h2>Make your next move <em>count.</em></h2>
          <a href="/#features" className="solutions-contact-link">Let’s talk <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  );
}
