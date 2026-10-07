import { ArrowLeftOutlined, ArrowUpOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import servicePages from "../data/service-pages.json";

type ServicePageData = (typeof servicePages)[number];

type ServicePageProps = {
  service: ServicePageData;
};

function serviceLabel(homeService: string) {
  switch (homeService) {
    case "Web design":
      return "Webdesign";
    case "Social media":
      return "Social Media";
    case "Photography":
      return "Fotoshooting";
    default:
      return "Printdesign";
  }
}

export function ServicePage({ service }: ServicePageProps) {
  const canonicalUrl = `https://ebogdan.com/${service.slug}`;
  const contactUrl = `mailto:ebogdan.online@gmail.com?subject=${encodeURIComponent(service.contactSubject)}`;

  useEffect(() => {
    const previousTitle = document.title;
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonicalLink?.href;
    const previousLanguage = document.documentElement.lang;
    const metaUpdates = [
      { element: document.querySelector<HTMLMetaElement>('meta[name="description"]'), content: service.description },
      { element: document.querySelector<HTMLMetaElement>('meta[property="og:title"]'), content: service.title },
      { element: document.querySelector<HTMLMetaElement>('meta[property="og:description"]'), content: service.description },
      { element: document.querySelector<HTMLMetaElement>('meta[property="og:url"]'), content: canonicalUrl },
      { element: document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]'), content: service.title },
      { element: document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]'), content: service.description }
    ];
    const previousMetaContent = metaUpdates.map(({ element }) => element?.content);

    document.title = service.title;
    metaUpdates.forEach(({ element, content }) => {
      if (element) element.content = content;
    });
    if (canonicalLink) canonicalLink.href = canonicalUrl;
    document.documentElement.lang = "de";

    return () => {
      document.title = previousTitle;
      metaUpdates.forEach(({ element }, index) => {
        const previousContent = previousMetaContent[index];
        if (element && previousContent) element.content = previousContent;
      });
      if (canonicalLink && previousCanonical) canonicalLink.href = previousCanonical;
      document.documentElement.lang = previousLanguage;
    };
  }, [canonicalUrl, service.description, service.title]);

  return (
    <div className="site-shell service-page">
      <header className="nav-wrap scrolled">
        <nav className="nav" aria-label="Hauptnavigation">
          <Link className="wordmark" to="/" aria-label="eBogdan Startseite">
            <img className="brand-logo" src="/assets/android-chrome-256x256.png" width="48" height="48" alt="eBogdan" />
          </Link>
          <div className="nav-links service-nav-links">
            <Link to="/#services">Leistungen</Link>
            <Link to="/#work">Projekte</Link>
            <Link to="/#contact">Kontakt</Link>
            <a className="nav-cta" href={contactUrl}>Projekt anfragen <MailOutlined /></a>
          </div>
        </nav>
      </header>

      <main>
        <section className="service-hero">
          <div className="service-hero-copy">
            <Link className="service-back" to="/#services"><ArrowLeftOutlined /> Alle Leistungen</Link>
            <p className="eyebrow">eBogdan · Essen, Nordrhein-Westfalen</p>
            <h1>{service.heading}</h1>
            <p className="service-lead">{service.intro}</p>
            <a className="button button-light" href={contactUrl}>Kostenloses Erstgespräch <ArrowUpOutlined /></a>
          </div>
        </section>

        <div className="service-content">
          {service.sections.map((section) => (
            <section className="service-content-section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <section className="service-content-section service-includes">
            <h2>Was Sie erwarten können</h2>
            <ul>
              {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
            </ul>
          </section>

          <section className="service-contact">
            <p className="eyebrow">Lassen Sie uns sprechen</p>
            <h2>Sie planen ein Projekt in Essen?</h2>
            <p>Erzählen Sie uns, was Sie vorhaben. Wir besprechen Ihre Fragen persönlich und unverbindlich.</p>
            <a className="button button-dark" href={contactUrl}>Projekt anfragen <ArrowUpOutlined /></a>
          </section>

          <nav className="related-services" aria-label="Capabilities – alle Leistungen">
            <p className="eyebrow">Capabilities / 01</p>
            <h2>Alle Leistungen</h2>
            <div>
              {servicePages.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  to={`/${relatedService.slug}`}
                  aria-current={relatedService.slug === service.slug ? "page" : undefined}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {serviceLabel(relatedService.homeService)}
                  <ArrowUpOutlined />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>

      <footer className="footer service-footer">
        <div className="footer-brand-block">
          <Link className="wordmark" to="/"><img className="brand-logo" src="/assets/android-chrome-256x256.png" width="48" height="48" alt="eBogdan" /></Link>
          <p className="slogan">Unabhängiges Digitalstudio · Essen</p>
        </div>
        <nav className="footer-sitemap" aria-label="Rechtliche Informationen">
          <Link to="/impressum">Impressum</Link>
          <Link to="/privacy">Datenschutz</Link>
        </nav>
        <div className="legal"><a href="mailto:ebogdan.online@gmail.com">ebogdan.online@gmail.com</a></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.heading,
        description: service.description,
        url: canonicalUrl,
        areaServed: {
          "@type": "City",
          name: "Essen"
        },
        provider: {
          "@type": "ProfessionalService",
          name: "eBogdan",
          url: "https://ebogdan.com/",
          email: "ebogdan.online@gmail.com",
          telephone: "+49 162 622 0749"
        }
      }) }} />
    </div>
  );
}
