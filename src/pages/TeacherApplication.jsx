import { Link } from "react-router-dom";

function TeacherApplication() {
  const containerStyle = {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "24px",
  };

  const heroStyle = {
    background: "linear-gradient(180deg, #fffdf8 0%, #f8f4ea 100%)",
    border: "1px solid #d9c9a3",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 12px 30px rgba(50, 40, 20, 0.10)",
    marginBottom: "28px",
  };

  const titleStyle = {
    marginTop: 0,
    marginBottom: "10px",
    color: "#1f3a2d",
    fontSize: "38px",
    fontWeight: "700",
    letterSpacing: "0.4px",
  };

  const subtitleStyle = {
    marginTop: 0,
    marginBottom: "20px",
    color: "#5d4b2f",
    fontSize: "17px",
    lineHeight: 1.7,
    maxWidth: "760px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e5dcc7",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  };

  const cardTitleStyle = {
    marginTop: 0,
    marginBottom: "10px",
    color: "#1f3a2d",
    fontSize: "22px",
  };

  const cardTextStyle = {
    marginTop: 0,
    marginBottom: "18px",
    color: "#4b5563",
    lineHeight: 1.6,
    fontSize: "15px",
  };

  const primaryButtonStyle = {
    display: "inline-block",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#1f3a2d",
    color: "#ffffff",
    fontWeight: "700",
    boxShadow: "0 6px 16px rgba(31, 58, 45, 0.22)",
  };

  const secondaryButtonStyle = {
    display: "inline-block",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#f5efe2",
    color: "#5d4b2f",
    fontWeight: "700",
    border: "1px solid #d9c9a3",
  };

  const noteStyle = {
    marginTop: "26px",
    background: "#fff8e7",
    border: "1px solid #ecd9a0",
    borderRadius: "12px",
    padding: "16px 18px",
    color: "#6b4f1d",
    lineHeight: 1.6,
  };

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={titleStyle}>Teacher Application Portal</h1>
        <p style={subtitleStyle}>
          Welcome to the NCS teacher application portal. This space allows you
          to submit your application, review your current status, and stay
          informed throughout the selection process.
        </p>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Submit Application</h2>
            <p style={cardTextStyle}>
              Complete your teacher application form and submit your details for
              administrative review.
            </p>
            <Link to="/teacher-application/apply" style={primaryButtonStyle}>
              Apply Now
            </Link>
          </div>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Check Status</h2>
            <p style={cardTextStyle}>
              View the latest status of your submitted application, including
              whether it is pending, accepted, or rejected.
            </p>
            <Link to="/teacher-application/status" style={secondaryButtonStyle}>
              View My Status
            </Link>
          </div>
        </div>

        <div style={noteStyle}>
          <strong>Important:</strong> Only one active application may be under
          review at a time. If your application is still pending, a new
          submission will not be accepted until a decision has been made.
        </div>
      </div>
    </div>
  );
}

export default TeacherApplication;