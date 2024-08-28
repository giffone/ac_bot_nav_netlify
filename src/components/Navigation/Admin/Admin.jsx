import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";

const AdminForm = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const roles = urlParams.get("roles");
  const companies = urlParams.get("companies");

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/create_admin?roles=${roles}&companies=${companies}`}>
            Create admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminForm;
