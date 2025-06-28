import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user,navigate]);

  const handleLogin = async () => {
    const res = await fetch('https://weather-backend-fd87.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      const decoded = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ name: decoded.name });
      navigate('/home');
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.glass}>
        <h2 style={styles.title}>Sign In</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={styles.input} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={styles.input} />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <p style={styles.text}>
          Do not have an account?{' '}
          <span onClick={() => navigate('/')} style={styles.link}>Register</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    minHeight: '100vh',
    background: '#1E1E1E',
    backgroundSize: '600% 600%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: 'Times New Roman, Times, serif',
  },
  link: {
    color: '#6b8efb',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  glass: {
    width: '360px',
    padding: '2rem',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '16px'
  },
  button: {
    padding: '0.9rem',
    borderRadius: '10px',
    backgroundColor: '#6b8efb',
    border: 'none',
    fontWeight: 'bold',
    color: 'black',
    cursor: 'pointer',
    transition: '0.3s ease'
  }
};
