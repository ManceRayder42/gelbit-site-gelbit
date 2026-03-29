import { Routes, Route } from "react-router-dom";
import { useLanguage } from "./hooks/useLanguage.tsx";
import Home from "./components/pages/Home.tsx";
import About from "./components/pages/About.tsx";
import Services from "./components/pages/Services.tsx";
import Contact from "./components/pages/Contact.tsx";
import { AccessibilityStatement } from "./components/legal/AccessibilityStatement.tsx";
import { PrivacyPolicy } from "./components/legal/PrivacyPolicy.tsx";
import { TermsOfService } from "./components/legal/TermsOfService.tsx";
import LoadingScreen from "./components/shared/LoadingScreen.tsx";
import CookieBanner from "./components/shared/CookieBanner.tsx";
import AccessibilityWidget from "./components/shared/AccessibilityWidget.tsx";

function App() {
  const { dir, lang } = useLanguage();

  return (
    <div dir={dir} lang={lang}>
      <LoadingScreen />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <AccessibilityWidget />
      <CookieBanner />
    </div>
  );
}

export default App;
