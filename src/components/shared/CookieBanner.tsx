import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../hooks/useLanguage";

const COOKIE_KEY = "gelbit_cookie_consent";

const labels = {
  he: {
    text: "אתר זה משתמש בעוגיות כדי לשפר את חוויית הגלישה שלך. בהמשך השימוש באתר, אתה מסכים לשימוש בעוגיות.",
    accept: "אישור",
    decline: "דחייה",
    privacy: "מדיניות פרטיות",
  },
  en: {
    text: "This site uses cookies to improve your browsing experience. By continuing to use the site, you agree to our use of cookies.",
    accept: "Accept",
    decline: "Decline",
    privacy: "Privacy Policy",
  },
};

export default function CookieBanner() {
  const { lang } = useLanguage();
  const l = labels[lang] || labels.he;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    localStorage.setItem(COOKIE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label={lang === "he" ? "הסכמה לעוגיות" : "Cookie consent"}
          className="fixed bottom-0 inset-x-0 z-[70] p-4"
        >
          <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-2xl border border-border p-5 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-text flex-1">{l.text}</p>
            <div className="flex gap-3 shrink-0">
              <a
                href="/privacy"
                className="text-sm text-primary underline hover:text-primary/80"
              >
                {l.privacy}
              </a>
              <button
                onClick={() => handleChoice("declined")}
                className="px-4 py-2 text-sm rounded-lg border border-border text-text hover:bg-gray-100 transition"
              >
                {l.decline}
              </button>
              <button
                onClick={() => handleChoice("accepted")}
                className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition"
              >
                {l.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
