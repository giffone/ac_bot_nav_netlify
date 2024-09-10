import React from "react";
import { Link } from "react-router-dom";
import "../../Navigation.css";

function InvitesForm() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="invite_guest">Create an invitation code for guest</Link>
          <Link to="invite_student">Create an invitation code for students</Link>
          <Link to="approve_student">Approve the student list</Link>
          <Link to="guest_list">Guest invite list</Link>
        </li>
      </ul>
    </nav>
  );
}

export default InvitesForm;
