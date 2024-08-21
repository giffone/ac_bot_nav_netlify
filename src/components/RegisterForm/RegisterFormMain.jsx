import React from "react";
import { Link } from "react-router-dom";
import "./RegisterFormMain.css";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";


function RegisterForm() {
  const { tg } = useTelegram();

  const onClickQR = ()=> {
    tg.showScanQrPopup()
  }

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
      <Button onClick={onClickQR}>Scan QR</Button>
    </nav>
  );
}

export default RegisterForm;
