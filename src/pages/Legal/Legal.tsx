import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container/Container';

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g);

  return (
    <>
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          const href = part.replace(/[),.;]+$/, '');
          return (
            <Fragment key={`${part}-${index}`}>
              <a className="legal__link" href={href} target="_blank" rel="noopener noreferrer">
                {href}
              </a>
              {part.slice(href.length)}
            </Fragment>
          );
        }

        if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
          return (
            <a className="legal__link" href={`mailto:${part}`} key={`${part}-${index}`}>
              {part}
            </a>
          );
        }

        return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}

export default function Legal() {
  const { t } = useTranslation();

  return (
    <div className="legal">
      <Container>
        <article className="legal__article">
          <header className="legal__header">
            <h1 className="legal__title">{t('legal.title')}</h1>
            <p>{t('legal.effectiveDate')}</p>
          </header>

          {['controller', 'processing', 'hosting', 'storage', 'rights'].map((section) => (
            <section className="legal__section" key={section}>
              <h2>{t(`legal.sections.${section}.title`)}</h2>
              {t(`legal.sections.${section}.paragraphs`, { returnObjects: true }) instanceof Array
                ? (
                    t(`legal.sections.${section}.paragraphs`, { returnObjects: true }) as string[]
                  ).map((paragraph) => (
                    <p key={paragraph}>
                      <LinkifiedText text={paragraph} />
                    </p>
                  ))
                : null}
              {t(`legal.sections.${section}.items`, { returnObjects: true }) instanceof Array ? (
                <ul>
                  {(t(`legal.sections.${section}.items`, { returnObjects: true }) as string[]).map(
                    (item) => (
                      <li key={item}>
                        <LinkifiedText text={item} />
                      </li>
                    ),
                  )}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </Container>
    </div>
  );
}
