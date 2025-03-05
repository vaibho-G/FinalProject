import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import SignInModal from '../components/SignInModal'; // If the modal is in a components folder
import SignUpModal from '../components/SignUpModal';
import Footer from '../components/Footer';
import styles from '../css/Landing.module.css';
import LanguageSelector from '../components/LanguageSelector';

const LandingPage = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Functions to open/close modals
  const openSignInModal = () => setShowSignInModal(true);
  const closeSignInModal = () => setShowSignInModal(false);

  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);

  return (
    <div className={styles['landing-page']}>
      <header className={styles['landing-header']}>
        <Navbar expand="lg" className={styles['landing-header']}>
          <Navbar.Brand href="/" className={styles.logo}>Synergy</Navbar.Brand>
          <Nav className="ml-auto">
            {/* SignIn Button */}
            <Button variant="success" className={styles['sign-in-btn']} onClick={openSignInModal}>Sign In</Button>

            {/* SignUp Button in the Navbar */}
            <Button variant="success" className="sign-up-btn" onClick={openSignUpModal}>Sign Up</Button>
          </Nav>
          <LanguageSelector />
        </Navbar>
      </header>

      <div className={styles['main-content']}>
        <Row className={styles.content}>
          <Col>
            <h1 className={styles['main-heading']}>DATING FOR EVERY<br />SINGLE PERSON</h1>
            <p className={styles.description}>
              Synergy provides a safe and secure matchmaking platform for people to connect, communicate, and meet new friends.<br />
              Synergy is the only dating app that matches you on what matters to you. You deserve to find who you're looking for.<br /> 
              Meet them today!
            </p>
            <Button variant="success" className={styles['join-btn']} onClick={openSignInModal}>Join Now</Button>
            <p className={styles.terms}>
              By joining, you agree to our <a href="/terms">terms and conditions</a>.
            </p>
          </Col>
        </Row>

        <Row className={styles.link}>
          <Col className={styles['app-links']}>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <img src="googleplay.png" alt="Google Play" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src="appstore.png" alt="App Store" />
            </a>
          </Col>
        </Row>
      </div>

      {/* Render SignUp and SignIn Modals */}
      {showSignInModal && (
        <div className="modal-overlay">
          <SignInModal show={showSignInModal} closeModal={closeSignInModal} />
        </div>
      )}

      {showSignUpModal && (
        <div className="modal-overlay">
          <SignUpModal show={showSignUpModal} closeModal={closeSignUpModal} />
        </div>
      )}
         
      <Footer />
    </div>
  );
};

export default LandingPage;
