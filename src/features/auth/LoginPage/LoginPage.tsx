import { useState } from 'react';
import { authClient } from '../../../services/auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'radix-ui';
import { PasswordField } from '../../../shared/ui/PasswordField';
import GoogleIcon from '../../../shared/assets/icons/google.svg?react';
import '../form.scss';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

      navigate('/');
    } catch (error) {
      setError(`Something went wrong while trying to login: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authClient.loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError(`Google login failed. Please try again: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form.Root className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Log in your account</h2>

      <p className="form__text">
        Don&apos;t have an account?
        <Link to="/auth/signup" className="form__link">
          Create account
        </Link>
      </p>

      <Form.Field className="form__field" name="email">
        <Form.Control asChild>
          <input
            className="form__input"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
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
          onChange={(event) => setAgreement(event.target.checked)}
        />
        <label htmlFor="agreement">
          I agree
          <a href="#" target="_blank" className="form__link">
            Terms & Conditions
          </a>
        </label>
      </div>

      <Form.Submit asChild>
        <button className="form__submit" disabled={loading || !agreement}>
          Log in
        </button>
      </Form.Submit>

      {error && <span className="form__message">{error}</span>}

      <p className="form__divider">
        <span className="form__line"></span>
        <span>Or login with</span>
        <span className="form__line"></span>
      </p>

      <button
        className="form__button-google"
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <GoogleIcon />
        {loading ? 'Logging in...' : 'Google'}
      </button>
    </Form.Root>
  );
}
