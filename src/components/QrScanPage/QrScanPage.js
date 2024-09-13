import React, { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";

const QrScanPage = () => {
  const { tg, sendData } = useTelegram();

  const qrCallback = (text) => {
    const data = {
      form_type: "type_qr",
      user_data: {
        qr_text: text,
      },
    };
    sendData(data);
    return true;
  };

  useEffect(() => {
    tg.showScanQrPopup({ text: "Scan Campus QR Entrance" }, qrCallback);
  }, [tg]);

  return null;
};

export default QrScanPage;
