import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ACCESS_DENIED_EVENT,
  APOLLO_ERROR_EVENT,
  CATALOG_FILTERS_ERROR_EVENT,
  AUTH_REQUIRED_EVENT,
} from '../../config/apollo';

export default function ApiErrorHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [errorType, setErrorType] = useState<
    'access-denied' | 'request-failed' | 'filters-unavailable' | null
  >(null);

  useEffect(() => {
    const handleUnauthorized = () => {
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };
    const handleForbidden = () => setErrorType('access-denied');
    const handleRequestFailed = () => setErrorType('request-failed');
    const handleCatalogFiltersFailed = () => setErrorType('filters-unavailable');

    window.addEventListener(AUTH_REQUIRED_EVENT, handleUnauthorized);
    window.addEventListener(ACCESS_DENIED_EVENT, handleForbidden);
    window.addEventListener(APOLLO_ERROR_EVENT, handleRequestFailed);
    window.addEventListener(CATALOG_FILTERS_ERROR_EVENT, handleCatalogFiltersFailed);

    return () => {
      window.removeEventListener(AUTH_REQUIRED_EVENT, handleUnauthorized);
      window.removeEventListener(ACCESS_DENIED_EVENT, handleForbidden);
      window.removeEventListener(APOLLO_ERROR_EVENT, handleRequestFailed);
      window.removeEventListener(CATALOG_FILTERS_ERROR_EVENT, handleCatalogFiltersFailed);
    };
  }, [location.pathname, navigate]);

  if (!errorType) {
    return null;
  }

  return (
    <div className="api-error-notice" role="alert" aria-live="assertive">
      <span>
        {t(
          errorType === 'access-denied'
            ? 'apiErrors.forbidden'
            : errorType === 'filters-unavailable'
              ? 'apiErrors.filtersUnavailable'
              : 'apiErrors.requestFailed',
        )}
      </span>
      <button type="button" onClick={() => setErrorType(null)}>
        {t('apiErrors.dismiss')}
      </button>
    </div>
  );
}
