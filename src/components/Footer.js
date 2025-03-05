import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import SignUpModal from './SignUpModal'; // Assuming this is a valid component
import AdminPage from '../pages/AdminPage';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <footer className="bg-dark text-white pt-4">
      <Container className='container-xl'>
        <Row className="mb-4">
          <Col md={4} className="d-flex flex-column align-items-start mb-3">
            <Button variant="primary" onClick={openSignUpModal} className="mb-2">
              Join Now
            </Button>
            <p>© Synergy 2024</p>
          </Col>


          <Col md={2} className="mb-3">
            <h5>Language</h5>
            <Form.Select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
            </Form.Select>
          </Col>

          <Col md={2} className="mb-3">
            <h5>About Us</h5>
            <p>Team Info</p>
          </Col>

          <Col md={4} className="mb-3">
            <h5>Members</h5>
            <ul className="list-unstyled">
              <li>Bhushan Parkar</li>
              <li>Akash Verma</li>
              <li>Vaibhav Ghangale</li>
              <li>Harshal Bodhe</li>
              <li>Reena Chaudhari</li>
            </ul>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={3}>
            <h5>Conditions</h5>
            <ul className="list-unstyled">
              <li>Privacy</li>
              <li>Cookies – Manage preferences</li>
              <li>Terms</li>
              <li>Community Guidelines</li>
            </ul>
          </Col>

          <Col md={3}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Support</li>
              <li>Security</li>
              <li>Safety Tips</li>
            </ul>
          </Col>

          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </Col>
        </Row>
      </Container>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="modal-overlay">
          <SignUpModal show={showSignUpModal} closeModal={closeSignUpModal} />
        </div>
      )}
    </footer>
  );
};

export default Footer;
