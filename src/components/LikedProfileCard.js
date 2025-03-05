import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const LikedProfileCard = ({ profile }) => {
  return (
    <Card className="mb-3 shadow" style={{ maxWidth: '800px', margin: 'auto' }}>
      <Row className="no-gutters align-items-center">
        {/* Profile Photo */}
        <Col md={4} sm={12}>
          <Card.Img
           
            alt={profile.name}
            style={{
              objectFit: 'cover',
              height: '100%',
              borderRadius: '5px 0 0 5px',
            }}
          />
        </Col>
        {/* Profile Details */}
        <Col md={8} sm={12}>
          <Card.Body>
            <Card.Title className="h4">{profile.name}</Card.Title>
            <Card.Text>
              <strong>Age:</strong> {profile.age} <br />
              <strong>Gender:</strong> {profile.gender} <br />
              <strong>Location:</strong> {profile.location} <br />
              <strong>Bio:</strong> {profile.bio}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default LikedProfileCard;
