import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";

const AdminForm = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const roles = urlParams.get("roles");
  const members = urlParams.get("members");

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/create_admin?roles=${roles}&members=${members}`}>
            Create admin
          </Link>
          <Link to="/invitesform">Invites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminForm;
