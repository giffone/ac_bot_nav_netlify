import React, { useCallback, useEffect, useState } from "react";
import "./RegisterForm.css";
import { useTelegram } from "../../hooks/useTelegram";

const formType = "/regform";

const RegisterForm = () => {
  const [login, SetLogin] = useState();
  const [firstName, SetFirstName] = useState();
  const [lastName, SetLastName] = useState();
  const { tg, user } = useTelegram();
  const userId = user?.id

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        user_id: userId,
        user_name: user?.username,
        login: login,
        first_name: firstName,
        last_name: lastName,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [login, firstName, lastName]);

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
    if (!login || !firstName || !lastName) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [login, firstName, lastName]);

  const onChangeLogin = (e) => {
    SetLogin(e.target.value);
  };

  const onChangeFirstName = (e) => {
    SetFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    SetLastName(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Input you personal data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"cadet login"}
        value={login}
        onChange={onChangeLogin}
      />
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
    </div>
  );
};

export default RegisterForm;
