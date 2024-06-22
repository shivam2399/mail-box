import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = ({ userEmail }) => {
  return (
    <div className="welcome-container">
      <h2>Welcome to Mail Box</h2>
      <p>Logged in as: {userEmail}</p>
      <div className="buttons-container">
        <Link to="/compose">
          <button>Compose Mail</button>
        </Link>
        <button>Inbox</button>
        <button>Sent Items</button>
      </div>
    </div>
  );
};

export default Welcome;
