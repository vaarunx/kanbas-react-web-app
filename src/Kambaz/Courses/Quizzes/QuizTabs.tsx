import React, { useState } from "react";

const QuizTabs = () => {
  const [activeTab, setActiveTab] = useState("Details");

  return (
    <div className="mb-3">
      {/* Tabs Navigation */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
            onClick={() => setActiveTab("Details")}
            href="#"
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
            onClick={() => setActiveTab("Questions")}
            href="#"
          >
            Questions
          </a>
        </li>
      </ul>

      {/* Content for Active Tab */}
      <div className="mt-3">
        {activeTab === "Details" && (
          <div>
            <h5>Details Tab Content</h5>
            <p>This is the content for the Details tab.</p>
          </div>
        )}
        {activeTab === "Questions" && (
          <div>
            <h5>Questions Tab Content</h5>
            <p>This is the content for the Questions tab.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTabs;
