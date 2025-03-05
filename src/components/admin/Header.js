import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/AdminHeader.css';
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear all authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Optional: Clear any other stored data
      sessionStorage.clear();
      
      // Navigate to login page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="admin-header">
      <Container>
        <Navbar.Brand>Synergy Admin Dashboard</Navbar.Brand>
        <Nav className="ms-auto">
          <Button 
            variant="outline-danger" 
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;