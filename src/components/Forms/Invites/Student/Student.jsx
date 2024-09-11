import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";

const formType = "type_create_invite_student";

const CreateInviteStudent = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const { tg } = useTelegram();

  useBackButton("/adminform/invitesform");

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        invite_code: inviteCode,
        expire_date: expireDate,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [inviteCode, expireDate, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });

    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [tg]);

  useEffect(() => {
    if (!inviteCode || !expireDate) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [inviteCode, expireDate, tg]);

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
