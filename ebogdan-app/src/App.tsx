import { ArrowUpOutlined, CloseOutlined, InstagramOutlined, MailOutlined, MenuOutlined, PhoneOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./footer.css";
import { translate } from "./i18n";
import type { Language } from "./i18n";
import { ImpressumPage } from "./pages/ImpressumPage";
import { PrivacyPage } from "./pages/PrivacyPage";

const services = [
  ["01", "Web development", "High-performance websites and applications engineered around how your business really works.", "React · Architecture · Performance · SEO"],
  ["02", "Web design", "Elegant, conversion-focused digital experiences that make the right impression and feel effortless to use.", "UX/UI · Identity · Systems · Conversion"],
  ["03", "Photography", "A considered visual language for your people, products and the moments that make your brand credible.", "Business · Product · Portraits · Social"],
  ["04", "Social media", "Consistent, strategic content that builds visibility and gives your audience a reason to stay close.", "Strategy · Content · Direction · Publishing"],
  ["05", "Workflow optimization", "A clear-eyed look at the friction in your business, with practical changes that return time and focus.", "Audit · Systems · Productivity · Clarity"],
  ["06", "Automation & digitalization", "Connected tools and streamlined processes that let meaningful work take the foreground.", "Integration · Automation · Documentation · Scale"],
];

const projects = [
  { title: "Verdant / Studio", category: "Brand identity & digital design", image: "/assets/examples/5.jpg", className: "project-large", description: "A construction company brand and digital presence built around trust, craft and long-term quality." },
  { title: "Cardoc", category: "Creative direction & art direction", image: "/assets/examples/6.jpg", className: "project-small", description: "A detailing shop presentation with a premium, precise visual identity for a service built on finish and care." },
  { title: "Blumenhaus Sonntag", category: "Architecture & digital presence", image: "/assets/examples/7.jpg", className: "project-medium", description: "A flower shop brand experience with a warm editorial look and an elegant, lifestyle-driven tone." },
];

const principles = [
  ["01", "Built around your business", "Every solution starts with understanding the actual problem, not selecting a fashionable tool."],
  ["02", "Designed with intention", "Every visual decision serves the brand, the user or the outcome you need to create."],
  ["03", "Technology without theatre", "Modern technology earns its place by creating real value, not by making the work sound impressive."],
  ["04", "One partner, fewer handovers", "Strategy, design, development and optimization stay aligned from first conversation to launch."],
];

const process = [["01", "Discover", "Understand the business, goals, audience and current challenges."], ["02", "Define", "Develop the strategy, structure and creative direction."], ["03", "Create", "Design, develop and implement the solution."], ["04", "Optimize", "Measure, improve and continuously refine the result."]];

function SitePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("ebogdan-language") as Language) || "de");
  const t = (value: string) => translate(language, value);
  const changeLanguage = (nextLanguage: Language) => { setLanguage(nextLanguage); localStorage.setItem("ebogdan-language", nextLanguage); };
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="site-shell">
      <header className={`nav-wrap ${isScrolled ? "scrolled" : ""}`}><nav className="nav" aria-label="Main navigation"><a className="wordmark" href="#top" onClick={() => setMenuOpen(false)}><img className="brand-logo" src="/assets/android-chrome-256x256.png" width="48" height="48" alt="ebogdan" /></a><button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <CloseOutlined /> : <MenuOutlined />}</button><div className={`nav-links ${menuOpen ? "is-open" : ""}`}><a href="/#services" onClick={() => setMenuOpen(false)}>{t("Services")}</a><a href="/#work" onClick={() => setMenuOpen(false)}>{t("Work")}</a><a href="/#about" onClick={() => setMenuOpen(false)}>{t("About")}</a><a className="nav-cta" href="mailto:ebogdan.online@gmail.com" onClick={() => setMenuOpen(false)}>{language === "de" ? "Idee besprechen" : language === "ro" ? "Discută ideea" : "Idea to discuss"} <MailOutlined /></a><a className="nav-phone" href="tel:+491626220749" onClick={() => setMenuOpen(false)}>(+49) 162 622 0749 <PhoneOutlined /></a><div className="language-switcher" aria-label="Language"><button className={language === "de" ? "active" : ""} onClick={() => changeLanguage("de")}>DE</button><button className={language === "en" ? "active" : ""} onClick={() => changeLanguage("en")}>EN</button><button className={language === "ro" ? "active" : ""} onClick={() => changeLanguage("ro")}>RO</button></div></div></nav></header>
      <main id="top">
        <section className="hero"><div className="hero-copy reveal"><p className="eyebrow">{language === "de" ? `Webdesign und Entwicklung · ${year}` : language === "ro" ? `Design și dezvoltare website · ${year}` : `Website Design and Development · ${year}`}</p><p className="brand-tagline">{t("We create your Online Image")}</p><h1>{language === "de" ? <>Digitale Erlebnisse, die Unternehmen <em>voranbringen.</em></> : language === "ro" ? <>Experiențe digitale care duc afacerile <em>mai departe.</em></> : <>Digital experiences designed to <em>move</em> businesses forward.</>}</h1><p className="sub-label">{t("Kostenlose Beratung")}</p><p className="hero-intro">{t("We meet you personally and offer you a free consultation based on your own ideas and wishes.")}</p><div className="hero-actions"><a className="button button-light" href="mailto:ebogdan.online@gmail.com">{t("Start a conversation")} <ArrowUpOutlined /></a></div></div><div className="hero-art"><button type="button" className="hero-image image-button" aria-label="Open hero image" onClick={() => setSelectedImage("/assets/examples/4.jpg")} style={{ backgroundImage: "url('/assets/examples/4.jpg')" }} /></div></section>
        <section className="intro section" id="intro"><p className="eyebrow">{t("The studio")}</p><div className="intro-grid"><h2>{t("One partner.")}<br /><em>{t("Multiple disciplines.")}</em></h2><div><p className="lead">{t("You shouldn't have to coordinate five different people to make your digital presence feel like one coherent thing.")}</p><p>{t("ebogdan brings strategy, design, technology, content and optimization into one thoughtful service. The result is work that looks distinct, works hard and stays useful long after launch.")}</p></div></div><div className="discipline-line"><span>{t("Strategy")}</span><i>+</i><span>{t("Design")}</span><i>+</i><span>{t("Technology")}</span><i>+</i><span>{t("Content")}</span><i>+</i><span>{t("Optimization")}</span></div></section>
        <section className="team section" id="team"><div className="section-top"><p className="eyebrow">{t("The people / 01")}</p><h2>{t("A small team.")}<br /><em>{t("Serious about the details.")}</em></h2></div><div className="team-grid"><article className="member"><div className="member-image"><img src="/assets/Bogdan_Tudor_Cristian_min.jpg" width="900" height="1100" alt="Bogdan T. Cristian" onClick={() => setSelectedImage("/assets/Bogdan_Tudor_Cristian_min.jpg")} onError={(event) => { event.currentTarget.src = "/site-icon.svg"; }} /></div><div className="member-meta"><div><h3>Bogdan T. Cristian</h3><p>{t("Lead senior developer")}<br />{t("Owner")}</p></div><span>{t("Technology")}<br />{t("Direction")}</span></div></article>        <article className="member member-alexandra"><div className="member-image"><img src="/assets/Alexandra_Bogdan_min.png" width="900" height="1100" alt="Bogdan M. Alexandra" onClick={() => setSelectedImage("/assets/Alexandra_Bogdan_min.png")} onError={(event) => { event.currentTarget.src = "/site-icon.svg"; }} /></div><div className="member-meta"><div><h3>Bogdan M. Alexandra</h3><p>{t("Senior graphic designer")}</p></div><span>{t("Identity")}<br />{t("Visual direction")}</span></div></article></div></section>
        <section className="services section" id="services"><div className="section-top"><p className="eyebrow">{t("Capabilities / 01")}</p><h2>{t("What we do")}</h2><p className="section-note">{t("A focused set of disciplines, connected by one clear point of view.")}</p></div><div className="service-list">{services.map(([number, title, description, tags]) => <article className="service-row" key={number}><span className="service-number">{number}</span><h3>{t(title)}</h3><p>{t(description)}</p><span className="service-tags">{t(tags)}</span><ArrowUpOutlined className="row-arrow" /></article>)}</div></section>
        <section className="work section" id="work"><div className="section-top"><p className="eyebrow">{t("Selected work / 02")}</p><h2>{t("Quietly memorable.")}</h2></div><div className="project-grid">{projects.map((project) => <button type="button" className={`project ${project.className}`} key={project.title} onClick={() => setSelectedImage(project.image)}><div className="project-image" style={{ backgroundImage: `url(${project.image})` }} /><div className="project-meta"><div><h3>{t(project.title)}</h3><p>{t(project.description)}</p></div><span>{t(project.category)}</span></div></button>)}</div></section>
        <section className="principles section" id="about"><div className="section-top"><p className="eyebrow">{t("The difference / 03")}</p><h2>{t("Different disciplines.")}<br /><em>{t("One clear vision.")}</em></h2></div><div className="principle-list">{principles.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{t(title)}</h3><p>{t(text)}</p></div></article>)}</div></section>
        <section className="process section"><div className="section-top"><p className="eyebrow">{t("How it works / 04")}</p><h2>{t("From first thought")}<br /><em>{t("to finished work.")}</em></h2></div><div className="process-grid">{process.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{t(title)}</h3><p>{t(text)}</p></article>)}</div></section>
        <section className="testimonial section"><p className="eyebrow">{t("A note from the studio")}</p><blockquote>“{t("Good digital work should feel inevitable in hindsight: clear, considered and completely itself.")}”</blockquote><p className="signature">— ebogdan, {t("Independent digital studio")}</p></section>
        <section className="closing section"><p className="eyebrow">{t("Have a project in mind?")}</p><h2>{t("Let's make something")}<br /><em>{t("worth remembering.")}</em></h2><a className="button button-dark" href="mailto:ebogdan.online@gmail.com">{t("Start a conversation")} <ArrowUpOutlined /></a></section>
        <section className="contact section" id="contact"><div><p className="eyebrow">{t("Contact / 05")}</p><h2>{language === "de" ? "Idee besprechen" : t("Let's talk.")}</h2></div><div className="contact-detail"><a className="email" href="mailto:ebogdan.online@gmail.com">ebogdan.online@gmail.com <MailOutlined /></a><a className="email phone" href="tel:+491626220749">(+49) 162 622 0749 <PhoneOutlined /></a><p>{t("Independent digital studio")}<br />Essen, Germany 45326</p><div className="socials"><a href="https://www.xing.com/profile/TudorCristian_Bogdan" target="_blank" rel="noreferrer" aria-label="Xing"><span className="social-mark xing-mark">X</span></a><a href="https://www.instagram.com/ebogdan.online/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramOutlined /></a></div></div></section>
      </main>
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button type="button" className="lightbox-close" aria-label="Close image" onClick={() => setSelectedImage(null)}>×</button>
          <img src={selectedImage} alt="Expanded project preview" className="lightbox-image" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
      <footer className="footer">
        <div className="footer-brand-block">
          <a className="wordmark" href="#top"><img className="brand-logo" src="/assets/android-chrome-256x256.png" width="30" height="30" alt="ebogdan" /></a>
          <p className="slogan">{t("We create your Online Image")}</p>
        </div>

        <div className="footer-sitemap">
                  <nav>
                    <a href="/#services">{t("Services")}</a>
                    <a href="/#work">{t("Work")}</a>
                    <a href="/#about">{t("About")}</a>
                    <a href="/#contact">{t("Contact")}</a>
                    <a href="/privacy">{t("Privacy")}</a>
                    <a href="/impressum">{t("Impressum")}</a>
                  </nav>
                </div>

        <div className="legal"><span>© {year} ebogdan</span></div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "eBogdan",
        slogan: "We create your Online Image",
        description: "eBogdan — We create your Online Image. Independent digital studio based in Essen, Germany, creating websites, brand identities, photography and workflow optimization for businesses.",
        url: "https://ebogdan.com/",
        email: "ebogdan.online@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Essen",
          addressRegion: "North Rhine-Westphalia",
          postalCode: "45326",
          addressCountry: "DE"
        },
        areaServed: ["Essen", "Germany", "Europe"],
        serviceType: services.map((service) => service[1]),
        telephone: "+49 162 622 0749",
        sameAs: []
      }) }} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SitePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
    </Routes>
  );
}

export default App;
