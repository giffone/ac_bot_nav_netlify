import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";

const formType = "type_create_invite_student";

const CreateInviteStudent = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const { sendData, mainBt } = useTelegram();

  useBackButton("/adminform/invitesform");

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        invite_code: inviteCode,
        expire_date: expireDate,
      },
    };
    sendData(data);
  }, [inviteCode, expireDate]);

  useEffect(() => {
    if (!inviteCode || !expireDate) {
      mainBt.hide();
    } else {
      mainBt.show();
      mainBt.onClick(onSendData);

      return () => {
        mainBt.offClick(onSendData);
      };
    }
  }, [inviteCode, expireDate]);

  const onChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };

  const onChangeExpireDate = (e) => {
    setExpireDate(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Input data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"invite code"}
        value={inviteCode}
        onChange={onChangeInviteCode}
      />
      <input
        className="input"
        type="date"
        placeholder="expire date"
        value={expireDate}
        onChange={onChangeExpireDate}
      />
    </div>
  );
};

export default CreateInviteStudent;
