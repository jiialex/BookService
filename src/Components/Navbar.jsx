import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../images/profile.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
});

function Navbar() {
  const [profileData, setProfileData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState({
    profile: true,
    notifications: true
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      const response = await api.get('/user/profile');
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Profile Error:', err.response?.data || err.message);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(prev => ({ ...prev, notifications: true }));
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Notifications Error:', err.response?.data || err.message);
    } finally {
      setLoading(prev => ({ ...prev, notifications: false }));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      
      setSearchQuery('');
    } catch (err) {
      setError('Search failed');
      console.error('Search Error:', err.response?.data || err.message);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Mark Read Error:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
    
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fas fa-rocket me-2" style={{ fontSize: '1.5rem', color: '#007bff' }}></i> 
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Hodgy</span>
        </Link>

        <div className="d-flex align-items-center">
          <div className="dropdown">
            <Link 
              to="#" 
              className="nav-link position-relative mx-2 dropdown-toggle"
              id="notificationsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell" style={{ fontSize: '1.3rem', color: '#555' }}></i>
              {unreadCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem', padding: '0.3em 0.5em', lineHeight: '1' }}
                >
                  {unreadCount}
                </span>
              )}
            </Link>
            
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
              {loading.notifications ? (
                <li className="px-3 py-2 text-center">
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </li>
              ) : notifications.length === 0 ? (
                <li className="px-3 py-2 text-muted">No notifications</li>
              ) : (
                notifications.map(notification => (
                  <li key={notification.id}>
                    <Link 
                      className={`dropdown-item ${notification.read ? '' : 'fw-bold'}`}
                      to={notification.link}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="d-flex align-items-center">
                        <i className={`fas fa-${notification.icon || 'bell'} me-2`}></i>
                        <div>
                          <div>{notification.title}</div>
                          <small className="text-muted">{new Date(notification.date).toLocaleString()}</small>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <Link to="/profile" className="nav-link position-relative ms-3">
            <img 
              src={profileData?.avatar || profile}
              alt="User Avatar" 
              className="rounded-circle" 
              style={{ 
                width: '30px', 
                height: '30px', 
                objectFit: 'cover',
                border: profileData?.isProfileComplete ? 'none' : '2px solid #dc3545'
              }}
            />
            {profileData && !profileData.isProfileComplete && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: '0.6rem', padding: '0.3em 0.5em', lineHeight: '1' }}
              >
                !
                <span className="visually-hidden">profile incomplete</span>
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mx-3 mt-2" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="alert" 
            aria-label="Close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;