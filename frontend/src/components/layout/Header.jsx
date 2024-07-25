import React from "react";

const Headers = () => {
  let authToken = localStorage.getItem("authToken");
  console.log(!authToken);
  return (
    <nav>
      <span className="app-title">MyNotes</span>
      {authToken !== null && (
        <button
          id="logout-btn"
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.reload();
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Headers;
