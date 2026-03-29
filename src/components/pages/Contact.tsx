import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Send, Loader2, MessageCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import businessData from "../../data/business.json";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const EASING_SMOOTH = [0.16, 1, 0.3, 1] as const;
const EASING_BOUNCE = [0.34, 1.56, 0.64, 1] as const;
const EASING_DECEL = [0, 0.55, 0.45, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    console.log("Contact form submitted:", formData);

    setTimeout(() => {
      setStatus("success");
      setFormData(initialFormData);

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }, 1500);
  };

  const address = `${businessData.address.street}, ${businessData.address.city}`;

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>{t("contact.heading20")}</title>
        <meta
          name="description"
          content={t("contact.text21")}
        />
        <meta property="og:title" content={t("contact.heading20")} />
        <meta property="og:description" content={t("contact.text21")} />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gelbit.co.il/contact" />
        <meta property="og:locale" content="he_IL" />
      </Helmet>

      {/* Hero */}
      <section className="bg-[#1e2a3c] text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-3xl sm:text-5xl font-bold mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, ease: EASING_SMOOTH }}
          >
            {t("contact.label22")}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.15, ease: EASING_DECEL }}
          >
            {t("contact.text23")}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Contact Form */}
            <motion.article
              className="lg:col-span-2"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASING_BOUNCE }}
            >
              <h2 className="text-2xl font-bold text-[#1e2a3c] mb-6">
                {t("contact.label24")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.label25")} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#3c8ecc] focus:ring-2 focus:ring-[#3c8ecc]/30 outline-none transition"
                    placeholder={t("contact.label26")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.label27")} *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    required
                    pattern="^0[2-9]\d{7,8}$"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#3c8ecc] focus:ring-2 focus:ring-[#3c8ecc]/30 outline-none transition"
                    placeholder="050-123-4567"
                    aria-describedby="phone-hint"
                  />
                  <p id="phone-hint" className="text-xs text-gray-500 mt-1">
                    {t("contact.label28")}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.label29")} *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    dir="ltr"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#3c8ecc] focus:ring-2 focus:ring-[#3c8ecc]/30 outline-none transition"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.label30")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#3c8ecc] focus:ring-2 focus:ring-[#3c8ecc]/30 outline-none transition resize-y"
                    placeholder={t("contact.heading31")}
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <p className="text-green-600 font-medium" role="status">
                    {t("contact.label32")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 font-medium" role="alert">
                    {t("contact.heading33")}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 bg-[#3c8ecc] hover:bg-[#2d7ab8] text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("contact.label34")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("contact.label35")}
                    </>
                  )}
                </button>
              </form>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASING_SMOOTH }}
            >
              <h2 className="text-2xl font-bold text-[#1e2a3c] mb-6">
                {t("contact.label36")}
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#3c8ecc] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("contact.label27")}
                    </p>
                    <a
                      href={`tel:${businessData.phone.replace(/-/g, "")}`}
                      className="text-[#3c8ecc] hover:underline"
                    >
                      <span dir="ltr">{businessData.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#3c8ecc] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("contact.label29")}
                    </p>
                    <a
                      href={`mailto:${businessData.email}`}
                      className="text-[#3c8ecc] hover:underline"
                    >
                      <span dir="ltr">{businessData.email}</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#3c8ecc] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("contact.label37")}
                    </p>
                    <a
                      href={`https://wa.me/${businessData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3c8ecc] hover:underline"
                    >
                      <span dir="ltr">{businessData.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#3c8ecc] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("contact.label38")}
                    </p>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#3c8ecc] mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("contact.label39")}
                    </p>
                    <p className="text-gray-600">
                      {t("contact.heading40")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-12 sm:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-xl overflow-hidden shadow-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING_DECEL }}
          >
            <iframe
              src="https://maps.google.com/maps?q=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%2C%20%D7%99%D7%A9%D7%A8%D7%90%D7%9C&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("contact.heading41")}
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
