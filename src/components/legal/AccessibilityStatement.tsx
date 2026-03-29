import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../hooks/useLanguage';
import businessData from '../../data/business.json';

export function AccessibilityStatement() {
  const { t, lang, dir } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('accessibilityStatement.heading')}</title>
        <meta name="description" content={t('accessibilityStatement.heading')} />
        <meta property="og:title" content={t('accessibilityStatement.heading')} />
        <meta property="og:description" content={t('accessibilityStatement.heading')} />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main dir={dir} lang={lang} className="prose prose-lg mx-auto max-w-3xl px-4 py-16 text-start">
        <h1 className="text-3xl font-bold mb-8">{t('accessibilityStatement.label1')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{t('accessibilityStatement.label2')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('accessibilityStatement.label3')}</h2>
          <p>{t('accessibilityStatement.text4')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('accessibilityStatement.label5')}</h2>
          <p>{t('accessibilityStatement.heading6')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('accessibilityStatement.heading7')}</li>
            <li>{t('accessibilityStatement.heading8')}</li>
            <li>{t('accessibilityStatement.heading9')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('accessibilityStatement.label10')}</h2>
          <p>{t('accessibilityStatement.heading11')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong>{t('accessibilityStatement.label12')}</strong> {t('accessibilityStatement.text13')}</li>
            <li><strong>{t('accessibilityStatement.label14')}</strong> {t('accessibilityStatement.text15')}</li>
            <li><strong>{t('accessibilityStatement.label16')}</strong> {t('accessibilityStatement.text17')}</li>
            <li><strong>{t('accessibilityStatement.label18')}</strong> {t('accessibilityStatement.text19')}</li>
            <li><strong>{t('accessibilityStatement.label20')}</strong> {t('accessibilityStatement.heading21')}</li>
            <li><strong>{t('accessibilityStatement.label22')}</strong> {t('accessibilityStatement.heading23')}</li>
            <li><strong>{t('accessibilityStatement.label24')}</strong> {t('accessibilityStatement.text25')}</li>
            <li><strong>{t('accessibilityStatement.label26')}</strong> {t('accessibilityStatement.heading27')}</li>
            <li><strong>{t('accessibilityStatement.label28')}</strong> {t('accessibilityStatement.heading29')}</li>
            <li><strong>{t('accessibilityStatement.label30')}</strong> {t('accessibilityStatement.text31')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('accessibilityStatement.label32')}</h2>
          <p>{t('accessibilityStatement.text33')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('accessibilityStatement.heading34')}</h2>
          <p>{t('accessibilityStatement.text35')}</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>{t('accessibilityStatement.heading36')}</strong></li>
            <li>{t('accessibilityStatement.label37')} <a href={`mailto:${businessData.email}`} className="text-blue-600 dark:text-blue-400 underline">{businessData.email}</a></li>
            <li>{t('accessibilityStatement.label38')} <a href={`tel:${businessData.phone}`} className="text-blue-600 dark:text-blue-400 underline" dir="ltr">{businessData.phone}</a></li>
            <li>{t('accessibilityStatement.heading39')}</li>
          </ul>
        </section>
      </main>
    </>
  );
}
