// import React, { useState } from 'react';
// import { Button, Form, Modal } from 'react-bootstrap';

// const SignUpModal = ({ showSignUpModal, closeModal }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     first_name: '',
//     last_name: '',
//     gender: 'Male',
//     dob: '',
//     bio: '',
//     role_id: 1, // Default role set to 'user'
//     is_premium: false,
//   });

//   const [errors, setErrors] = useState({}); // Track validation errors
//   const [currentStep, setCurrentStep] = useState(1); // Track the current step

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   // Validate email (step 1)
//   const validateEmail = () => {
//     if (!formData.email) {
//       return 'Email is required';
//     }
//     return '';
//   };

//   // Validate password, first name, etc.
//   const validateStep = () => {
//     let stepErrors = {};
//     if (currentStep === 2 && !formData.password) stepErrors.password = 'Password is required';
//     if (currentStep === 3 && !formData.first_name) stepErrors.first_name = 'First name is required';
//     if (currentStep === 4 && !formData.dob) stepErrors.dob = 'Date of birth is required';
//     if (currentStep === 4 && calculateAge(formData.dob) < 18) stepErrors.dob = 'You must be at least 18 years old';
//     return stepErrors;
//   };

//   // Calculate age from dob to check if over 18
//   const calculateAge = (dob) => {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth();
//     const day = today.getDate();
//     if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateStep();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     if (currentStep < 5) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       console.log('Form Submitted:', formData);
//       closeModal(); // Close modal on successful submission
//     }
//   };

//   if (!showSignUpModal) return null;

//   return (
//     <Modal show={showSignUpModal} onHide={closeModal}>
//       <Modal.Header closeButton>
//         <Modal.Title>Sign Up</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           {/* Step 1: Email */}
//           {currentStep === 1 && (
//             <>
//               <Form.Group controlId="formEmail">
//                 <Form.Label>Email:</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   isInvalid={errors.email}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </>
//           )}

//           {/* Step 2: Password */}
//           {currentStep === 2 && (
//             <>
//               <Form.Group controlId="formPassword">
//                 <Form.Label>Password:</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   isInvalid={errors.password}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.password}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </>
//           )}

//           {/* Step 3: First Name */}
//           {currentStep === 3 && (
//             <>
//               <Form.Group controlId="formFirstName">
//                 <Form.Label>First Name:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="first_name"
//                   value={formData.first_name}
//                   onChange={handleChange}
//                   isInvalid={errors.first_name}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.first_name}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </>
//           )}

//           {/* Step 4: Date of Birth */}
//           {currentStep === 4 && (
//             <>
//               <Form.Group controlId="formDob">
//                 <Form.Label>Date of Birth:</Form.Label>
//                 <Form.Control
//                   type="date"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   isInvalid={errors.dob}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.dob}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </>
//           )}

//           {/* Step 5: Review */}
//           {currentStep === 5 && (
//             <>
//               <Form.Group controlId="formReview">
//                 <Form.Label>Review Information:</Form.Label>
//                 <div>
//                   <p>Email: {formData.email}</p>
//                   <p>Name: {formData.first_name} {formData.last_name}</p>
//                   <p>Gender: {formData.gender}</p>
//                   <p>Age: {calculateAge(formData.dob)}</p>
//                 </div>
//               </Form.Group>
//             </>
//           )}

//           <Button variant="primary" type="submit">{currentStep < 5 ? 'Next' : 'Submit'}</Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default SignUpModal;


import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap'; // Import required components
import styles from '../css/Modal.module.css'; // Ensure custom CSS is linked

const SignUpModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: false,
    bio: '',
    latitude: '',
    longitude: '',
    notification: true,
    preferredGender: false,
    preferredMinAge: 0,
    preferredMaxAge: 100,
    preferredMaxRange: 310,
    socialType: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // API call to register user
  };

  return (
    <Modal  onHide={closeModal} className={styles.modalContent}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value={false}
              checked={!formData.gender}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value={true}
              checked={formData.gender}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSocialType">
            <Form.Label>Social Type</Form.Label>
            <Form.Control
              type="text"
              name="socialType"
              placeholder="Enter your social type"
              value={formData.socialType}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
