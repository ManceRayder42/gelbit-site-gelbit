import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Paintbrush,
  Languages,
  Search,
  Accessibility,
  Smartphone,
  Zap,
  ClipboardList,
  Bot,
  Rocket,
  ChevronDown,
  ChevronLeft,
  Send,
  Utensils,
  Stethoscope,
  Scale,
  Building2,
  Wrench,
  Dumbbell,
  Loader2,
} from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FloatingActionSuite from "../shared/FloatingActionSuite";
import { useLanguage } from "../../hooks/useLanguage";
import businessData from "../../data/business.json";

/* ─── Easing Curves ─── */
const EASING = {
  cinematicEntrance: [0.16, 1, 0.3, 1] as const,
  smoothDecelerate: [0.22, 1, 0.36, 1] as const,
  gentleSettle: [0.25, 0.46, 0.45, 0.94] as const,
  snappyFeedback: [0.4, 0, 0.2, 1] as const,
};

/* ─── JSON-LD Schemas ─── */
const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SoftwareApplication"],
  name: "GelbIt - אתרי פרימיום",
  description: businessData.description,
  telephone: businessData.phone,
  email: businessData.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessData.address.street,
    addressLocality: businessData.address.city,
    addressCountry: "IL",
  },
  url: "https://gelbit.co.il/",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    businessData.socialLinks?.facebook,
    businessData.socialLinks?.instagram,
    businessData.socialLinks?.otherProfiles?.replace("LinkedIn: ", ""),
  ].filter(Boolean),
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["[data-speakable='hero']", "[data-speakable='about']", "[data-speakable='services']"],
  },
};

const jsonLdFaqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "כמה זמן לוקח לקבל אתר מוכן?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "האתר נבנה אוטומטית תוך דקות מרגע שמסיימים למלא את השאלון. אחרי שהמערכת מסיימת, אתם מקבלים קישור לאתר מוכן שאפשר לצפות בו, לבקש שינויים ולהעלות לאוויר.",
      },
    },
    {
      "@type": "Question",
      name: "מה ההבדל בינכם לבין בונה אתרים רגיל?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "בוני אתרים רגילים נותנים לכם תבנית שאתם צריכים למלא לבד. אצלנו המערכת עושה הכל — חוקרת את התחום שלכם, כותבת תוכן שיווקי מותאם בעברית, מעצבת לפי הסגנון של העסק, ובונה את הקוד מאפס.",
      },
    },
    {
      "@type": "Question",
      name: "האתר כולל נגישות?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "כל אתר שנבנה אצלנו עומד בתקן הנגישות הישראלי IS 5568 ובתקן הבינלאומי WCAG 2.1 AA. זה כולל ווידג׳ט נגישות מובנה עם שמונה פונקציות.",
      },
    },
    {
      "@type": "Question",
      name: "מה לגבי קידום בגוגל?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "כל אתר נבנה עם SEO מובנה מהיסוד — תגיות מטא מותאמות, סכמה מובנית (JSON-LD), מבנה תוכן נכון, מהירות טעינה גבוהה וקוד נקי שגוגל אוהב.",
      },
    },
    {
      "@type": "Question",
      name: "איך זה עובד עם תוכן בעברית ובאנגלית?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "המערכת יוצרת תוכן דו-לשוני — עברית ואנגלית. כל עמוד כולל תוכן בשתי השפות עם אפשרות למעבר בלחיצה.",
      },
    },
  ],
};

