import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserList from "./pages/UserList";
import PrivateRoute from './components/PrivateRoute'; // Se vuoi una protezione per il profilo

function App() {
  return (
    <Router>
      <div>
        {/* Navigazione di esempio per il login e la registrazione */}
        <nav>
          <a href="/users">Visualizza Utenti</a>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
		  <Route path="/users" element={<UserList />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
