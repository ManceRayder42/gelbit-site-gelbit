import { useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import ThemeToggle from "../shared/ThemeToggle";
import businessData from "../../data/business.json";

const navKeys = [
  "nav.home",
  "nav.about",
  "nav.services",
  "nav.pricing",
  "nav.portfolio",
  "nav.contact",
] as const;

const sectionIds = [
  "hero",
  "about",
  "services",
  "pricing",
  "portfolio",
  "contact",
];

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    setMenuOpen(false);
    const el = document.getElementById(sectionIds[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#3c8ecc]/10 shadow-sm">
      <nav aria-label={t("header.label2")} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Business name — appears at the start (right in RTL) */}
          <a
            href="#hero"
            className="flex items-center gap-2 min-h-[2.75rem] min-w-[2.75rem] text-[#1e2a3c] font-bold text-lg select-none"
          >
            {businessData.businessName}
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navKeys.map((key, i) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => handleNavClick(i)}
                  className="px-3 py-2 min-h-[2.75rem] min-w-[2.75rem] rounded-lg text-sm font-medium text-[#2f425e] hover:text-[#3c8ecc] hover:bg-[#3c8ecc]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c8ecc]"
                >
                  {t(key)}
                </button>
              </li>
            ))}

            {/* Language toggle */}
            <li>
              <button
                type="button"
                onClick={() => setLang(lang === "he" ? "en" : "he")}
                aria-label={lang === "he" ? "Switch to English" : "עברו לעברית"}
                className="ms-2 px-3 py-2 min-h-[2.75rem] min-w-[2.75rem] rounded-lg text-sm font-semibold border border-[#3c8ecc]/30 text-[#3c8ecc] hover:bg-[#3c8ecc] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c8ecc]"
              >
                {lang === "he" ? "EN" : "HE"}
              </button>
            </li>

            {/* Dark/Light mode toggle */}
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("header.label4") : t("header.label5")}
            className="md:hidden flex items-center justify-center min-h-[2.75rem] min-w-[2.75rem] rounded-lg text-[#2f425e] hover:bg-[#3c8ecc]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c8ecc]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {navKeys.map((key, i) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(i)}
                    className="w-full text-start px-3 py-3 min-h-[2.75rem] rounded-lg text-sm font-medium text-[#2f425e] hover:text-[#3c8ecc] hover:bg-[#3c8ecc]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c8ecc]"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setLang(lang === "he" ? "en" : "he");
                    setMenuOpen(false);
                  }}
                  className="w-full text-start px-3 py-3 min-h-[2.75rem] rounded-lg text-sm font-semibold text-[#3c8ecc] hover:bg-[#3c8ecc]/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3c8ecc]"
                >
                  {lang === "he" ? "EN" : "HE"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
