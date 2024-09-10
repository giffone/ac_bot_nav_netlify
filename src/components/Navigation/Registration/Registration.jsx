import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Button/Button";

const formType = "type_qr";

function RegForm() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const orgs = urlParams.get("orgs");

  const { tg } = useTelegram();

  tg.BackButton.isVisible = false;

  const qrCallback = (text) => {
    const data = {
      form_type: formType,
      user_data: {
        qr_text: text,
      },
    };
    tg.sendData(JSON.stringify(data));
    return true;
  };

  const onClickQR = () => {
    tg.showScanQrPopup({ text: "Scan Campus QR Entrance" }, qrCallback);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/regform_guest">Register Guest</Link>
        </li>
        <li>
          <Link to={`/regform_student?orgs=${orgs}`}>Register Study</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Button onClick={onClickQR}>Scan QR</Button>
        </li>
      </ul>
    </nav>
  );
}

export default RegForm;
