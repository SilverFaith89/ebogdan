import { Link } from "react-router-dom";

export function ImpressumPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to home</Link>
          <p className="eyebrow">Impressum</p>
          <h1>Legal Notice</h1>
        </header>

        <article className="legal-content">
          <h2>Provider</h2>
          <p>
            eBogdan<br />
            Essen, Germany 45326<br />
            Email: ebogdan.online@gmail.com<br />
            Phone: (+49) 162 622 0749
          </p>

          <h2>Representative</h2>
          <p>Tudor Cristian Bogdan</p>

          <h2>Contact</h2>
          <p>
            Email: ebogdan.online@gmail.com<br />
            Phone: (+49) 162 622 0749
          </p>

          <h2>Business purpose</h2>
          <p>
            The website is operated by eBogdan as an independent digital studio focused on website design,
            development, branding, photography, and digital strategy for businesses.
          </p>

          <h2>Responsible for content</h2>
          <p>
            Tudor Cristian Bogdan<br />
            eBogdan<br />
            Essen, Germany 45326
          </p>

          <h2>Disclaimer</h2>
          <p>
            Despite careful control, we do not assume any liability for the completeness, correctness,
            timeliness, or availability of the information provided on this website. Liability claims against
            eBogdan for damages caused by the use of information provided or by misuse of the internet are
            excluded, unless there is willful misconduct or gross negligence.
          </p>

          <h2>Copyright</h2>
          <p>
            The content and works on this website are subject to copyright protection. Duplication, processing,
            distribution, or any form of commercial use requires the prior written consent of the owner.
          </p>
        </article>
      </div>
    </main>
  );
}
