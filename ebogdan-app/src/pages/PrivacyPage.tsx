import { Link } from "react-router-dom";

export function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to home</Link>
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
        </header>

        <article className="legal-content">
          <p>
            eBogdan values your trust and takes privacy seriously. This privacy policy explains how we handle
            personal data when you contact us, use our website, or interact with our digital services.
          </p>

          <h2>1. Information we collect</h2>
          <p>
            When you contact us by email or phone, we may collect the information you provide, such as your
            name, email address, company, and message. We also process technical information such as browser,
            access date, pages visited, and general usage data to ensure the website functions correctly and
            remains secure.
          </p>

          <h2>2. Purpose of processing</h2>
          <p>
            We process personal data to answer your inquiries, provide our services, maintain communication,
            improve the website experience, and comply with legal obligations. We do not sell or rent personal
            data to third parties.
          </p>

          <h2>3. Contact data</h2>
          <p>
            eBogdan<br />
            Essen, Germany 45326<br />
            Email: ebogdan.online@gmail.com<br />
            Phone: (+49) 162 622 0749
          </p>

          <h2>4. Cookies and analytics</h2>
          <p>
            Our site may use cookies or similar technologies in order to improve usability, understand traffic
            patterns, and optimize the browsing experience. You can disable cookies in your browser settings,
            though some features may not work as intended.
          </p>

          <h2>5. Data retention</h2>
          <p>
            We keep personal data only as long as necessary for the purpose it was collected or to meet legal
            retention obligations. When no longer needed, we delete or anonymize it securely.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You have the right to request access to, correction of, deletion of, restriction of processing, or
            objection to the processing of your personal data, as well as the right to data portability where
            applicable. To exercise any of these rights, please contact us at the email above.
          </p>

          <h2>7. Changes</h2>
          <p>
            We may update this policy occasionally. Any changes will be reflected on this page with the updated
            date.
          </p>
        </article>
      </div>
    </main>
  );
}
