import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('https://weather-backend-fd87.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/home');
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.glass}>
        <h2 style={styles.title}>Sign In</h2>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <p style={styles.text}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/')} style={styles.link}>Register</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #6b8eff, #4ef7a7, #fcd34f)',
    backgroundSize: '600% 600%',
    animation: 'gradientBG 15s ease infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    color:'black',
    textAlign: 'center',
    fontSize: '26px',
    letterSpacing: '1px',
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
  },
  text: {
    color:'black',
    textAlign: 'center',
    fontSize: '14px'
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
