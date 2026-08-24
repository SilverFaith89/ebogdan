import { Link } from "react-router-dom";
import { translate } from "../i18n";
import type { Language } from "../i18n";

export function PrivacyPage() {
  const language: Language = (localStorage.getItem("ebogdan-language") as Language) || "de";
  const t = (v: string) => translate(language, v);
  const contactLines = t("Privacy.Section3.ContactLines").split("\\n");

  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link to="/" className="back-link">{t("Back to home")}</Link>
          <p className="eyebrow">{t("Privacy")}</p>
          <h1>{t("Privacy Policy")}</h1>
        </header>

        <article className="legal-content">
          <p>{t("Privacy.Policy.Intro")}</p>

          <h2>{t("Privacy.Section1.Title")}</h2>
          <p>{t("Privacy.Section1.Body")}</p>

          <h2>{t("Privacy.Section2.Title")}</h2>
          <p>{t("Privacy.Section2.Body")}</p>

          <h2>{t("Privacy.Section3.Title")}</h2>
          <p>
            {contactLines.map((line, idx) => (
              <span key={idx}>{line}<br /></span>
            ))}
          </p>

          <h2>{t("Privacy.Section4.Title")}</h2>
          <p>{t("Privacy.Section4.Body")}</p>

          <h2>{t("Privacy.Section5.Title")}</h2>
          <p>{t("Privacy.Section5.Body")}</p>

          <h2>{t("Privacy.Section6.Title")}</h2>
          <p>{t("Privacy.Section6.Body")}</p>

          <h2>{t("Privacy.Section7.Title")}</h2>
          <p>{t("Privacy.Section7.Body")}</p>
        </article>
      </div>
    </main>
  );
}
