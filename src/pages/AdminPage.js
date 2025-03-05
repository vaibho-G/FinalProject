import React, { useState } from "react";


import MainDash from "../components/MainDash";
import AdminHeader from "../components/AdminHeader";




function AdminPage() {
  const [activeOption, setActiveOption] = useState("allUsers");
  const [users, setUsers] = useState([
    // Predefined users
    { id: 1, name: "Vaibhav", email: "veb@example.com", mobile: "1234567890", bio: "Loves tech", dob: "1990-01-01", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isApproved: true, isBlocked: false },
    { id: 2, name: "Bhushan", email: "bhu@example.com", mobile: "9876543210", bio: "Avid reader", dob: "1992-05-12", avatar: "https://randomuser.me/api/portraits/women/2.jpg", isApproved: true, isBlocked: true },
    { id: 4, name: "Vaibhav2", email: "veb2@example.com", mobile: "1222567890", bio: "Loves tech", dob: "2000-01-01", avatar: "https://randomuser.me/api/portraits/men/1.jpg", isApproved: true, isBlocked: false },
  ]);
  const [pendingUsers, setPendingUsers] = useState([
    { id: 3, name: "Akash", email: "ak@example.com", mobile: "9876543210", bio: "Pending approval", dob: "2000-02-14", avatar: "https://randomuser.me/api/portraits/men/3.jpg", isApproved: false, isBlocked: false },
  ]);

  return (
    <div className="App">
      <div className="p1">
    
      <AdminHeader setActiveOption={setActiveOption} />
      </div>
      <div className="p2">
      <MainDash
        activeOption={activeOption}
        users={users}
        setUsers={setUsers}
        pendingUsers={pendingUsers}
        setPendingUsers={setPendingUsers}
      />
      </div>
    </div>
  );
}

export default AdminPage;
