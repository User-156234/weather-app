import { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Decode token to get user info (simple way)
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const decoded = JSON.parse(atob(base64Url));
      setUser({ name: decoded.name });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; // redirect to register
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
