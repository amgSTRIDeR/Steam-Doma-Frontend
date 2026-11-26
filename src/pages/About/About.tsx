import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '../../components/Container/Container';
import List from '../../components/List/List';
import Icon from '../../components/Icon/Icon';
import { GOALS_DATA, TEAM_DATA, TECH_STACK_DATA } from './aboutData';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="about">
      <Container>
        <header className="about__header">
          <h1 className="about__title">{t('about.aboutTitle')}</h1>
          <div className="about__description">{t('about.aboutDescription')}</div>
        </header>
        <section className="about__section">
          <h2 className="about__section-title">{t('about.heading1')}</h2>
          <List data={GOALS_DATA} className="about__list-goals" isIcon />
        </section>
        <section className="about__section">
          <h2 className="about__section-title">{t('about.heading2')}</h2>
          <List data={TEAM_DATA} className="about__list-team" />
        </section>
        <section className="about__section">
          <h2 className="about__section-title">{t('about.heading3')}</h2>
          <List data={TECH_STACK_DATA} className="about__list-tech" isIcon />
        </section>
        <footer className="about__footer">
          <div className="about__footer-education">
            <Icon name="icon-edu" className="about__footer-icon" />
            <div>
              <h3 className="about__footer-title">{t('footer.title')}</h3>
              <p>
                {`${t('footer.description')} `}
                <a
                  href="https://rs.school/"
                  className="about__footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RS School
                </a>
              </p>
            </div>
          </div>

          <div className="about__footer-details">
            <div className="about__footer-detail">
              <Icon name="icon-footer-globe" className="about__footer-detail-icon" />
              <div>
                <h3 className="about__footer-title">{t('footer.sourceTitle')}</h3>
                <p>
                  <a
                    href="https://github.com/amgSTRIDeR/Steam-Doma-Frontend"
                    className="about__footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.frontendTitle')}
                  </a>
                  {' · '}
                  <a
                    href="https://github.com/amgSTRIDeR/Steam-Doma-Backend"
                    className="about__footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.backendTitle')}
                  </a>
                </p>
              </div>
            </div>

            <div className="about__footer-detail">
              <Icon name="icon-footer-shield" className="about__footer-detail-icon" />
              <div>
                <h3 className="about__footer-title">{t('footer.privacyTitle')}</h3>
                <p>
                  {t('footer.privacyDescription')}{' '}
                  <Link className="about__footer-link" to="/legal">
                    {t('footer.readPrivacy')}
                  </Link>
                </p>
              </div>
            </div>

            <div className="about__footer-detail">
              <Icon name="icon-footer-database" className="about__footer-detail-icon" />
              <div>
                <h3 className="about__footer-title">{t('footer.dataSourcesTitle')}</h3>
                <p>
                  {t('footer.dataSourcesDescription')}{' '}
                  <a
                    href="https://github.com/vintagedon/steam-dataset-2025"
                    className="about__footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Steam Dataset 2025
                  </a>{' '}
                  {t('footer.dataSourcesBy')}{' '}
                  <a
                    href="https://github.com/vintagedon"
                    className="about__footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donald Fountain (VintageDon)
                  </a>
                  {', '}
                  {t('footer.dataSourcesLicense')}{' '}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    className="about__footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Creative Commons Attribution 4.0 International (CC BY 4.0)
                  </a>
                  .
                </p>
                <p>{t('footer.dataSourcesAdapted')}</p>
                <p>{t('footer.dataSourcesRights')}</p>
              </div>
            </div>

            <div className="about__footer-detail">
              <Icon name="icon-footer-info" className="about__footer-detail-icon" />
              <div>
                <h3 className="about__footer-title">{t('footer.disclaimerTitle')}</h3>
                <p>{t('footer.disclaimerDescription')}</p>
              </div>
            </div>

            <div className="about__footer-detail">
              <Icon name="icon-footer-mail" className="about__footer-detail-icon" />
              <div>
                <h3 className="about__footer-title">{t('footer.contactTitle')}</h3>
                <a className="about__footer-link" href="mailto:alex.ovchinnikov.dev@gmail.com">
                  alex.ovchinnikov.dev@gmail.com
                </a>
              </div>
            </div>
          </div>
          <p className="about__footer-copyright">© 2026 {t('footer.copyright')}</p>
        </footer>
      </Container>
    </div>
  );
}
