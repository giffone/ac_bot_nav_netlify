import React from "react";
import "./Navigation.css";

const Navigation = () => {
  const { tg } = useTelegram();

  const onClick = () => {
    tg.sendData()
    tg.close()
  }

  return <Button onClick={onClick}>About</Button>;
};

export default Navigation;
