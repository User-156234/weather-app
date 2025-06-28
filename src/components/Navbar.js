import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.links}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/search" style={styles.link}>Search</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
      <div style={styles.userSection}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <span onClick={() => setShowDropdown(!showDropdown)} style={styles.user}>
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true`}
                alt="avatar"
                style={styles.avatar}
              />
              <span style={{ marginLeft: '8px' }}>{user.name} ⬇</span>
            </span>
            {showDropdown && (
              <div style={styles.dropdown}>
                <div onClick={logout} style={styles.dropdownItem}>Logout</div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" style={styles.link}>Sign In</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    color: '#f0f0f0',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#f0f0f0',
    textDecoration: 'none',
    fontWeight: '500',
    transition: '0.3s',
    padding: '0.4rem',
    borderRadius: '6px',
    
  },
  userSection: {
    color: '#f0f0f0',
  },
  user: {
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '0.4rem 0.6rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    transition: '0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dropdown: {
    position: 'absolute',
    top: '120%',
    right: 0,
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    zIndex: 20,
  },
  dropdownItem: {
    padding: '0.75rem 1.2rem',
    cursor: 'pointer',
    color: '#222',
    fontWeight: '500',
    transition: '0.2s',
    whiteSpace: 'nowrap',
  }
};
