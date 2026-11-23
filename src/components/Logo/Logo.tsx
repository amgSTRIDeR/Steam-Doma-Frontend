import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <Icon name="icon-brand" className="logo__icon" />
      <p className="logo__title">Steam Дома</p>
    </Link>
  );
}
