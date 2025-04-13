import { useEffect, useState } from "react";
import "../styles/Form.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Carica utenti dal backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
        const data = await response.json();
        if (response.ok) {
          setUsers(data); // Imposta gli utenti nel state
        } else {
          setMessage("Errore nel recupero degli utenti.");
        }
      } catch (err) {
        setMessage("Errore di connessione al server");
      }
    };

    fetchUsers();
  }, []);

  // Elimina utente
  const handleDelete = async (usernameToDelete) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${usernameToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter(user => user.username !== usernameToDelete)); // Rimuovi utente dal state
      } else {
        setMessage("Errore durante l'eliminazione dell'utente");
      }
    } catch (err) {
      setMessage("Errore di connessione al server");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Utenti Registrati</h2>
        {message && <p>{message}</p>}
        {users.length === 0 ? (
          <p>Nessun utente registrato.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span>{user.username}</span>
                <button
                  onClick={() => handleDelete(user.username)}
                  className="delete-btn"
                >
                  Elimina
                </button>
              </li>
            ))}
          </ul>
        )}
        <p><a href="/login">Torna al Login</a></p>
      </div>
    </div>
  );
};

export default UserList;
