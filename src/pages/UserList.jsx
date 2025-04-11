import { useEffect, useState } from "react";
import "../styles/Form.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Carica utenti da localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Elimina utente
  const handleDelete = (usernameToDelete) => {
    const filteredUsers = users.filter(user => user.username !== usernameToDelete);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    // Se l'utente eliminato era loggato, effettua logout
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser?.username === usernameToDelete) {
      localStorage.removeItem("loggedInUser");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Utenti Registrati</h2>
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
