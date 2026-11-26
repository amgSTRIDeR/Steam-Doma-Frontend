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
          <Icon name="icon-edu" className="about__footer-icon" />
          <div className="about__footer-content">
            <h3 className="about__footer-title">{t('footer.title')}</h3>
            <p>
              {`${t('footer.description')} `}
              <Link
                to="https://rs.school/"
                className="about__footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                RS School
              </Link>
            </p>
          </div>
        </footer>
      </Container>
    </div>
  );
}
