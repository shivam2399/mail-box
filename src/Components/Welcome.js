import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import { useSelector } from 'react-redux';




const Welcome = () => {
  const email = useSelector(state => state.auth.email)

  return (
    <div className="welcome-container">
      <h2>Welcome to Mail Box</h2>
      <h3>Hello {email}</h3>
      <div className="buttons-container">
        <Link to="/compose">
          <button>Compose Mail</button>
        </Link>
        <Link to="/inbox">
          <button>Inbox</button>
        </Link>
        <button>Sent Items</button>
      </div>
    </div>
  );
};

export default Welcome;
