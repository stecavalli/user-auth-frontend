import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registrazione completata");
        setFormData({ username: "", password: "" });
      } else {
        setMessage(data.message || "Errore nella registrazione");
      }
    } catch (err) {
      setMessage("Errore di connessione al server");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Registrazione</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nome utente"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrati</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Hai già un account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
