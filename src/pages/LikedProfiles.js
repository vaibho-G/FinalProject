import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/LikedProfile.module.css';

const LikedProfiles = () => {
  const location = useLocation();
  const initialLikedProfiles =
    (location.state && location.state.likedProfiles) || []; // Default to empty array

  const [likedProfiles, setLikedProfiles] = useState(initialLikedProfiles); // Local state for profiles

  // Remove a profile from the list
  const handleRemove = (id) => {
    const updatedProfiles = likedProfiles.filter((profile) => profile.id !== id);
    setLikedProfiles(updatedProfiles); // Update the state
  };

  return (
    <div className="liked-profiles-container">
      <Header likedProfiles={likedProfiles} />
      <Container className="mt-4">
        <Row>
          <Col>
            <h2 className="text-center mb-4">Liked Profiles</h2>
          </Col>
        </Row>

        {likedProfiles.length === 0 ? (
          <Row className="mt-3">
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <p className="mb-0">No liked profiles yet.</p>
                  <small className="text-muted">Start discovering to like profiles!</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          likedProfiles.map((profile) => (
            <Row key={profile.id} className="justify-content-center mb-3">
              <Col md={10}> {/* Wider card */}
                <Card className="liked-profile-card shadow-lg">
                  <Row className="align-items-center no-gutters">
                  
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="h4">{profile.name}</Card.Title>
                        <Card.Text>
                          <strong>Age:</strong> {profile.age} <br />
                          <strong>Gender:</strong> {profile.gender} <br />
                          <strong>Location:</strong> {profile.location} <br />
                          <strong>Bio:</strong> {profile.bio}
                        </Card.Text>
                        {/* Remove Button */}
                        <Button
                          variant="danger"
                          onClick={() => handleRemove(profile.id)}
                           className="remove-button"
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          ))
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default LikedProfiles;
