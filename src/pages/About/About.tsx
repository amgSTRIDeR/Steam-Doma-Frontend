import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import List from '../../components/List/List';
import Icon from '../../components/Icon/Icon';
import { GOALS_DATA, TEAM_DATA, TECH_STACK_DATA } from './aboutData';

export default function About() {
  return (
    <div className="about">
      <Container>
        <header className="about__header">
          <h1 className="about__title">О нас</h1>
          <div className="about__description">
            Steam Дома — учебный командный проект игрового магазина, вдохновлённый Steam. Приложение
            представляет каталог игр, поиск и фильтрацию, корзину и инструменты администратора.
          </div>
        </header>
        <section className="about__section">
          <h2 className="about__section-title">Наша цель</h2>
          <List data={GOALS_DATA} className="about__list-goals" isIcon />
        </section>
        <section className="about__section">
          <h2 className="about__section-title">Команда</h2>
          <List data={TEAM_DATA} className="about__list-team" />
        </section>
        <section className="about__section">
          <h2 className="about__section-title">Технологии</h2>
          <List data={TECH_STACK_DATA} className="about__list-tech" isIcon />
        </section>
        <footer className="about__footer">
          <Icon name="icon-edu" className="about__footer-icon" />
          <div className="about__footer-content">
            <h3 className="about__footer-title">Учебный проект RS School</h3>
            <p>
              Этот проект разработан в рамках обучения в{' '}
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
