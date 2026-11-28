import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon/Icon';
import { FOOTER_SECTIONS, type FooterLink } from './aboutData';

const toCamelCase = (str: string): string =>
  str.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());

export default function AboutFooter() {
  const { t } = useTranslation();

  const renderLink = (link: FooterLink, key?: React.Key) => (
    <Link
      key={key ?? link.labelKey}
      to={link.url}
      className="about__footer-link"
      {...(link.isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {t(link.labelKey)}
    </Link>
  );

  const renderDescriptionWithLinks = (text: string, links: FooterLink[]) => {
    if (!links.length) return text;

    const linkMap = new Map(links.map((link) => [t(link.labelKey), link]));
    const pattern = new RegExp(
      `(${Array.from(linkMap.keys())
        .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|')})`,
      'g',
    );

    return text.split(pattern).map((part, index) => {
      const matchedLink = linkMap.get(part);
      return matchedLink ? renderLink(matchedLink, index) : part;
    });
  };

  return (
    <footer className="about__footer">
      <ul className="about__footer-list">
        {FOOTER_SECTIONS.map(({ id, hasDescription, links }) => {
          const keyPrefix = `footer.${toCamelCase(id)}`;

          return (
            <li key={id} className="about__footer-item">
              <Icon name={`icon-${id}`} className="about__footer-icon" />
              <div className="about__footer-content">
                <h3 className="about__footer-title">{t(`${keyPrefix}Heading`)}</h3>

                {hasDescription ? (
                  <p className="about__footer-text">
                    {renderDescriptionWithLinks(t(`${keyPrefix}Description`), links)}
                  </p>
                ) : (
                  links.length > 0 && (
                    <p className="about__footer-links">{links.map((link) => renderLink(link))}</p>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="about__footer-copyright">{t('footer.copyright')}</p>
    </footer>
  );
}
