import React, { useCallback, useEffect, useState } from "react";
import "../Forms.css";
import { useTelegram } from "../../../hooks/useTelegram";

const formType = "create_admin";

const CreateAdmin = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState("1");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        telegram_id: id,
        user_name: name,
        role_id: role,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [name, role]);

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
    if (!id || !name || !role) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [id, name, role]);

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Input data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"telegram id"}
        value={id}
        onChange={onChangeId}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"login or name"}
        value={name}
        onChange={onChangeName}
      />
      <select value={role} onChange={onChangeRole} className={"select"}>
        <option value={"1"}>admin</option>
        <option value={"2"}>campus security</option>
      </select>
    </div>
  );
};

export default CreateAdmin;
