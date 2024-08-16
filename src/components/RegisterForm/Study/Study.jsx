import React, { useCallback, useEffect, useState } from "react";
import "../RegisterForm.css";
import { useTelegram } from "../../../hooks/useTelegram";

const formType = "/regform_study";

const RegisterFormStudy = () => {
  const [firstName, SetFirstName] = useState();
  const [lastName, SetLastName] = useState();
  const [intraLogin, SetIntraLogin] = useState();
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        first_name: firstName,
        last_name: lastName,
        intra_login: intraLogin,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [ firstName, lastName, intraLogin]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, []);

  useEffect(() => {
    if ( !firstName || !lastName || !intraLogin) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [intraLogin, firstName, lastName]);

  const onChangeFirstName = (e) => {
    SetFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    SetLastName(e.target.value);
  };

  const onChangeIntraLogin = (e) => {
    SetIntraLogin(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Input you personal data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"first name"}
        value={firstName}
        onChange={onChangeFirstName}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"last name"}
        value={lastName}
        onChange={onChangeLastName}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"intra login"}
        value={intraLogin}
        onChange={onChangeIntraLogin}
      />
    </div>
  );
};

export default RegisterFormStudy;
