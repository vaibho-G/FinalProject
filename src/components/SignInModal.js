import React, { useState } from 'react';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { authAPI } from '../service/api';

const SignInModal = ({ show, closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [activeTab, setActiveTab] = useState('user'); // Track active tab
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigation

  // to change the password through email.
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResetMessage('');

    try {
      // Send email in the correct format
      const response = await authAPI.forgotPassword({
        email: resetEmail
      });
      setResetMessage('Password reset link has been sent to your email.');
      setResetEmail('');
    } catch (error) {
      setResetMessage(error.response?.data?.message || 'Failed to send reset link');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      console.log('Login successful:', response.data);
      

      if (response.token) {
        // Store token
        localStorage.setItem('token', response.token);
        
        // Store user role (you'll need to add this to your backend response)
        localStorage.setItem('userRole', role);
        
        // Close modal
        closeModal();
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/discover');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Invalid email or password');
    }finally {
      setIsLoading(false);
    }
  };

  // Render forgot password form
  if (showForgotPassword) {
    return (
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotPassword}>
            {resetMessage && (
              <div className={`alert ${resetMessage.includes('sent') ? 'alert-success' : 'alert-danger'}`}>
                {resetMessage}
              </div>
            )}
            <Form.Group controlId="resetEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="link"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(tabKey) => {
            setActiveTab(tabKey);
            setRole(tabKey); // Sync role with the selected tab
            setError('');
          }}
          className="mb-3"
        >
          {/* User Tab */}
          <Tab eventKey="user" title="User">
            <Form onSubmit={handleSubmit}>
                {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <Form.Group controlId="userEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="userPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  variant="link"
                  onClick={() => setShowForgotPassword(true)}
                  className="p-0"
                >
                  Forgot Password?
                </Button>
              <Button 
              type="submit" 
              variant="primary" 
              className="mt-3"
              disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In as User'}
              </Button>
              </div>
            </Form>
          </Tab>

          {/* Admin Tab */}
          <Tab eventKey="admin" title="Admin">
            <Form onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <Form.Group controlId="adminEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="adminPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit"
               variant="primary" 
               className="mt-3"
               disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In as Admin'}
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
