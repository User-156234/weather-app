import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext'; // ✅ default import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
