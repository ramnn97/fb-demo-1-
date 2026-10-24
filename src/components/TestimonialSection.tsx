import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CirclePlay, Pause, Play } from "lucide-react";

const testimonials = [
  {
    name: "FaceBuilds Platform",
    category: "Our own platform",
    description: "Our own platform focused on educating entrepreneurs through social media. With 11k YouTube subscribers and 15k Facebook followers, we share business strategies, market insights, and content that helps small business owners grow and thrive in the digital world.",
    audience: "11K YouTube · 15K Facebook",
  },
  {
    name: "Marathi Manus",
    category: "Entrepreneur stories",
    description: "With 285k YouTube subscribers and 36k Instagram followers, Marathi Manus shares inspiring stories of Marathi entrepreneurs. We assist in content creation, social media management, and personal branding to amplify their impact.",
    audience: "285K YouTube · 36K Instagram",
  },
  {
    name: "Sagar Babar",
    category: "Business creator",
    description: "A popular content creator with 188k Instagram followers and 69k YouTube subscribers, Sagar provides business tips for the Marathi audience. We manage his personal branding—from content ideas and shoots to course promotion and editing.",
    audience: "188K Instagram · 69K YouTube",
  },
  {
    name: "Devdatta Photography",
    category: "Photography education",
    description: "With 146k followers on Instagram, we help manage the social media for Devdatta Photography School, creating engaging content and providing strategic management to grow their audience and connect with photography enthusiasts.",
    audience: "146K Instagram",
  },
  {
    name: "Dr. Harish Patankar",
    category: "Ayurveda educator",
    description: "An Ayurvedic expert with 80.8k Instagram followers, Dr. Harish shares practical, home-based remedies and spreads awareness about Ayurveda. We support his social media strategy, video content, and personal brand to educate and empower his growing audience.",
    audience: "80.8K Instagram",
  },
  {
    name: "PhotoArtio Academy of Photography Art",
    category: "Photography arts",
    description: "With 23.9k followers on Instagram, PAPA is dedicated to teaching the art of photography through engaging online content. We assist in content creation, strategy, and digital branding to help them reach more aspiring photographers and grow their community.",
    audience: "23.9K Instagram",
  },
];

export function TestimonialSection() {
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPage((current) => (current + 1) % 2), 7200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const move = (direction: number) => setPage((current) => (current + direction + 2) % 2);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="testimonials-heading">
        <p className="testimonial-kicker">CLIENT STORIES</p>
        <h2 id="testimonials-title">The people behind<br />the <em>progress.</em></h2>
        <p>Real stories from the brands we help grow.</p>
      </div>

      <div className="testimonials-viewport" aria-live="polite">
        <div className={`testimonials-track page-${page}`}>
          {[0, 1].map((group) => (
            <div className="testimonials-page" key={group} aria-hidden={page !== group}>
              {testimonials.slice(group * 3, group * 3 + 3).map((testimonial, index) => {
                const clientNumber = group * 3 + index + 1;
                return (
                  <article className={`testimonial-card testimonial-card-${index + 1}`} key={testimonial.name}>
                    {index < 2 && (
                      <div className="testimonial-video-slot" role="img" aria-label={`Blank video slot for client ${clientNumber}`}>
                        <span className="testimonial-video-index">CLIENT {String(clientNumber).padStart(2, "0")}</span>
                        <CirclePlay aria-hidden="true" />
                        <span className="testimonial-video-hint">Testimonial video</span>
                      </div>
                    )}
                    <div className="testimonial-copy">
                      <p className="testimonial-category">{testimonial.category}</p>
                      <h3>{testimonial.name}</h3>
                      {index === 2
                        ? <blockquote className="testimonial-feature-quote">“{testimonial.description}”</blockquote>
                        : <p className="testimonial-description">{testimonial.description}</p>}
                      <p className="testimonial-audience">{testimonial.audience}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-controls" aria-label="Testimonial carousel controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials"><ArrowLeft /></button>
        <span className="testimonials-page-count">0{page + 1} <i /> 02</span>
        <button className="testimonials-play-toggle" type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause testimonial carousel" : "Resume testimonial carousel"}>
          {playing ? <Pause /> : <Play />}
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Next testimonials"><ArrowRight /></button>
      </div>
    </section>
  );
}
