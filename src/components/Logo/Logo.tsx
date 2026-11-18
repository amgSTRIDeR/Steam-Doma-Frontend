import Icon from '../Icon/Icon';
import './Logo.scss';

export default function Logo() {
  return (
    <div className="logo">
      <Icon name="icon-brand" className="logo__icon" />
      <p className="logo__title">Steam Дома</p>
    </div>
  );
}
