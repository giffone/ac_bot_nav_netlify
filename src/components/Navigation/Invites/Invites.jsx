import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

function InvitesForm() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/guest_invite">Create Guest Invite Code</Link>
          <Link to="/guest_invite">Create Student Invite Code</Link>
          <Link to="/approve_student">Approve student</Link>
          <Link to="/guest_list">Guest invite list</Link>
        </li>
      </ul>
    </nav>
  );
}

export default InvitesForm;
