import React from 'react';
import { Link } from 'react-router-dom'; 
import profile from '../images/profile.jpg'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-rocket me-2" style={{ fontSize: '1.5rem', color: '#007bff' }}></i> 
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hodgy</span>
        </Link>
        <div className="d-flex align-items-center">
          <Link to="/notifications" className="nav-link position-relative mx-2">
          
            <i className="fas fa-bell" style={{ fontSize: '1.3rem', color: '#555' }}></i>
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.6rem', padding: '0.3em 0.5em', lineHeight: '1' }}
            >
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>

          <Link to="/search-page" className="nav-link mx-2">
            
            <i className="fas fa-search" style={{ fontSize: '1.3rem', color: '#555' }}></i>
          </Link>

          <Link to="/profile" className="nav-link position-relative ms-3">
            <img 
              src={profile}
              alt="User Avatar" 
              className="rounded-circle" 
              style={{ width: '30px', height: '30px', objectFit: 'cover' }}
            />
            <span 
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.6rem', padding: '0.3em 0.5em', lineHeight: '1' }}
            >
              <span className="visually-hidden">new updates</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;