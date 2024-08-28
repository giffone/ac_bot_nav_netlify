import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

function InvitesForm() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/approve_student">Approve student</Link>
          <Link to="/guest_list">Guest list</Link>
        </li>
      </ul>
    </nav>
  );
}

export default InvitesForm;
