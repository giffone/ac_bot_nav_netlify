import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";
import { useTelegram } from "../../../hooks/useTelegram";

const AdminForm = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const roles = urlParams.get("roles") || "";
  const orgs = urlParams.get("orgs") || "";

  const { tg } = useTelegram();

  tg.BackButton.isVisible = false;

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`create_admin?roles=${roles}&orgs=${orgs}`}>
              Create Admin
            </Link>
            <Link to="invitesform">Invites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminForm;
