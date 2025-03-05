import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Image, Alert } from 'react-bootstrap';
import { adminAPI } from '../../service/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: false,
    bio: '',
    preferredGender: false,
    preferredMinAge: 0,
    preferredMaxAge: 100,
    preferredMaxRange: 310,
    socialType: 'LOCAL',
    notification: true
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingUser(null);
    setError('');
  };

  const handleShow = (user = null) => {
    setEditingUser(user);
    setFormData(user || {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: false,
      bio: '',
      preferredGender: false,
      preferredMinAge: 0,
      preferredMaxAge: 100,
      preferredMaxRange: 310,
      socialType: 'LOCAL',
      notification: true
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editingUser) {
        await adminAPI.updateUser(editingUser.id, formData);
      } else {
        await adminAPI.createUser(formData);
      }
      fetchUsers(); // Refresh the list
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            setLoading(true);
            await adminAPI.deleteUser(id);
            setUsers(users.filter(user => user.id !== id)); // Optimistically remove user
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete user');
            // Refresh the list in case of error
            fetchUsers();
        } finally {
            setLoading(false);
        }
    }
};

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-3 bg-white shadow-sm rounded">
      <h4 className="mb-3">User Management</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        Add New User
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.gender ? 'Male' : 'Female'}</td>
              <td>{user.bio}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Gender (Check for Male)"
                name="gender"
                checked={formData.gender}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : (editingUser ? 'Update' : 'Add')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;