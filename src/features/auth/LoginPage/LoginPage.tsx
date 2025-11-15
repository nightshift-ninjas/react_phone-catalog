import { useState } from 'react';
import { authClient } from '../../../services/auth/auth.service';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <button type="button" onClick={handleGoogleLogin} disabled={loading}>
        {loading ? 'Logging in with Google...' : 'Login with Google'}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
