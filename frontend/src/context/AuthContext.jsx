import { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../views/Login';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Obtener el nombre de usuario desde el backend
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setIsAuthenticated(true);
      try {
        const response = await fetch(`${API_URL}/api/users/username`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          logout(); // Logout si el token es inválido
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        logout();
      }
    }
  };

  // Usar useEffect para obtener datos del usuario al montar el componente
  useEffect(() => {
    console.log("entra en el react.useEffect")
    fetchUserData();
  }, [isAuthenticated]);  // Dependemos de isAuthenticated para actualizar la info del usuario

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
