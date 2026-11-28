import Container from '../../components/Container/Container';
import { useTranslation } from 'react-i18next';
import { PRIVACY_SECTIONS } from './privacyPolicyData';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const email = t('privacyPolicy.email');

  return (
    <div className="privacy">
      <Container>
        <div className="privacy__inner">
          <header className="privacy__header">
            <h1 className="privacy__title">{t('privacyPolicy.title')}</h1>
            <div className="privacy__subtitle">{t('privacyPolicy.effectiveDate')}</div>
          </header>

          {PRIVACY_SECTIONS.map(({ id, hasEmail }) => {
            const baseKey = `privacyPolicy.sections.${id}`;
            const paragraphs = t(`${baseKey}.paragraphs`, {
              returnObjects: true,
            }) as string[];

            return (
              <section key={id} className="privacy__section">
                <h2 className="privacy__heading">{t(`${baseKey}.heading`)}</h2>

                {paragraphs.map((text, index) => (
                  <p key={index} className="privacy__text">
                    {text}
                  </p>
                ))}

                {hasEmail && (
                  <p className="privacy__text">
                    {`${t(`${baseKey}.emailLabel`)} `}
                    <a href={`mailto:${email}`} className="privacy__link">
                      {email}
                    </a>
                  </p>
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
