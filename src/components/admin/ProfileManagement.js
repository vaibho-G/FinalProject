import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

const ProfileManagement = () => {
  const profiles = [
        {
          id: 1,
          name: 'Akash',
          age: 23,
          location: 'Bhopal',
          bio: 'Loves designing and traveling.',
          image: 'https://via.placeholder.com/50',
          gender: 'Male',
          preferredGender: 'Female',
        },
        {
          id: 2,
          name: 'Reena',
          age: 22,
          location: 'Mumbai',
          bio: 'A Nature lover',
          image: 'https://via.placeholder.com/50',
          gender: 'Female',
          preferredGender: 'Male',
        },
      
  ];

  return (
    <div>
      <h4 className="my-3">Profile Management</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Location</th>
            <th>Gender</th>
            <th>Preferred Gender</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>
                <Image src={profile.image} rounded width="50" height="50" />
              </td>
              <td>{profile.name}</td>
              <td>{profile.age}</td>
              <td>{profile.location}</td>
              <td>{profile.gender}</td>
              <td>{profile.preferredGender}</td>
              <td>{profile.bio}</td>
              <td>
                <Button variant="success" size="sm" className="me-2">
                  Approve
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProfileManagement;
