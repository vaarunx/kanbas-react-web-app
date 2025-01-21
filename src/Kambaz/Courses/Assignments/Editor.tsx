export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3>
        <label htmlFor="wd-name">Assignment Name</label>
      </h3>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select name="grouping" id="wd-group">
              <option value="assignments">Assignments</option>
              <option value="projects">Projects</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select name="grouping" id="wd-display-grade-as">
              <option value="percentage">Percentage</option>
              <option value="score">Score</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select name="wd-submission-type" id="wd-submission-type">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </td>
        </tr>
        <tr>
          <td />
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Online Entry Options</label>
            <br />
          </td>
        </tr>
        <tr>
          <td />
          <td align="left" valign="top">
            <input type="checkbox" id="wd-text-entry" name="text-entry" />
            <label htmlFor="text-entry">Text Entry</label>
            <br />
            <input type="checkbox" id="wd-website-url" name="website-url" />
            <label htmlFor="website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              id="wd-media-recordings"
              name="media-recordings"
            />
            <label htmlFor="media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              id="wd-student-annotation"
              name="student-annotation"
            />
            <label htmlFor="student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" id="wd-file-upload" name="file-uploads" />
            <label htmlFor="file-uploads">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label> <br />
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <tr>
          <td />
          <td align="left" valign="top">
            <label htmlFor="wd-due-date">Due</label> <br />
            <input type="date" value="2024-01-21" id="wd-due-date" /> <br />
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <label htmlFor="wd-available-until">Until</label>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <input type="date" value="2024-01-21" id="wd-available-from" />
          </td>
          <td>
            <input type="date" value="2024-03-27" id="wd-available-until" />
            <br />
          </td>
        </tr>
      </table>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button type="button">Cancel</button>
        <button type="button">Save</button>
      </div>
    </div>
  );
}
