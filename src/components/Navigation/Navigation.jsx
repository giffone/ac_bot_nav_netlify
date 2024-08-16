import React from "react";
import "./Navigation.css";
import { useTelegram } from "../../hooks/useTelegram";

// const formTypeAbout = "/about";
// const formTypeRegistration = "/regform";

const Navigation = () => {
  const { tg } = useTelegram();

  const onClickAbout = () => {
    // const data = {
    //   form_type: formTypeAbout,
    // };
    // tg.sendData(JSON.stringify(data));
    tg.close();
  };

  const onClickRegistration = () => {
    // const data = {
    //   form_type: formTypeRegistration,
    // };
    // tg.sendData(JSON.stringify(data));
    tg.close();
  };

  return (
    <>
      <Button onClick={onClickAbout}>About us</Button>
      <Button onClick={onClickRegistration}>Registration</Button>
    </>
  );
};

export default Navigation;
