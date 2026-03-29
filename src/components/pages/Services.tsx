import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import {
  Paintbrush,
  Languages,
  Search,
  Accessibility,
  Smartphone,
  Zap,
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import businessData from "../../data/business.json";

const EASING_SMOOTH = [0.16, 1, 0.3, 1] as const;
const EASING_BOUNCE = [0.34, 1.56, 0.64, 1] as const;
const EASING_DECEL = [0, 0.55, 0.45, 1] as const;

const serviceCards = [
  { icon: Paintbrush, key: "design" },
  { icon: Languages, key: "content" },
  { icon: Search, key: "seo" },
  { icon: Accessibility, key: "accessibility" },
  { icon: Smartphone, key: "mobile" },
  { icon: Zap, key: "speed" },
] as const;

function Services() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{`${businessData.businessName} | ${t("nav.services")}`}</title>
        <meta
          name="description"
          content={t("home.features.subtitle")}
        />
        <meta property="og:title" content={`${businessData.businessName} | ${t("nav.services")}`} />
        <meta
          property="og:description"
          content={t("home.features.subtitle")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gelbit.co.il/services" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASING_SMOOTH }}
          >
            {t("home.features.title")}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASING_DECEL }}
          >
            {t("home.features.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.key}
                  className="group rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASING_BOUNCE }}
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-[var(--color-heading)] mb-3">
                    {t(`home.features.${card.key}.title`)}
                  </h3>
                  <p className="text-[var(--color-text)]/80 leading-relaxed">
                    {t(`home.features.${card.key}.description`)}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 sm:py-24 bg-[var(--color-primary)]/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[var(--color-heading)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASING_SMOOTH }}
          >
            {t("home.ctaBanner.title")}
          </motion.h2>
          <motion.p
            className="text-lg text-[var(--color-text)]/70 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING_DECEL }}
          >
            {t("home.ctaBanner.subtitle")}
          </motion.p>
          <motion.a
            href={`https://wa.me/${businessData.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-8 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASING_BOUNCE }}
          >
            {t("home.ctaBanner.cta")}
          </motion.a>
        </div>
      </section>
    </main>
  );
}

export default Services;
