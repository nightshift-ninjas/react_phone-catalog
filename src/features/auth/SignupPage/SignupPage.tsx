import { useState, useContext } from 'react';
import { authClient } from '../../../services/auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'radix-ui';
import { PasswordField } from '../../../shared/ui/PasswordField';
import GoogleIcon from '../../../shared/assets/icons/google.svg?react';
import { LanguageContext } from '../../../shared/context/language';
import { ROUTES } from '../../../shared/config/routes';
import '../form.scss';

export function SignupPage() {
  const { language: lng } = useContext(LanguageContext)!;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const displayName = `${firstName} ${lastName}`.trim();

    try {
      await authClient.register(email, password, displayName);
      navigate(`/${lng}/${ROUTES.login}`);
    } catch (err) {
      setError(`Something went wrong while trying to sign up: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      <h2 className="form__title">Create an account</h2>

      <p className="form__text">
        Already have an account?{' '}
        <Link to={`/${lng}/${ROUTES.login}`} className="form__link">
          Log in
        </Link>
      </p>

      <div className="form__field-group">
        <Form.Field className="form__field" name="firstName">
          <Form.Control asChild>
            <input
              className="form__input"
              type="text"
              placeholder="First name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Control>
          <div>
            <Form.Message className="form__message" match="valueMissing">
              Please provide your first name
            </Form.Message>
          </div>
        </Form.Field>

        <Form.Field className="form__field" name="lastName">
          <Form.Control asChild>
            <input
              className="form__input"
              type="text"
              placeholder="Last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Control>
          <div>
            <Form.Message className="form__message" match="valueMissing">
              Please provide your last name
            </Form.Message>
          </div>
        </Form.Field>
      </div>

      <Form.Field className="form__field" name="email">
        <Form.Control asChild>
          <input
            className="form__input"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Control>
        <div>
          <Form.Message className="form__message" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
      </Form.Field>

      <Form.Field className="form__field" name="password">
        <Form.Control asChild>
          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
            name="password"
            required
          />
        </Form.Control>
        <div>
          <Form.Message className="form__message" match="typeMismatch">
            Please provide a valid password
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
          I agree{' '}
          <a href="#" target="_blank" className="form__link">
            Terms & Conditions
          </a>
        </label>
      </div>

      <Form.Submit asChild>
        <button className="form__submit" disabled={loading || !agreement}>
          Create account
        </button>
      </Form.Submit>

      {error && <span className="form__message">{error}</span>}

      <p className="form__divider">
        <span className="form__line"></span>
        <span>Or register with</span>
        <span className="form__line"></span>
      </p>

      <button
        className="form__button-google"
        type="button"
        onClick={handleGoogleSignup}
        disabled={loading}
      >
        <GoogleIcon />
        {loading ? 'Logging in...' : 'Google'}
      </button>
    </Form.Root>
  );
}
