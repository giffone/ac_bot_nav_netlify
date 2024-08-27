import React from "react";
import { Link } from "react-router-dom";
import "../Navigation.css";

function AdminForm() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/create_admin">Create admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminForm;
