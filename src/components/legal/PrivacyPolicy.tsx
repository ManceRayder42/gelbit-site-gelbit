import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../hooks/useLanguage';
import businessData from '../../data/business.json';

export function PrivacyPolicy() {
  const { t, lang, dir } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('privacyPolicy.heading')}</title>
        <meta name="description" content={t('privacyPolicy.heading')} />
        <meta property="og:title" content={t('privacyPolicy.heading')} />
        <meta property="og:description" content={t('privacyPolicy.heading')} />
        <meta property="og:image" content="https://gelbit.co.il/og-image.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <main dir={dir} lang={lang} className="prose prose-lg mx-auto max-w-3xl px-4 py-16 text-start">
        <h1 className="text-3xl font-bold mb-8">{t('privacyPolicy.label1')}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{t('privacyPolicy.label2')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label3')}</h2>
          <p>{t('privacyPolicy.text4')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label5')}</h2>
          <p>{t('privacyPolicy.heading6')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('privacyPolicy.text7')}</li>
            <li>{t('privacyPolicy.text8')}</li>
            <li>{t('privacyPolicy.text9')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label10')}</h2>
          <p>{t('privacyPolicy.heading11')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('privacyPolicy.heading12')}</li>
            <li>{t('privacyPolicy.heading13')}</li>
            <li>{t('privacyPolicy.heading14')}</li>
            <li>{t('privacyPolicy.heading15')}</li>
            <li>{t('privacyPolicy.heading16')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label17')}</h2>
          <p>{t('privacyPolicy.text18')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('privacyPolicy.text19')}</li>
            <li>{t('privacyPolicy.text20')}</li>
            <li>{t('privacyPolicy.heading21')}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label22')}</h2>
          <p>{t('privacyPolicy.text23')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('privacyPolicy.heading24')}</li>
            <li>{t('privacyPolicy.heading25')}</li>
            <li>{t('privacyPolicy.heading26')}</li>
          </ul>
          <p className="mt-4">{t('privacyPolicy.text27')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label28')}</h2>
          <p>{t('privacyPolicy.text29')}</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>{t('privacyPolicy.heading30')}</li>
            <li>{t('privacyPolicy.text31')}</li>
            <li>{t('privacyPolicy.heading32')}</li>
            <li>{t('privacyPolicy.heading33')}</li>
            <li>{t('privacyPolicy.heading34')}</li>
          </ul>
          <p className="mt-4">{t('privacyPolicy.text35')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label36')}</h2>
          <p>{t('privacyPolicy.text37')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label38')}</h2>
          <p>{t('privacyPolicy.text39')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label40')}</h2>
          <p>{t('privacyPolicy.text41')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('privacyPolicy.label42')}</h2>
          <p>{t('privacyPolicy.text43')}</p>
          <ul className="list-none space-y-2 mt-4">
            <li><strong>{t('privacyPolicy.heading44')}</strong></li>
            <li>{t('privacyPolicy.label45')} <a href={`mailto:${businessData.email}`} className="text-blue-600 dark:text-blue-400 underline">{businessData.email}</a></li>
            <li>{t('privacyPolicy.label46')} <a href={`tel:${businessData.phone}`} className="text-blue-600 dark:text-blue-400 underline" dir="ltr">{businessData.phone}</a></li>
            <li>{t('privacyPolicy.heading47')}</li>
          </ul>
        </section>
      </main>
    </>
  );
}
