import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../hooks/useLanguage';
import businessData from '../../data/business.json';

export function TermsOfService() {
  const { t, lang, dir } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('termsOfService.heading')}</title>
        <meta name="description" content={t('termsOfService.heading')} />
      </Helmet>
      <main dir={dir} lang={lang} className="prose prose-lg mx-auto max-w-3xl px-4 py-16 text-start">
        <h1 className="text-3xl font-bold mb-8">{t('termsOfService.label1')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{t('termsOfService.label2')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label3')}</h2>
          <p>{t('termsOfService.text4')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label5')}</h2>
          <p>{t('termsOfService.heading6')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('termsOfService.text7')}</li>
            <li>{t('termsOfService.text8')}</li>
            <li>{t('termsOfService.text9')}</li>
            <li>{t('termsOfService.text10')}</li>
            <li>{t('termsOfService.heading11')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label12')}</h2>
          <p>{t('termsOfService.text13')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label14')}</h2>
          <p>{t('termsOfService.text15')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('termsOfService.heading16')}</li>
            <li>{t('termsOfService.heading17')}</li>
            <li>{t('termsOfService.heading18')}</li>
            <li>{t('termsOfService.heading19')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label20')}</h2>
          <p>{t('termsOfService.text21')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label22')}</h2>
          <p>{t('termsOfService.text23')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.heading24')}</h2>
          <p>{t('termsOfService.text25')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('termsOfService.label26')}</h2>
          <p>{t('termsOfService.heading27')}</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>{t('termsOfService.heading28')}</strong></li>
            <li>{t('termsOfService.label29')} <a href={`mailto:${businessData.email}`} className="text-blue-600 dark:text-blue-400 underline">{businessData.email}</a></li>
            <li>{t('termsOfService.label30')} <a href={`tel:${businessData.phone}`} className="text-blue-600 dark:text-blue-400 underline" dir="ltr">{businessData.phone}</a></li>
            <li>{t('termsOfService.heading31')}</li>
          </ul>
        </section>
      </main>
    </>
  );
}
