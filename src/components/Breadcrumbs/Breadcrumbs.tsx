import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';

export default function Breadcrumbs() {
  const { t } = useTranslation();
  return (
    <nav aria-label="Breadcrumbs" className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/home" className="breadcrumbs__link">
            {t('about.breadcrumbsLink1')}
            <Icon name="icon-chevron-right" className="breadcrumbs__icon" />
          </Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          {t('about.breadcrumbsLink2')}
        </li>
      </ul>
    </nav>
  );
}
