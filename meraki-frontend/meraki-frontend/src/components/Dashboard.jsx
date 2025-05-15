import React from "react";

// Dashboard Components
import NgoList from "./NgoList";
import VolunteerList from "./VolunteerList";
import EventList from "./EventList";
import NotificationList from "./NotificationList";

// Styles for your theme
const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "1rem",
    padding: "1.5rem",
    backgroundColor: "#FAF9F6", // Soft White
    color: "#0D7377", // Teal
  },
  section: {
    gridColumn: "span 6",
    backgroundColor: "#FF6F61", // Warm Coral
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#FAF9F6", // Text color for contrast
  },
  header: {
    gridColumn: "span 12",
    marginBottom: "1rem",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1.5rem",
    backgroundColor: "#FFD700", // Golden Sunrise
    color: "#0D7377",
    borderRadius: "8px",
  },
};

const Dashboard = () => {
  return (
    <div style={styles.container}>
      {/* Dashboard Header */}
      <div style={styles.header}>
        <h1>Meraki Dashboard</h1>
        <p>Empowering Communities and Volunteers</p>
      </div>

      {/* NGO Section */}
      <div style={styles.section}>
        <h2>NGOs</h2>
        <NgoList />
      </div>

      {/* Volunteers Section */}
      <div style={styles.section}>
        <h2>Volunteers</h2>
        <VolunteerList />
      </div>

      {/* Events Section */}
      <div style={styles.section}>
        <h2>Upcoming Events</h2>
        <EventList />
      </div>

      {/* Notifications Section */}
      <div style={styles.section}>
        <h2>Notifications</h2>
        <NotificationList />
      </div>
    </div>
  );
};

export default Dashboard;
