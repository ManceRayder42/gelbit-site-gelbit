import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import business from "../../data/business.json";

function extractLinkedInUrl(otherProfiles: string): string {
  const match = otherProfiles.match(/https:\/\/linkedin\.com\/\S+/);
  return match ? match[0] : "#";
}

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const linkedInUrl = extractLinkedInUrl(business.socialLinks.otherProfiles);

  const navLinks = [
    { key: "nav.home", href: "#hero" },
    { key: "nav.about", href: "#about" },
    { key: "nav.services", href: "#services" },
    { key: "nav.pricing", href: "#pricing" },
    { key: "nav.portfolio", href: "#portfolio" },
    { key: "nav.contact", href: "#contact" },
  ];

  const legalLinks = [
    { key: "footer.privacy", href: "/privacy" },
    { key: "footer.accessibility", href: "/accessibility" },
    { key: "footer.terms", href: "/terms" },
  ];

  const socialLinks = [
    {
      href: business.socialLinks.facebook,
      label: "Facebook",
      svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
      href: business.socialLinks.instagram,
      label: "Instagram",
      svg: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    },
    {
      href: linkedInUrl,
      label: "LinkedIn",
      svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>,
    },
    {
      href: `https://wa.me/${business.whatsapp}`,
      label: "WhatsApp",
      svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
    },
  ];

  return (
    <footer className="bg-[#1e2a3c] text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-[#3c8ecc]">
              {business.businessName}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-gray-300">
              {t("footer.text4")}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2f425e] text-gray-300 transition-colors hover:bg-[#3c8ecc] hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={label === "WhatsApp" ? "currentColor" : "none"} stroke={label === "WhatsApp" ? "none" : "currentColor"} strokeWidth={label === "WhatsApp" ? undefined : 2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">{svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick nav */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#3c8ecc]">
              {t("footer.label5")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    className="text-sm text-gray-300 transition-colors hover:text-[#3c8ecc]"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#3c8ecc]">
              {t("nav.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#3c8ecc]" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#3c8ecc]"
                >
                  <span dir="ltr">{business.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#3c8ecc]" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-sm text-gray-300 transition-colors hover:text-[#3c8ecc]"
                >
                  <span dir="ltr">{business.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#3c8ecc]" />
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 transition-colors hover:text-[#3c8ecc]"
                >
                  <span dir="ltr">WhatsApp</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#3c8ecc] mt-0.5" />
                <span className="text-sm text-gray-300">
                  {business.address.street}, {business.address.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Business hours */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#3c8ecc]">
              {t("footer.label6")}
            </h3>
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 shrink-0 text-[#3c8ecc] mt-0.5" />
              <div className="text-sm text-gray-300">
                <p>
                  {t("footer.label7")}
                </p>
                <p dir="ltr" className="text-start">
                  09:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2f425e]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Legal links */}
            <nav className="flex flex-wrap justify-center gap-4" aria-label={t("footer.label8")}>
              {legalLinks.map(({ key, href }) => (
                <Link
                  key={key}
                  to={href}
                  className="text-sm text-gray-400 transition-colors hover:text-[#3c8ecc]"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            {/* Copyright and credit */}
            <div className="text-center text-sm text-gray-400 sm:text-end">
              <p>
                &copy; {year} {business.businessName}. {t("footer.rights")}
              </p>
              {/* Created by GelbiWebsites — rendered via i18n */}
              <p className="mt-1">
                {t("footer.credit")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
