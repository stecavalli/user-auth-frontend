import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../auth/auth';

const PrivateRoute = ({ children }) => {
  const user = getLoggedInUser(); // Controlla se l'utente è loggato

  if (!user) {
    return <Navigate to="/login" />; // Reindirizza al login se non autenticato
  }

  return children; // Se l'utente è autenticato, mostra la pagina
};

export default PrivateRoute;
