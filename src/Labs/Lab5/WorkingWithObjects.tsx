import React, { useState } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS5610",
    name: "Web Development",
    description: "Covers HTML, CSS, JS, React, and Node.js",
    course: "Web Dev Spring 2025",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Assignment Properties</h4>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <br />
      <FormControl
        className="w-75 mb-2"
        type="number"
        placeholder="Enter new score"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />
      <a
        className="btn btn-secondary mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <br />
      <label className="me-2">Completed:</label>
      <input
        type="checkbox"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <a
        className="btn btn-secondary ms-3 mb-3"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <hr />

      <h4>Modifying Module Properties</h4>
      <FormControl
        className="w-75 mb-2"
        placeholder="New Module Name"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        className="btn btn-primary mb-3"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <br />
      <FormControl
        className="w-75 mb-2"
        placeholder="New Module Description"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
      />
      <a
        className="btn btn-primary mb-3"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>

      <hr />

      <h4>Retrieving Assignment</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-outline-primary mb-3"
        href={`${ASSIGNMENT_API_URL}`}
      >
        Get Assignment
      </a>
      <br />
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-outline-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title`}
      >
        Get Assignment Title
      </a>

      <hr />

      <h4>Retrieving Module</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-outline-success mb-3"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <br />
      <a
        id="wd-retrieve-module-name"
        className="btn btn-outline-success mb-3"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
    </div>
  );
}