/* ─── Animated Section Wrapper ─── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  [key: string]: unknown;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        delay,
        ease: EASING.smoothDecelerate,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: index * 0.08,
        ease: EASING.gentleSettle,
      }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-start font-semibold text-lg cursor-pointer transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none min-h-[3rem]"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.3,
          ease: EASING.gentleSettle,
        }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-muted leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const { t, lang } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  /* Contact form state */
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Log form data for MVP (backend integration in later phase)
    console.log("Contact form submitted:", formData);
    // Simulate submission
    setTimeout(() => {
      try {
        setFormState("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setFormState("idle"), 4000);
      } catch {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    }, 1500);
  };

  /* Feature data */
  const features = [
    {
      icon: Paintbrush,
      title: t("home.features.design.title"),
      desc: t("home.features.design.description"),
    },
    {
      icon: Languages,
      title: t("home.features.content.title"),
      desc: t("home.features.content.description"),
    },
    {
      icon: Search,
      title: t("home.features.seo.title"),
      desc: t("home.features.seo.description"),
    },
    {
      icon: Accessibility,
      title: t("home.features.accessibility.title"),
      desc: t("home.features.accessibility.description"),
    },
    {
      icon: Smartphone,
      title: t("home.features.mobile.title"),
      desc: t("home.features.mobile.description"),
    },
    {
      icon: Zap,
      title: t("home.features.speed.title"),
      desc: t("home.features.speed.description"),
    },
  ];

  /* Steps data */
  const steps = [
    {
      icon: ClipboardList,
      title: t("home.howItWorks.step1.title"),
      desc: t("home.howItWorks.step1.description"),
      num: "01",
    },
    {
      icon: Bot,
      title: t("home.howItWorks.step2.title"),
      desc: t("home.howItWorks.step2.description"),
      num: "02",
    },
    {
      icon: Rocket,
      title: t("home.howItWorks.step3.title"),
      desc: t("home.howItWorks.step3.description"),
      num: "03",
    },
  ];

  /* Audience niches */
  const niches = [
    { icon: Utensils, label: t("home.audience.restaurants") },
    { icon: Stethoscope, label: t("home.audience.clinics") },
    { icon: Scale, label: t("home.audience.lawyers") },
    { icon: Building2, label: t("home.audience.realEstate") },
    { icon: Wrench, label: t("home.audience.contractors") },
    { icon: Dumbbell, label: t("home.audience.fitness") },
  ];

  /* FAQ data */
  const faqs = [
    {
      q: t("home.faq.q1.question"),
      a: t("home.faq.q1.answer"),
    },
    {
      q: t("home.faq.q2.question"),
      a: t("home.faq.q2.answer"),
    },
    {
      q: t("home.faq.q3.question"),
      a: t("home.faq.q3.answer"),
    },
    {
      q: t("home.faq.q4.question"),
      a: t("home.faq.q4.answer"),
    },
    {
      q: t("home.faq.q5.question"),
      a: t("home.faq.q5.answer"),
    },
    {
      q: t("home.faq.q6.question"),
      a: t("home.faq.q6.answer"),
    },
    {
      q: t("home.faq.q7.question"),
      a: t("home.faq.q7.answer"),
    },
  ];

  return (
    <>
      {/* ─── SEO ─── */}
      <Helmet>
        <title>GelbIt - אתרי פרימיום | Home</title>
        <meta
          name="description"
          content="חברת טכנולוגיה ישראלית ליצירת אתרי אינטרנט פרימיום באופן אוטומטי. שאלון קצר, אתר מותאם אישית תוך דקות."
        />
        <link
          rel="canonical"
          href="https://gelbit.co.il/"
        />
        <meta property="og:title" content="GelbIt - אתרי פרימיום" />
        <meta
          property="og:description"
          content="אתר פרימיום מותאם אישית תוך דקות — עיצוב מקצועי, תוכן בעברית, SEO מובנה ונגישות מלאה."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gelbit.co.il/"
        />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLdLocalBusiness)}</script>
        <script type="application/ld+json">{JSON.stringify(jsonLdFaqPage)}</script>
      </Helmet>

      <Header />

      <main>
        {/* ═══════════════════════════════
            SECTION 1 — HERO
            ═══════════════════════════════ */}
        <section
          ref={heroRef}
          data-speakable="hero"
          className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-[#0d1b2a] via-[#1b3a5c] to-primary"
        >
          {/* Animated background grid */}
          <motion.div
            className="absolute inset-0 opacity-[0.07]"
            style={shouldReduceMotion ? undefined : { y: heroParallaxY }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(100,165,215,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(100,165,215,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "4rem 4rem",
              }}
            />
          </motion.div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 end-1/4 w-[30rem] h-[30rem] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 start-1/4 w-[20rem] h-[20rem] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />

          <motion.div
            className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:py-32 text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.15,
                },
              },
            }}
          >
            {/* Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                ease: EASING.cinematicEntrance,
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
            >
              {t("home.hero.headline")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                ease: EASING.smoothDecelerate,
              }}
              className="mt-6 text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed"
            >
              {t("home.hero.subtitle")}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: EASING.gentleSettle,
              }}
              className="mt-4 text-base md:text-lg text-blue-200/70 max-w-2xl mx-auto leading-relaxed"
            >
              {t("home.hero.description")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: EASING.snappyFeedback,
              }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href={`https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
                  lang === "he"
                    ? "היי, אשמח לשמוע על בניית אתר לעסק שלי"
                    : "Hi, I'd like to learn about building a website for my business"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl text-lg transition-shadow duration-200 hover:shadow-xl hover:shadow-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none min-h-[3rem]"
              >
                {t("home.hero.primaryCta")}
                <ChevronLeft className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none min-h-[3rem]"
              >
                {t("home.hero.secondaryCta")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Angled bottom divider */}
          <div className="absolute bottom-0 start-0 end-0">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto block"
              preserveAspectRatio="none"
            >
              <path
                d="M0 80L1440 80L1440 20C1200 60 720 0 0 40L0 80Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════
            SECTION 2 — HOW IT WORKS
            ═══════════════════════════════ */}
        <AnimatedSection
          className="py-20 md:py-28 px-4 md:px-8 bg-white"
        >
          <div className="mx-auto max-w-6xl" id="how-it-works">
            <div className="text-center mb-16">
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.1,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-3xl md:text-4xl font-bold text-text"
              >
                {t("home.howItWorks.title")}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.2,
                  ease: EASING.smoothDecelerate,
                }}
                className="mt-3 text-lg text-muted"
              >
                {t("home.howItWorks.subtitle")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <motion.article
                  key={step.num}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 24 }
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.45,
                    delay: i * 0.1,
                    ease: EASING.gentleSettle,
                  }}
                  className="relative text-center p-8 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-border"
                >
                  <span className="absolute top-4 end-4 text-5xl font-black text-primary/10 select-none">
                    {step.num}
                  </span>
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{step.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 3 — FEATURES (what's included)
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-8 bg-gray-50" data-speakable="services">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.1,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-3xl md:text-4xl font-bold text-text"
              >
                {t("home.features.title")}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.2,
                  ease: EASING.smoothDecelerate,
                }}
                className="mt-3 text-lg text-muted"
              >
                {t("home.features.subtitle")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <motion.article
                  key={i}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: i * 0.08,
                    ease: EASING.gentleSettle,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }
                  }
                  className="rounded-2xl bg-white border border-border p-7 transition-shadow duration-200"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-text">
                    {feat.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-[0.95rem]">
                    {feat.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 4 — AUDIENCE / WHO IS THIS FOR
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-8 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.1,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-3xl md:text-4xl font-bold text-text"
              >
                {t("home.audience.title")}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.2,
                  ease: EASING.smoothDecelerate,
                }}
                className="mt-3 text-lg text-muted max-w-3xl mx-auto leading-relaxed"
              >
                {t("home.audience.description")}
              </motion.p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              {niches.map((niche, i) => (
                <motion.div
                  key={i}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.35,
                    delay: i * 0.08,
                    ease: EASING.gentleSettle,
                  }}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-gray-50 p-6 text-center transition-colors duration-200 hover:border-primary/30 hover:bg-primary/5"
                >
                  <niche.icon className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-text">{niche.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 5 — OUR STORY
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-8 bg-gray-50" data-speakable="about">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: 0.1,
                ease: EASING.smoothDecelerate,
              }}
              className="text-3xl md:text-4xl font-bold text-text text-center mb-10"
            >
              {t("home.story.title")}
            </motion.h2>
            <div className="space-y-5 text-lg text-muted leading-relaxed">
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.15,
                  ease: EASING.smoothDecelerate,
                }}
              >
                {t("home.story.paragraph1")}
              </motion.p>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.25,
                  ease: EASING.smoothDecelerate,
                }}
              >
                {t("home.story.paragraph2")}
              </motion.p>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.35,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-text font-medium"
              >
                {t("home.story.paragraph3")}
              </motion.p>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 6 — CTA BANNER
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-24 px-4 md:px-8 bg-gradient-to-b from-primary to-[#1b5a8c] text-white text-center relative overflow-hidden">
          {/* Decorative orb */}
          <div className="absolute top-0 start-1/3 w-[25rem] h-[25rem] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                ease: EASING.cinematicEntrance,
              }}
              className="text-3xl md:text-5xl font-extrabold leading-tight"
            >
              {t("home.ctaBanner.title")}
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: 0.15,
                ease: EASING.smoothDecelerate,
              }}
              className="mt-5 text-lg text-blue-100/80"
            >
              {t("home.ctaBanner.subtitle")}
            </motion.p>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: 0.3,
                ease: EASING.smoothDecelerate,
              }}
              className="mt-8"
            >
              <motion.a
                href={`https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
                  lang === "he"
                    ? "היי, אשמח לשמוע עוד על בניית אתר"
                    : "Hi, I'd like to learn more about building a website"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.02 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.98 }
                }
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-xl text-lg transition-shadow duration-200 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none min-h-[3rem]"
              >
                {t("home.ctaBanner.cta")}
                <ChevronLeft className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 7 — FAQ
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-8 bg-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.1,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-3xl md:text-4xl font-bold text-text"
              >
                {t("home.faq.title")}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.2,
                  ease: EASING.smoothDecelerate,
                }}
                className="mt-3 text-lg text-muted"
              >
                {t("home.faq.subtitle")}
              </motion.p>
            </div>

            <div className="divide-y divide-border border-t border-border">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  question={faq.q}
                  answer={faq.a}
                  index={i}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════
            SECTION 8 — CONTACT
            ═══════════════════════════════ */}
        <AnimatedSection className="py-20 md:py-28 px-4 md:px-8 bg-gray-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <motion.h2
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.1,
                  ease: EASING.smoothDecelerate,
                }}
                className="text-3xl md:text-4xl font-bold text-text"
              >
                {t("home.contact.title")}
              </motion.h2>
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.2,
                  ease: EASING.smoothDecelerate,
                }}
                className="mt-3 text-lg text-muted max-w-2xl mx-auto leading-relaxed"
              >
                {t("home.contact.intro")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Contact form */}
              <motion.form
                onSubmit={handleSubmit}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.15,
                  ease: EASING.smoothDecelerate,
                }}
                className="lg:col-span-3 space-y-5 bg-white rounded-2xl border border-border p-8"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-text mb-1.5"
                  >
                    {t("home.contact.form.name")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-colors duration-200 focus:border-primary focus:outline-none text-start"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-semibold text-text mb-1.5"
                  >
                    {t("home.contact.form.phone")}
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    required
                    pattern="^0[2-9]\d{1,2}-?\d{7}$"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-colors duration-200 focus:border-primary focus:outline-none text-start"
                    placeholder="050-123-4567"
                    aria-describedby="phone-hint"
                  />
                  <span id="phone-hint" className="sr-only">{t("contact.label28")}</span>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-text mb-1.5"
                  >
                    {t("home.contact.form.email")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    dir="ltr"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-colors duration-200 focus:border-primary focus:outline-none text-start"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-text mb-1.5"
                  >
                    {t("home.contact.form.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 transition-colors duration-200 focus:border-primary focus:outline-none text-start resize-y"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  whileHover={
                    shouldReduceMotion ? undefined : { scale: 1.02 }
                  }
                  whileTap={
                    shouldReduceMotion ? undefined : { scale: 0.98 }
                  }
                  className="relative w-full bg-primary text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none min-h-[3rem]"
                >
                  <span
                    className={
                      formState === "sending" ? "opacity-0" : "opacity-100"
                    }
                  >
                    <span className="inline-flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      {t("home.contact.form.submit")}
                    </span>
                  </span>
                  {formState === "sending" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </span>
                  )}
                </motion.button>

                {formState === "success" && (
                  <p className="text-success text-center font-medium" role="status" aria-live="polite">
                    {t("home.contact.form.success")}
                  </p>
                )}
                {formState === "error" && (
                  <p className="text-error text-center font-medium" role="alert" aria-live="assertive">
                    {t("home.contact.form.error")}
                  </p>
                )}
              </motion.form>

              {/* Contact info sidebar */}
              <motion.aside
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: 0.25,
                  ease: EASING.smoothDecelerate,
                }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Phone */}
                <a
                  href={`tel:${businessData.phone}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-colors duration-200 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none min-h-[3rem]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm text-muted">
                      {t("contact.label27")}
                    </span>
                    <span className="font-semibold text-text" dir="ltr">
                      {businessData.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${businessData.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-colors duration-200 hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none min-h-[3rem]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm text-muted">
                      {t("contact.label29")}
                    </span>
                    <span className="font-semibold text-text" dir="ltr">
                      {businessData.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${businessData.whatsapp}?text=${encodeURIComponent(
                    lang === "he"
                      ? "היי, אשמח לשמוע עוד על השירות שלכם"
                      : "Hi, I'd like to learn more about your service"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-colors duration-200 hover:border-[#25D366]/30 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:outline-none min-h-[3rem]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm text-muted">
                      WhatsApp
                    </span>
                    <span className="font-semibold text-text">
                      {t("cta.whatsapp")}
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm text-muted">
                      {t("contact.label38")}
                    </span>
                    <span className="font-semibold text-text">
                      {businessData.address.street}
                      {", "}
                      {businessData.address.city}
                    </span>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
      <FloatingActionSuite />
    </>
  );
}
