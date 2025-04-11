import { getLoggedInUser, logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Importa Link per i collegamenti

const Profile = () => {
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Benvenuto, {user.username}!</h2>
          <button onClick={handleLogout}>Esci</button>
        </>
      ) : (
        <>
          <h2>Devi fare il login per accedere al profilo.</h2>
          <Link to="/login">Vai al login</Link> {/* Collegamento al login */}
        </>
      )}
    </div>
  );
};

export default Profile;
