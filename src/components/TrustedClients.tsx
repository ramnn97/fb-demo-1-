import { BadgeCheck, Instagram, Youtube } from "lucide-react";

const clients: Array<{ name: string; role: string; image: string; socials?: { instagram: string; youtube: string } }> = [
  { name: "Dr. Harish Patankar", role: "Director, Keshayurved & Kayayurved", image: "harish-patankar", socials: { instagram: "206K", youtube: "1.61 Lakhs+" } },
  { name: "Sagar Babar", role: "AI Officer, Comsense Tech", image: "sagar-babar", socials: { instagram: "245K", youtube: "95K+" } },
  { name: "Dr. Priya Dandage", role: "Founder, Sneh Clinic", image: "priya-dandage", socials: { instagram: "44.5K", youtube: "19K+" } },
  { name: "Dr. Sagar Pathak", role: "Director, Suyash Hospital", image: "sagar-pathak", socials: { instagram: "25K+", youtube: "2.5K" } },
  { name: "Dr. Nilesh Londhe", role: "Founder, Nirvikar Ayurved", image: "nilesh-londhe", socials: { instagram: "18K+", youtube: "15K+" } },
  { name: "Sudhir Khot", role: "Founder, Financial Fitness", image: "sudhir-khot", socials: { instagram: "22K+", youtube: "10K+" } },
  { name: "Dr. Jyoti Shirodkar", role: "Founder, Swasthya Sampada", image: "jyoti-shirodkar", socials: { instagram: "9K+", youtube: "4K+" } },
];

const clientLogos = [
  { image: "client-01-full.webp", name: "Maharashtra Navnirman Sena" },
  { image: "client-02-full.webp", name: "Rotary District 3131" },
  { image: "client-03-full.webp", name: "Spring CT" },
  { image: "client-04-full.webp", name: "CE" },
  { image: "client-05-full.webp", name: "Comsense" },
  { image: "client-06-full.webp", name: "Focus Prism" },
  { image: "client-07-full.webp", name: "Keshayurved" },
];

function ClientCard({ client, decorative = false }: { client: (typeof clients)[number]; decorative?: boolean }) {
  return (
    <article className={`trusted-client${client.socials ? " has-socials" : ""}${decorative ? " trusted-client-marquee-card" : ""}`} tabIndex={client.socials && !decorative ? 0 : undefined}>
      <div className="trusted-client-portrait">
        <img src={`/clients/${client.image}.png`} alt={client.name} />
        {client.socials && (
          <div className="client-thought" aria-label={`${client.name}: Instagram ${client.socials.instagram} followers, YouTube ${client.socials.youtube} subscribers`}>
            <span className="thought-dot thought-dot-one" aria-hidden="true" />
            <span className="thought-dot thought-dot-two" aria-hidden="true" />
            <div className="social-thought social-thought-instagram"><Instagram aria-hidden="true" /><span><small>Instagram</small><strong>{client.socials.instagram}</strong></span></div>
            <div className="social-thought social-thought-youtube"><Youtube aria-hidden="true" /><span><small>YouTube</small><strong>{client.socials.youtube}</strong></span></div>
          </div>
        )}
      </div>
      <h2>{client.name}<BadgeCheck aria-label="Verified client" /></h2>
      <p>{client.role}</p>
    </article>
  );
}

export function TrustedClients({ compact = false }: { compact?: boolean }) {
  const Heading = compact ? "h2" : "h1";
  return (
    <section className={`trusted-clients${compact ? " trusted-clients-compact" : ""}`} id={compact ? "how-it-works" : undefined} aria-labelledby="trusted-clients-title">
      <div className="trusted-heading">
        <p className="section-label">THE PEOPLE BEHIND THE PROGRESS</p>
        <Heading id="trusted-clients-title">Our trusted <em>clients.</em></Heading>
      </div>
      <div className="trusted-marquees">
        <div className="trusted-marquee trusted-marquee-people" aria-label="Our clients">
          <div className="trusted-marquee-track">
            {[false, true].map((decorative) => (
              <div className="trusted-marquee-group" key={String(decorative)} aria-hidden={decorative || undefined}>
                {clients.map((client) => <ClientCard client={client} key={client.name} decorative={decorative} />)}
              </div>
            ))}
          </div>
        </div>
        <div className="trusted-marquee trusted-marquee-logos" aria-label="Client and partner organizations">
          <div className="trusted-marquee-track">
            <div className="trusted-logo-group">
              {clientLogos.map((logo) => <div className="trusted-logo-item" key={logo.name}><img src={`/clients/logos/${logo.image}`} alt={logo.name} /></div>)}
            </div>
            <div className="trusted-logo-group" aria-hidden="true">
              {clientLogos.map((logo) => <div className="trusted-logo-item" key={logo.name}><img src={`/clients/logos/${logo.image}`} alt="" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
