import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <div>
        <Link to="/home">Home</Link> | <Link to="/search">Search</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
      </div>
      {user ? (
        <div style={{ position: 'relative' }}>
          <span
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: 'pointer' }}
          >
            {user.name} ⬇
          </span>
          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              background: '#eee',
              padding: '0.5rem',
              borderRadius: '5px'
            }}>
              <div onClick={logout} style={{ cursor: 'pointer' }}>Logout</div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </nav>
  );
}
