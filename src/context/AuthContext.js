import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from 'axios';

const AuthContext = createContext();

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sara-admin-token') || null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);


  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setLoading(false);
    localStorage.removeItem("sara-admin-token");
  }, []);

const validateToken = useCallback(async () => {
  try {
    const response = await axios.get(`${API}/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data.user);
  } catch (error) {
    logout();
  } finally {
    setLoading(false);
  }
}, [token, logout]);
useEffect(() => {
  if (token) {
    validateToken();
  } else {
    setLoading(false);
  }
}, [token, validateToken]);


  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        username,
        password
      });
      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('sara-admin-token', newToken);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };



  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
