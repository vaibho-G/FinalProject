//  
import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import styles from '../css/Profile.module.css'; // Assuming CSS Modules for additional styling

const ProfileCard = ({ profile }) => {
  const imagePath = `/profiles/${profile.image}`;

  return (
    <Card className={styles['profile-card']}>
      {/* Profile Image */}
      <Card.Body>
        <Row>
          <Col xs={4} md={3}>
            <Image 
              src={imagePath}
              alt={profile.name} 
              roundedCircle
              className={styles['profile-img']}
            />
          </Col>

          {/* Profile Info */}
          <Col xs={8} md={9}>
            <Card.Title>{profile.name}, {profile.age}</Card.Title>
            <Card.Text>{profile.bio}</Card.Text>
            <Card.Text><strong>Location:</strong> {profile.location}</Card.Text>
            <Card.Text><strong>Match:</strong> {profile.matchPercentage}%</Card.Text>
          </Col>
        </Row>
      </Card.Body>

      {/* Profile Details */}
      <Card.Body>
        <Row>
          <Col xs={6}>
            <Card.Text><strong>Gender:</strong> {profile.details?.gender || 'N/A'}</Card.Text>
            <Card.Text><strong>Orientation:</strong> {profile.details?.orientation || 'N/A'}</Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text><strong>Status:</strong> {profile.details?.status || 'N/A'}</Card.Text>
            <Card.Text><strong>Looking for:</strong> {profile.details?.lookingFor || 'N/A'}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
