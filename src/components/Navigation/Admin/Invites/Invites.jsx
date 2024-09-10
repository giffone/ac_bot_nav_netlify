import React from "react";
import { Link } from "react-router-dom";
import "../../Navigation.css";
import { useBackButton } from "../../../../hooks/useBackButton";

function InvitesForm() {
  useBackButton("/adminform");

  return (
    <nav>
      <ul>
        <li>
          <Link to="guest">Create an invitation code for guest</Link>
          <Link to="student">Create an invitation code for students</Link>
          <Link to="student/approve">Approve the student list</Link>
          <Link to="guest/list">Guest invite list</Link>
        </li>
      </ul>
    </nav>
  );
}

export default InvitesForm;
