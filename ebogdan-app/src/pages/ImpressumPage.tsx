import { Link } from "react-router-dom";
import { translate } from "../i18n";
import type { Language } from "../i18n";

export function ImpressumPage() {
  const language: Language = (localStorage.getItem("ebogdan-language") as Language) || "de";
  const t = (v: string) => translate(language, v);
  const providerLines = t("Impressum.ProviderBlock").split("\\n");
  const contentResponsible = t("Impressum.ContentResponsibleBlock").split("\\n");

  return (
    <main className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link to="/" className="back-link">{t("Back to home")}</Link>
          <p className="eyebrow">{t("Impressum")}</p>
          <h1>{t("Impressum.LegalNotice")}</h1>
        </header>

        <article className="legal-content">
          <h2>{t("Impressum.ProviderTitle")}</h2>
          <p>{providerLines.map((line, idx) => (<span key={idx}>{line}<br /></span>))}</p>

          <h2>{t("Impressum.RepresentativeTitle")}</h2>
          <p>{t("Impressum.RepresentativeName")}</p>

          <h2>{t("Impressum.ContactTitle")}</h2>
          <p>{t("Impressum.ProviderBlock").split("\\n").slice(2).map((line, idx) => (<span key={idx}>{line}<br /></span>))}</p>

          <h2>{t("Impressum.BusinessPurposeTitle")}</h2>
          <p>{t("Impressum.BusinessPurposeBody")}</p>

          <h2>{t("Impressum.ContentResponsibleTitle")}</h2>
          <p>{contentResponsible.map((line, idx) => (<span key={idx}>{line}<br /></span>))}</p>

          <h2>{t("Impressum.DisclaimerTitle")}</h2>
          <p>{t("Impressum.DisclaimerBody")}</p>

          <h2>{t("Impressum.CopyrightTitle")}</h2>
          <p>{t("Impressum.CopyrightBody")}</p>
        </article>
      </div>
    </main>
  );
}
