import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Heart, Target, Sparkles, Users } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import businessData from "../../data/business.json";

const EASING_SMOOTH = [0.16, 1, 0.3, 1] as const;
const EASING_BOUNCE = [0.34, 1.56, 0.64, 1] as const;
const EASING_DECEL = [0, 0.55, 0.45, 1] as const;

const values = [
  { icon: Heart, key: "passion" },
  { icon: Target, key: "precision" },
  { icon: Sparkles, key: "innovation" },
  { icon: Users, key: "accessibility" },
] as const;

function About() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{`${businessData.businessName} | ${t("nav.about")}`}</title>
        <meta
          name="description"
          content={businessData.description}
        />
        <meta property="og:title" content={`${businessData.businessName} | ${t("nav.about")}`} />
        <meta
          property="og:description"
          content={businessData.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gelbit.co.il/about" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
      </Helmet>

      {/* Hero / Story Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASING_SMOOTH }}
          >
            {t("home.story.title")}
          </motion.h1>

          <motion.div
            className="space-y-6 text-lg sm:text-xl leading-relaxed text-white/90 text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASING_DECEL }}
          >
            <p>{t("home.story.paragraph1")}</p>
            <p>{t("home.story.paragraph2")}</p>
            <p>{t("home.story.paragraph3")}</p>
          </motion.div>
        </div>
      </section>

      {/* Values / Mission Section */}
      <section className="py-20 sm:py-28 bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASING_DECEL }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-heading)] mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-lg text-[var(--color-text)]/70 max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((item, i) => {
              const Icon = item.icon;
              const labelMap: Record<string, { title: string; desc: string }> = {
                passion: {
                  title: t("home.features.design.title"),
                  desc: t("home.features.design.description"),
                },
                precision: {
                  title: t("home.features.seo.title"),
                  desc: t("home.features.seo.description"),
                },
                innovation: {
                  title: t("home.features.speed.title"),
                  desc: t("home.features.speed.description"),
                },
                accessibility: {
                  title: t("home.features.accessibility.title"),
                  desc: t("home.features.accessibility.description"),
                },
              };
              const label = labelMap[item.key];

              return (
                <motion.article
                  key={item.key}
                  className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASING_BOUNCE }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold text-[var(--color-heading)]">
                      {label.title}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text)]/80 leading-relaxed">
                    {label.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 sm:py-28 bg-[var(--color-primary)]/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[var(--color-heading)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASING_SMOOTH }}
          >
            {t("home.audience.title")}
          </motion.h2>
          <motion.p
            className="text-lg text-[var(--color-text)]/70 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING_DECEL }}
          >
            {t("home.audience.subtitle")}
          </motion.p>
          <motion.p
            className="text-[var(--color-text)]/80 leading-relaxed text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASING_BOUNCE }}
          >
            {t("home.audience.description")}
          </motion.p>
        </div>
      </section>
    </main>
  );
}

export default About;
