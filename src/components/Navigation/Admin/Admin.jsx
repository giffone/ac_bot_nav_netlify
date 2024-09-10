import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";

const AdminForm = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const roles = urlParams.get("roles");
  const orgs = urlParams.get("orgs");

  tg.BackButton.isVisible = false;

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/create_admin?roles=${roles}&orgs=${orgs}`}>
            Create admin
          </Link>
          <Link to="/invitesform">Invites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminForm;
