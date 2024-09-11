import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigation.css";
import { useTelegram } from "../../../hooks/useTelegram";
import Button from "../../Button/Button";

const formType = "type_qr";

function RegForm() {
  const location = useLocation();

  const { backB, sendData } = useTelegram();

  backB.isVisible = false;

  const qrCallback = (text) => {
    const data = {
      form_type: formType,
      user_data: {
        qr_text: text,
      },
    };
    sendData(data);
    return true;
  };

  const onClickQR = () => {
    tg.showScanQrPopup({ text: "Scan Campus QR Entrance" }, qrCallback);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to={`guest${location.search}`}>Registration as guest</Link>
        </li>
        <li>
          <Link to={`student${location.search}`}>Registration as student</Link>
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
