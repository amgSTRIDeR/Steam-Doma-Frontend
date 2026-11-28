import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACCESS_DENIED_EVENT, AUTH_REQUIRED_EVENT } from '../../config/apollo';

export default function ApiErrorHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };
    const handleForbidden = () => setAccessDenied(true);

    window.addEventListener(AUTH_REQUIRED_EVENT, handleUnauthorized);
    window.addEventListener(ACCESS_DENIED_EVENT, handleForbidden);

    return () => {
      window.removeEventListener(AUTH_REQUIRED_EVENT, handleUnauthorized);
      window.removeEventListener(ACCESS_DENIED_EVENT, handleForbidden);
    };
  }, [location.pathname, navigate]);

  if (!accessDenied) {
    return null;
  }

  return (
    <div className="api-error-notice" role="alert" aria-live="assertive">
      <span>{t('apiErrors.forbidden')}</span>
      <button type="button" onClick={() => setAccessDenied(false)}>
        {t('apiErrors.dismiss')}
      </button>
    </div>
  );
}
