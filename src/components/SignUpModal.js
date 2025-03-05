import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { userAPI } from '../service/api';

const SignUpModal = ({ show, closeModal }) => {
  const [step, setStep] = useState(1); // Track current step
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [preferredGender, setPreferredGender] = useState(false);
  const [preferredMinAge, setPreferredMinAge] = useState('');
  const [preferredMaxAge, setPreferredMaxAge] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0], // Format date correctly
        gender: gender === 'Male', // Convert to boolean: true for Male, false for Female
        bio,
        preferredGender: preferredGender === 'Male', // Convert to boolean
        preferredMinAge: parseInt(preferredMinAge) || 0, // Use default if not set
        preferredMaxAge: parseInt(preferredMaxAge) || 100, // Use default if not set
        preferredMaxRange: 310, // Using default value from model
        socialType: 'LOCAL', // Add required field
        latitude: null, // Can be null for now
        longitude: null, // Can be null for now
        notification: true // Using default value from model
      };
      
      const response = await userAPI.createUser(formData);
      console.log('User created:', response.data);
      closeModal();
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
    
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up - Step {step}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}
          {step === 2 && (
            <>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {step === 3 && (
            <>
              <Form.Group controlId="formDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'Male'}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'Female'}
                />
                <Form.Check
                  type="radio"
                  label="Non-Binary"
                  name="gender"
                  value="Non-Binary"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'Non-Binary'}
                />
              </Form.Group>
            </>
          )}
          {step === 4 && (
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                required
              />
            </Form.Group>
          )}
          {step === 5 && (
            <>
              <Form.Group controlId="formPreferredGender">
                <Form.Label>Preferred Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="preferredGender"
                  value="Male"
                  onChange={(e) => setPreferredGender(e.target.value)}
                  checked={preferredGender === 'Male'}
                  required
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="preferredGender"
                  value="Female"
                  onChange={(e) => setPreferredGender(e.target.value)}
                  checked={preferredGender === 'Female'}
                />
              </Form.Group>
              <Form.Group controlId="formAgeRange">
                <Form.Label>Preferred Age Range</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Min Age"
                  value={preferredMinAge}
                  onChange={(e) => setPreferredMinAge(e.target.value)}
                  required
                />
                <Form.Control
                  type="number"
                  placeholder="Max Age"
                  value={preferredMaxAge}
                  onChange={(e) => setPreferredMaxAge(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {step === 6 && (
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="City, State, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
          )}
          {/* {step === 7 && (
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
          )} */}
          {step === 7 && (
            <Form.Group controlId="formPassWord">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <div className="d-flex justify-content-between mt-3">
            {step > 1 && (
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 7 ? (
              <Button variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
