import React, {navigate}from "react";
import "../css/AdminHeader.css"
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const AdminHeader = ({ setActiveOption }) => {
  return (
    
  
    <div className="Sidebar"> 
 <ButtonGroup aria-label="Basic example">

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Admin Dashboard</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><a class="nav-link active" aria-current="page" href="#"><Button variant="secondary" onClick={() => setActiveOption("allUsers")}>All Users</Button></a></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><a class="nav-link" href="#">   <Button variant="secondary" onClick={() => setActiveOption("pendingUsers")}>
        New Registrants
      </Button></a></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><a class="nav-link" href="#"> <Button variant="secondary" onClick={() => setActiveOption("blockedUsers")}>Blocked Users</Button>
    </a></a>
        </li>
        <li>
        <Button variant="outline-secondary" onClick={() => navigate(-1)} className="back-btn">Back</Button>

        </li>
        
      </ul>
    </div>
  </div>

</nav>
      </ButtonGroup>


    </div>
   
  );
};


export default AdminHeader;
