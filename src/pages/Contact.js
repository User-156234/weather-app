export default function Contact() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Contact Us</h2>
          <p>If you have any questions, suggestions, or issues, feel free to reach out:</p>
          <ul>
            <li>📧 Email: xxxxx@weathweb.app</li>
            <li>📍 Address: Shinjuku,Japan </li>
            <li>📞 Phone: +91-xxxxx-xxxxx</li>
          </ul>
          <p>We're here to help you stay weather-ready!</p>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1c1c2b)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem 1rem',
    },
    card: {
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(15px)',
      padding: '2rem',
      borderRadius: '16px',
      maxWidth: '700px',
      color: '#ffffff',
      boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
      lineHeight: '1.7',
      font:'Times New Roman',
      fontSize: '20px'
    }
  };
  