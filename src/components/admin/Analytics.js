import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { Row, Col, Card } from "react-bootstrap";

const Analytics = () => {
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

  return (
    <div className="p-3 bg-light rounded shadow-sm">
      <h3 className="mb-4 text-center">User Analytics Dashboard</h3>

      {/* Cards and Charts */}
      <Row>
        {/* User Pie Chart */}
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-3">User Distribution</Card.Title>
              <Pie data={pieChartData} options={{ maintainAspectRatio: true }} />
            </Card.Body>
          </Card>
        </Col>

        {/* User Engagement Line Chart */}
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-3">User Engagement</Card.Title>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* User Growth Bar Chart */}
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-3">User Growth</Card.Title>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
                height={200}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary Section */}
      <Row>
        <Col md={4}>
          <Card className="text-center bg-success text-white mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Active Users</Card.Title>
              <h2>70%</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-warning text-dark mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>New Users</Card.Title>
              <h2>15%</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-danger text-white mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Inactive Users</Card.Title>
              <h2>15%</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;
