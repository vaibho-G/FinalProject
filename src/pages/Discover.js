import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert, ButtonGroup, Card } from 'react-bootstrap';
// import { motion, AnimatePresence } from 'framer-motion'; // Install this package for animations
import Header from '../components/Header';
import Footer from '../components/Footer';
import { userAPI } from '../service/api'; // Import your API service
import '../css/Discover.module.css'; // Create this CSS file

const Discover = () => {
  const [genderPreference, setGenderPreference] = useState('Female');
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // Fetch profiles from backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await userAPI.getAllUsers();
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profiles');
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Filter profiles based on gender preference
  useEffect(() => {
    const filtered = profiles.filter(profile => 
      profile.gender === (genderPreference === 'Female' ? false : true)
    );
    setFilteredProfiles(filtered);
    setCurrentIndex(0);
    setCurrentProfile(filtered[0] || null);
  }, [genderPreference, profiles]);

  const handleLike = async () => {
    if (!currentProfile) return;

    try {
      // Create a profile object with the required format
      const likedProfile = {
        id: currentProfile.id,
        name: `${currentProfile.firstName} ${currentProfile.lastName}`,
        age: currentProfile.age,
        gender: currentProfile.gender ? 'Male' : 'Female',
        location: 'Not specified', // Add if you have location data
        bio: currentProfile.bio || 'No bio available'
      };

      // Add to liked profiles
      setLikedProfiles(prev => [...prev, likedProfile]);

      // Add animation class
      const button = document.querySelector('.like-button');
      button.classList.add('liked');
      
      setTimeout(() => {
        button.classList.remove('liked');
        handleNextProfile();
      }, 500);

    } catch (error) {
      setError('Failed to like profile');
    }
  };

  const handlePass = () => {
    const button = document.querySelector('.pass-button');
    button.classList.add('passed');
    
    setTimeout(() => {
      button.classList.remove('passed');
      handleNextProfile();
    }, 500);
  };

  const handleNextProfile = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < filteredProfiles.length) {
      setCurrentIndex(nextIndex);
      setCurrentProfile(filteredProfiles[nextIndex]);
    } else {
      setCurrentProfile(null);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="discover-page">
      <Header likedProfiles={likedProfiles} />
      
      <Container className="main-content">
        <Row className="justify-content-center mb-4">
          <Col md={6} sm={12}>
            <Form.Group className="preference-selector">
              <Form.Label>I'm interested in</Form.Label>
              <Form.Select
                value={genderPreference}
                onChange={(e) => setGenderPreference(e.target.value)}
                className="custom-select"
              >
                <option value="Female">Women</option>
                <option value="Male">Men</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={6} sm={12}>
            {/* <AnimatePresence> */}
              {currentProfile ? (
                // <motion.div
                //   key={currentProfile.id}
                //   initial={{ x: 300, opacity: 0 }}
                //   animate={{ x: 0, opacity: 1 }}
                //   exit={{ x: -300, opacity: 0 }}
                //   className="profile-card-container"
                // >
                  <Card className="profile-card">
                    <Card.Body>
                      <Card.Title>{`${currentProfile.firstName} ${currentProfile.lastName}`}</Card.Title>
                      <Card.Text className="age-location">
                        {currentProfile.age} years old
                      </Card.Text>
                      <Card.Text className="bio">
                        {currentProfile.bio || "No bio available"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                // </motion.div>
              ) : (
                <Alert variant="info" className="no-profiles">
                  No more profiles to show. Try adjusting your preferences!
                </Alert>
              )}
            {/* </AnimatePresence> */}
          </Col>
        </Row>

        {currentProfile && (
          <Row className="justify-content-center mt-4">
            <Col md={6} sm={12} className="action-buttons">
              <ButtonGroup>
                <Button 
                  variant="outline-danger" 
                  className="action-button pass-button"
                  onClick={handlePass}
                >
                  ✕
                </Button>
                <Button 
                  variant="outline-success" 
                  className="action-button like-button"
                  onClick={handleLike}
                >
                  ♥
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        )}
      </Container>
      
      <Footer />
    </div>
  );
};

export default Discover;