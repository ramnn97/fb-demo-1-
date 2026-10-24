import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";

const services = [
  "Personal Branding",
  "PR Management",
  "AI Content Creation",
  "Podcast Production",
  "Performance Marketing",
  "Event Shoot Production",
  "Influencer Marketing",
  "AI Automation & Funnels",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/facebuildsofficial?stkn=eTU4aW4yenJ1Z2s3", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/share/1JLXozAw9u/", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/facebuilds/", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/@facebuilds?si=WE0sMSycHPfsAsU1", Icon: Youtube },
];

function FloatingSocialLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`footer-folder${open ? " is-open" : ""}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="footer-folder-cloud" aria-hidden={!open}>
        {socialLinks.map(({ label, href, Icon }, index) => (
          <a className={`footer-folder-item footer-folder-item-${index + 1}`} href={href} key={label} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} target="_blank" rel="noreferrer"><Icon aria-hidden="true" />{label}</a>
        ))}
      </div>
      <button className="footer-folder-button" type="button" aria-expanded={open} onClick={() => setOpen(value => !value)} onFocus={() => setOpen(true)}>
        <span className="footer-folder-paper" aria-hidden="true" />
        <span className="footer-folder-front"><strong>Social media</strong><small>Follow FaceBuilds</small></span>
      </button>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer-layout">
      <section className="footer-links-panel" aria-label="Footer navigation and contact">
        <div className="footer-columns">
          <div className="footer-column footer-quicklinks-column">
            <FloatingSocialLinks />
          </div>

          <div className="footer-column">
            <h2>Our services</h2>
            {services.map((service) => <a href="#features" key={service}>{service}</a>)}
          </div>

          <div className="footer-column footer-contact-column">
            <h2>Contact</h2>
            <p>Let’s build a stronger digital presence for your brand.</p>
            <a className="footer-contact-cta" href="#features">Explore services <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p><strong>© FaceBuilds</strong> All rights reserved.</p>
          <a href="#top">Back to top ↑</a>
          <span>{new Date().getFullYear()}</span>
        </div>
      </section>

      <section className="footer-brand-panel" aria-labelledby="footer-brand-title">
        <video className="footer-brand-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/footer-background.mp4" type="video/mp4" />
        </video>
        <a className="footer-brand-name" href="#top" id="footer-brand-title">FaceBuilds<span>.</span></a>
        <p>We help experts and businesses build a clear personal brand, create meaningful content, and grow their audience.</p>
        <a className="footer-social-link" href="#features"><span>Explore our services</span><ArrowUpRight aria-hidden="true" /></a>
      </section>
    </footer>
  );
}
