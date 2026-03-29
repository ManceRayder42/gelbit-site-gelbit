import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import heDict from "../data/i18n/he.json";
import enDict from "../data/i18n/en.json";

type Lang = "he" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const dictionaries: Record<Lang, Record<string, unknown>> = {
  he: heDict,
  en: enDict,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  // Try flat key first (e.g. "accessibilityStatement.heading")
  if (path in obj && typeof obj[path] === "string") {
    return obj[path] as string;
  }
  // Then try nested traversal (e.g. "home.hero.headline")
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Lang>("he");

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(dictionaries[lang], key);
    },
    [lang]
  );

  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
