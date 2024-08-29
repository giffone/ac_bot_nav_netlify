import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";

const formType = "type_create_invite_student";

const CreateInviteStudent = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        invite_code: inviteCode,
        invite_title: inviteTitle,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [inviteCode, inviteTitle, tg]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, [tg]);

  useEffect(() => {
    if (!inviteCode || !inviteTitle) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [inviteCode, inviteTitle, tg]);

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
