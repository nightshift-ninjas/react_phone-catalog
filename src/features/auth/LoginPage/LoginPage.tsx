import { useState, useContext } from 'react';
import { authClient } from '../../../services/auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'radix-ui';
import { PasswordField } from '../../../shared/ui/PasswordField';
import GoogleIcon from '../../../shared/assets/icons/google.svg?react';
import { LanguageContext } from '../../../shared/context/language';
import { ROUTES } from '../../../shared/config/routes';
import { useTranslation } from 'react-i18next';
import '../form.scss';

export function LoginPage() {
  const { language: lng } = useContext(LanguageContext)!;
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authClient.login(email, password);
      const currentUser = authClient.getCurrentUser();
      if (currentUser) {
        console.log('Logged in user:', currentUser.uid, currentUser.email);
      }
      navigate(`/${lng}/`);
    } catch (err) {
      setError(`Something went wrong while trying to login: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authClient.loginWithGoogle();
      navigate(`/${lng}/`);
    } catch (err) {
      setError(`Google login failed. Please try again: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{t('loginTitle')}</h2>

      <p className="form__text">
        {t('noAccountPrompt')}{' '}
        <Link to={`/${lng}/${ROUTES.signup}`} className="form__link">
          {t('createAccountAction')}
        </Link>
      </p>

      <Form.Field className="form__field" name="email">
        <Form.Control asChild>
          <input
            className="form__input"
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Control>
        <div>
          <Form.Message className="form__message" match="typeMismatch">
            {t('emailValidationFailed')}
          </Form.Message>
        </div>
      </Form.Field>

      <Form.Field className="form__field" name="password">
        <Form.Control asChild>
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('passwordPlaceholder')}
            name="password"
            required
          />
        </Form.Control>
        <div>
          <Form.Message className="form__message" match="typeMismatch">
            {t('passwordValidationFailed')}
          </Form.Message>
        </div>
      </Form.Field>

      <div className="form__checkbox-wrapper">
        <input
          id="agreement"
          className="form__checkbox"
          type="checkbox"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
        />
        <label htmlFor="agreement">
          {t('iAgreeCheckbox')}{' '}
          <a href="#" target="_blank" className="form__link">
            {t('termsAndConditions')}
          </a>
        </label>
      </div>

      <Form.Submit asChild>
        <button className="form__submit" disabled={loading || !agreement}>
          {t('loginButton')}
        </button>
      </Form.Submit>

      {error && <span className="form__message">{error}</span>}

      <p className="form__divider">
        <span className="form__line"></span>
        <span>{t('orLoginWith')}</span>
        <span className="form__line"></span>
      </p>

      <button
        className="form__button-google"
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <GoogleIcon />
        {loading ? t('loggingInStatus') : t('googleLoginOption')}
      </button>
    </Form.Root>
  );
}
