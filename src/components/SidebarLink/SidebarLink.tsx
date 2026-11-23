import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import type { IconName } from '../Icon/Icon';

type SidebarLinkProps = {
  readonly path: string;
  readonly name?: IconName;
  readonly text: string;
};

export default function SidebarLink({ path, text, name }: SidebarLinkProps) {
  return (
    <li className="nav__item">
      <NavLink
        to={`/${path}`}
        end={path === '/'}
        className={({ isActive }) => (isActive ? 'nav__link nav__link_active' : 'nav__link')}
      >
        {name ? <Icon name={name} className="sidebar__icon" /> : null}
        {text}
      </NavLink>
    </li>
  );
}
