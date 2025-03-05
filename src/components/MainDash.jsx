import React, { useState } from "react";

import "../css/MainDash.css"
const MainDash = ({ activeOption, users, setUsers, pendingUsers, setPendingUsers }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleApproveUser = (userId) => {
    const userToApprove = pendingUsers.find((user) => user.id === userId);
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
    setUsers([...users, { ...userToApprove, isApproved: true }]);
  };

  const handleBlockUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isBlocked: true } : user
      )
    );
  };

  const handleUnblockUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isBlocked: false } : user
      )
    );
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  const renderUsers = (userList, isPending = false) => (
    <div className="grid-container">
      {userList.map((user) => (
        <div className="user-tile" key={user.id}>
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>DOB:</strong> {user.dob}</p>
            {activeOption === "allUsers" && (
              <>
                <button onClick={() => handleBlockUser(user.id)}>Block</button>
                <button onClick={() => handleEditUser(user)}>Edit</button>
              </>
            )}
            {activeOption === "blockedUsers" && (
              <button onClick={() => handleUnblockUser(user.id)}>Unblock</button>
            )}
            {isPending && (
              <button onClick={() => handleApproveUser(user.id)}>Approve</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="MainDash">
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <>
          <h1>
            {activeOption === "allUsers"
              ? "All Users"
              : activeOption === "blockedUsers"
              ? "Blocked Users"
              : "New Registrants"}
          </h1>
          {activeOption === "allUsers" && renderUsers(users.filter((u) => u.isApproved && !u.isBlocked))}
          {activeOption === "blockedUsers" && renderUsers(users.filter((u) => u.isBlocked))}
          {activeOption === "pendingUsers" && renderUsers(pendingUsers, true)}
        </>
      )}
    </div>
  );
};

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="edit-form">
      <h2>Edit User</h2>
      <label>
        Name: <input name="name" value={updatedUser.name} onChange={handleChange} />
      </label>
      <label>
        Email: <input name="email" value={updatedUser.email} onChange={handleChange} />
      </label>
      <label>
        Mobile: <input name="mobile" value={updatedUser.mobile} onChange={handleChange} />
      </label>
      <label>
        Bio: <textarea name="bio" value={updatedUser.bio} onChange={handleChange} />
      </label>
      <label>
        DOB: <input name="dob" value={updatedUser.dob} onChange={handleChange} type="date" />
      </label>
      <button onClick={() => onSave(updatedUser)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default MainDash;
