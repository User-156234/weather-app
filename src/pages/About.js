export default function About() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>About WeatherEase</h2>
          <p>
            WeatherEase is a modern weather web app that allows users to search real-time weather conditions for any location — city, town, or village. It also provides personalized weather forecasts based on your current location.
          </p>
          <p>
            Our app is built using React for the frontend, Node.js + Express for the backend, and MongoDB for secure user authentication.
          </p>
          <p>
            Designed with usability, responsiveness, and clarity in mind, WeatherEase ensures you stay informed with stylish, accurate, and real-time weather data.
          </p>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      font:'Times New Roman',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #28313B, #485563)',
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
  