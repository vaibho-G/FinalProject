// Path: src/components/Admin/Sidebar.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="bg-light" style={{ height: '100vh', padding: '10px' }}>
      <h5>Navigation</h5>
      <ListGroup>
        <ListGroup.Item action onClick={() => setActiveTab('dashboard')}>
          Dashboard Overview
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('profiles')}>
          Profile Management
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('users')}>
          User Management
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('analytics')}>
          Analytics
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => setActiveTab('settings')}>
          Settings
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
