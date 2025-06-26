import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch('https://weather-backend-fd87.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.message) {
      alert('Registration successful');
      navigate('/signin');
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.glass}>
        <h2 style={styles.title}>Register</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          style={styles.input}
        />
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
        <button onClick={handleRegister} style={styles.button}>Register</button>
        <p style={styles.text}>
          Already have an account?{' '}
          <span onClick={() => navigate('/signin')} style={styles.link}>Sign In</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  background: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #6b8eff, #4ef7a7, #fcd34f)',
    backgroundSize: 'auto',
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
    color: '#000010',
    cursor: 'pointer',
    transition: '0.3s ease'
  },
  text: {
    color:'#',
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
