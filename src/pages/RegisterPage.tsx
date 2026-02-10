import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setSubmitting(true);
      const trimmedName = name.trim();
      await register(email, password, trimmedName ? trimmedName : undefined);
      nav("/login");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F2F1] p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#3A2A1A] mb-6">
          Create your account
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-2">
              Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none focus:ring-2 focus:ring-[#D28625]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none focus:ring-2 focus:ring-[#D28625]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none focus:ring-2 focus:ring-[#D28625]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A2A1A] mb-2">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full rounded-md border border-[#D4C8BE] bg-white p-2 focus:outline-none focus:ring-2 focus:ring-[#D28625]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md px-4 py-2 text-sm font-semibold text-white bg-[#D28625] hover:bg-[#AB9983] disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#D28625] hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;
