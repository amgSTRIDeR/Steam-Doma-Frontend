import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

export default function Navigation() {
  return (
    <nav aria-label="Main navigation" className="nav">
      <Logo />
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/">О нас</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/home">Магазин</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/catalog">Каталог</NavLink>
        </li>
      </ul>
      <Search
        labelText="Введите название игры"
        placeholder="Поиск по играм..."
        name="game-search"
        onChangeHandler={() => console.log('game search')}
      />
    </nav>
  );
}
