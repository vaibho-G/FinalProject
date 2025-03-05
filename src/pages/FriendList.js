import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';

const FriendList = () => {
  const initialRequests = [
    { id: 1, name: 'John Doe', bio: 'Loves coding and coffee.' },
    { id: 2, name: 'Jane Smith', bio: 'Avid traveler and photographer.' },
    { id: 3, name: 'Mark Wilson', bio: 'Tech enthusiast and blogger.' },
  ];

  const [friendRequests, setFriendRequests] = useState(initialRequests);
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false); // State for chat modal
  const [currentChatFriend, setCurrentChatFriend] = useState(null); // Current friend for chat

  // Functions for CRUD operations
  const acceptRequest = (id) => {
    const acceptedProfile = friendRequests.find((profile) => profile.id === id);
    setFriends([...friends, acceptedProfile]);
    setFriendRequests(friendRequests.filter((profile) => profile.id !== id));
  };

  const deleteRequest = (id) => {
    setFriendRequests(friendRequests.filter((profile) => profile.id !== id));
  };

  const removeFriend = (id) => {
    setFriends(friends.filter((profile) => profile.id !== id));
  };

  const handleShowModal = (profile) => {
    setEditingProfile(profile);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingProfile(null);
    setShowModal(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedFriends = friends.map((friend) =>
      friend.id === editingProfile.id ? editingProfile : friend
    );
    setFriends(updatedFriends);
    handleCloseModal();
  };

  const handleOpenChat = (friend) => {
    setCurrentChatFriend(friend);
    setShowChatModal(true);
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
    setCurrentChatFriend(null);
  };

  return (
    <div className="friend-list-container">
      <Header />
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Friend Requests</h2>
          </Col>
        </Row>

        <Row>
          {friendRequests.length === 0 ? (
            <Col>
              <Alert variant="info">No requests pending.</Alert>
            </Col>
          ) : (
            friendRequests.map((profile) => (
              <Col key={profile.id} md={4} className="mb-4">
                <ProfileCard profile={profile} />
                <Button variant="success" onClick={() => acceptRequest(profile.id)}>
                  Accept
                </Button>
                <Button variant="danger" onClick={() => deleteRequest(profile.id)}>
                  Delete
                </Button>
              </Col>
            ))
          )}
        </Row>

        <Row className="mt-5">
          <Col>
            <h2>Friends</h2>
          </Col>
        </Row>

        <Row>
          {friends.length === 0 ? (
            <Col>
              <Alert variant="warning">No friends left.</Alert>
            </Col>
          ) : (
            friends.map((profile) => (
              <Col key={profile.id} md={4} className="mb-4">
                <ProfileCard profile={profile} />
                <Button variant="warning" onClick={() => handleShowModal(profile)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => removeFriend(profile.id)}>
                  Remove
                </Button>
                <Button variant="info" onClick={() => handleOpenChat(profile)}>
                  Chat
                </Button>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />

      {/* Modal for Editing Profiles */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProfile}>
          <Modal.Body>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingProfile?.name || ''}
                onChange={(e) =>
                  setEditingProfile({ ...editingProfile, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingProfile?.bio || ''}
                onChange={(e) =>
                  setEditingProfile({ ...editingProfile, bio: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Chat Modal */}
      <Modal show={showChatModal} onHide={handleCloseChat}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with {currentChatFriend?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="chat-header">
            <div className="chat-profile">
              {/* Circular profile picture with initial letter */}
              <div className="profile-circle">
                {currentChatFriend?.name[0]}
              </div>
              <span>{currentChatFriend?.name}</span>
            </div>
          </div>
          <div className="chat-messages">
            {/* Here you can display chat messages dynamically */}
          </div>
          <Form>
            <Form.Group controlId="chatInput">
              <Form.Control type="text" placeholder="Type a message..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChat}>
            Close
          </Button>
          <Button variant="primary">
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FriendList;
