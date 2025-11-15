import { useState } from "react";
import { authClient } from "../../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authClient.register(email, password);
      navigate("/auth/login");
    } catch (error) {
      setError(`Someting went wrong while trying to signup ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Signup</h2>

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
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
