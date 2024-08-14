import React from "react";
import "./About.css";

const About = () => {
  const { tg } = useTelegram();

  const onClick = () => {
    tg.sendData()
    tg.close()
  }

  return <Button onClick={onClick}>About</Button>;
};

export default About;
