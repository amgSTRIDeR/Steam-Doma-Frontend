import Icon from '../Icon/Icon';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const currentIcon = theme === 'light' ? 'icon-moon' : 'icon-sun';

  return (
    <div className="theme">
      <button
        className="theme__btn"
        onClick={toggleTheme}
        aria-label={`Switch theme to ${theme === 'light' ? 'dark' : 'light'}`}
      >
        <Icon name={currentIcon} className="theme__icon" />
      </button>
    </div>
  );
}
