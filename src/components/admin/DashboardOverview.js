// Path: src/components/Admin/DashboardOverview.js
import React, { useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import { Pie, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./DashboardOverview.css"; // Add custom styles

const DashboardOverview = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState("");

  // Chart Data
  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Number of Users",
        backgroundColor: "#6f42c1",
        borderColor: "#6f42c1",
        borderWidth: 1,
        hoverBackgroundColor: "#563d7c",
        hoverBorderColor: "#563d7c",
        data: [65, 59, 80, 81, 56, 75],
      },
    ],
  };

  const pieChartData = {
    labels: ["Active Users", "Inactive Users", "New Users"],
    datasets: [
      {
        data: [70, 15, 15],
        backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
        hoverBackgroundColor: ["#218838", "#c82333", "#e0a800"],
      },
    ],
  };

  const lineChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "User Engagement",
        fill: true,
        lineTension: 0.4,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        pointBackgroundColor: "#007bff",
        pointBorderColor: "#fff",
        data: [50, 75, 60, 90],
      },
    ],
  };

  // Show Modal with Detailed Data
  const handleShowModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setShowModal(true);
  };

  return (
    <div>
      <h4 className="my-3 text-center">Dashboard Overview</h4>

      <Row>
        {/* Total Users */}
        <Col md={4}>
          <Card
            className="overview-card shadow-sm"
            onClick={() => handleShowModal("Total Users", "1200 Users Registered")}
          >
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h2 className="text-primary">1200</h2>
            </Card.Body>
          </Card>
        </Col>
        {/* Profiles Reviewed */}
        <Col md={4}>
          <Card
            className="overview-card shadow-sm"
            onClick={() =>
              handleShowModal("Profiles Reviewed", "450 Profiles Reviewed This Month")
            }
          >
            <Card.Body>
              <Card.Title>Profiles Reviewed</Card.Title>
              <h2 className="text-success">450</h2>
            </Card.Body>
          </Card>
        </Col>
        {/* Active Matches */}
        <Col md={4}>
          <Card
            className="overview-card shadow-sm"
            onClick={() =>
              handleShowModal("Active Matches", "320 Active Matches Found")
            }
          >
            <Card.Body>
              <Card.Title>Active Matches</Card.Title>
              <h2 className="text-warning">320</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card
            className="shadow-sm chart-card"
            onClick={() =>
              handleShowModal("User Distribution", "70% Active, 15% Inactive, 15% New Users")
            }
          >
            <Card.Body>
              <Card.Title className="text-center mb-3">User Distribution</Card.Title>
              <Pie data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow-sm chart-card"
            onClick={() =>
              handleShowModal("User Engagement", "Weekly Engagement Data Presented")
            }
          >
            <Card.Body>
              <Card.Title className="text-center mb-3">User Engagement</Card.Title>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            className="shadow-sm chart-card"
            onClick={() =>
              handleShowModal("User Growth", "User Growth Over 6 Months")
            }
          >
            <Card.Body>
              <Card.Title className="text-center mb-3">User Growth</Card.Title>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Detailed View */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardOverview;
