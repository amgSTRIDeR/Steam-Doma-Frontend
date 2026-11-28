import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  return (
    <section className="login-page">
      <h1>{t('auth.loginTitle')}</h1>
      <p>{t('auth.loginUnavailable')}</p>
      <Link to="/home">{t('auth.backToHome')}</Link>
    </section>
  );
}
