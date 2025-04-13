import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "../firebase";

const PasswordReset = () => {
  const router = useRouter();
  const { oobCode } = router.query;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!oobCode || typeof oobCode !== "string") return;

    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        // Valid
      })
      .catch(() => {
        setError("Invalid or expired reset link.");
      });
  }, [oobCode]);

  const handleReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!oobCode || typeof oobCode !== "string") {
      setError("Reset code is missing or invalid.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="glass-card">
        <h1>🔐 Reset Password</h1>
        {error && <p className="message error">{error}</p>}
        {success ? (
          <p className="message success">✅ Password successfully reset!</p>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top left, #0f2027, #203a43, #2c5364);
          font-family: 'Poppins', sans-serif;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          color: #f1f1f1;
          text-align: center;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 1.5rem;
          color: #ffffff;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #f1f1f1;
          font-size: 15px;
          outline: none;
          transition: 0.3s ease;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        input:focus {
          border-color: #00ffff;
          background: rgba(255, 255, 255, 0.15);
        }

        button {
          padding: 12px;
          background: linear-gradient(135deg,rgb(160, 218, 234),rgb(187, 239, 192));
          color: #0f0f0f;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        button:hover:enabled {
          filter: brightness(1.1);
        }

        button:disabled {
          background: #555;
          color: #aaa;
          cursor: not-allowed;
        }

        .message {
          font-size: 14px;
          margin-bottom: 1rem;
        }

        .error {
          color: #ff6b6b;
        }

        .success {
          color: #1dd1a1;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default PasswordReset;
