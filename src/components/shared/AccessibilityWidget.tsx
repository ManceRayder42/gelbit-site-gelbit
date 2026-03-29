import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Accessibility } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const A11Y_PREFIX = "gelbit-a11y-";

const a11yFunctions = [
  { key: "textSize", class: `${A11Y_PREFIX}text-size` },
  { key: "contrast", class: `${A11Y_PREFIX}contrast` },
  { key: "stopMotion", class: `${A11Y_PREFIX}stop-motion` },
  { key: "largeCursor", class: `${A11Y_PREFIX}large-cursor` },
  { key: "grayscale", class: `${A11Y_PREFIX}grayscale` },
  { key: "keyboardNav", class: `${A11Y_PREFIX}keyboard-nav` },
  { key: "readableFont", class: `${A11Y_PREFIX}readable-font` },
  { key: "linkHighlight", class: `${A11Y_PREFIX}link-highlight` },
] as const;

const labels: Record<string, Record<string, string>> = {
  he: {
    toggle: "פתח תפריט נגישות",
    title: "נגישות",
    textSize: "הגדלת טקסט",
    contrast: "ניגודיות גבוהה",
    stopMotion: "עצירת אנימציות",
    largeCursor: "סמן גדול",
    grayscale: "גווני אפור",
    keyboardNav: "ניווט מקלדת",
    readableFont: "גופן קריא",
    linkHighlight: "הדגשת קישורים",
    reset: "איפוס",
  },
  en: {
    toggle: "Open accessibility menu",
    title: "Accessibility",
    textSize: "Increase Text Size",
    contrast: "High Contrast",
    stopMotion: "Stop Animations",
    largeCursor: "Large Cursor",
    grayscale: "Grayscale",
    keyboardNav: "Keyboard Navigation",
    readableFont: "Readable Font",
    linkHighlight: "Highlight Links",
    reset: "Reset",
  },
};

const AccessibilityWidget = React.memo(function AccessibilityWidget() {
  const { lang } = useLanguage();
  const l = labels[lang] || labels.he;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (cls: string) => {
      setActive((prev) => {
        const next = new Set(prev);
        if (next.has(cls)) {
          next.delete(cls);
          document.documentElement.classList.remove(cls);
        } else {
          next.add(cls);
          document.documentElement.classList.add(cls);
        }
        return next;
      });
    },
    []
  );

  const resetAll = useCallback(() => {
    active.forEach((cls) => document.documentElement.classList.remove(cls));
    setActive(new Set());
  }, [active]);

  return (
    <div className="fixed bottom-4 start-4 z-[60]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={l.toggle}
        aria-expanded={open}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:scale-110 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Accessibility className="h-7 w-7" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label={l.title}
            className="absolute bottom-16 start-0 w-64 bg-white rounded-xl shadow-2xl border border-border p-4 space-y-2"
          >
            <h3 className="font-bold text-text text-lg mb-3">{l.title}</h3>

            {a11yFunctions.map(({ key, class: cls }) => (
              <button
                key={key}
                onClick={() => toggle(cls)}
                className={`w-full text-start px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active.has(cls)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text hover:bg-gray-200"
                }`}
              >
                {l[key]}
              </button>
            ))}

            <button
              onClick={resetAll}
              className="w-full mt-2 px-3 py-2 rounded-lg text-sm font-medium bg-error/10 text-error hover:bg-error/20 transition-colors"
            >
              {l.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default AccessibilityWidget;
