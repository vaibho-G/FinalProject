import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const Header = ({ likedProfiles }) => {
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/');
  };

  const navigateToFriendList = () => {
    navigate('/FriendList');
  };

  const navigateToRequests = () => {
    navigate('/Requests');
  };

  const navigateToDiscover = () => {
    navigate('/discover');
  };

 

  const navigateToLikedProfiles = () => {
    navigate('/likedProfiles', { state: { likedProfiles } });
  };

  return (
    
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container className='container-xl'>
        <Navbar.Brand onClick={navigateToLandingPage}>
          {/* <img
              alt="logo"
              // href= "C:\Users\Samarth\Downloads\synergy-dating-app - Copycopy\src\data\logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> */}
            Synergy
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            < Button variant="link" onClick={navigateToDiscover} className="btn-nav">Discover</Button>
            <Button variant="link" onClick={navigateToLikedProfiles} className="btn-nav">Liked Profiles</Button>
            <Button variant="link" onClick={navigateToFriendList} className="btn-nav">Friendlist</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Container className=''>
        {/* Back Button */}
        <Button variant="outline-secondary" onClick={() => navigate(-1)} className="back-btn">Back</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
