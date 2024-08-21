import React, { useCallback, useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./RegisterFormMain.css";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";

const formType = "/regform_qr";

function RegisterForm() {
  const { tg, user } = useTelegram();

  const qrCallback = (text) => {
    const data = {
      form_type: formType,
      user_data: {
        user_id: user?.id,
        bot: user?.is_bot,
        user_name: user?.username,
      },
      text: text,
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
          <Link to="/regform_study">Register Study</Link>
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

export default RegisterForm;
