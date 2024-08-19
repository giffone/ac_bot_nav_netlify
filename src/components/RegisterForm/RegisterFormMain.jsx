import React from "react";
import { Link } from "react-router-dom";
import "./RegisterFormMain.css";

function RegisterForm() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/regform_guest">Register Guest</Link>
        </li>
        <li>
          <Link to="/regform_study">Register Study</Link>
        </li>
      </ul>
    </nav>
  );
}

export default RegisterForm;
