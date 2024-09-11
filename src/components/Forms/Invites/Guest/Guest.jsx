import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";

const formType = "type_create_invite_guest";

const CreateInviteGuest = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [inviteTitle, setInviteTitle] = useState("");
  const { mainB, sendData } = useTelegram();

  useBackButton("/adminform/invitesform");

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        invite_code: inviteCode,
        invite_title: inviteTitle,
      },
    };
    sendData(data);
  }, [inviteCode, inviteTitle, sendData]);

  useEffect(() => {
    mainB.setParams({
      text: "Send data",
    });

    mainB.onClick(onSendData);

    return () => {
      mainB.offClick(onSendData);
    };
  }, [onSendData, mainB]);

  useEffect(() => {
    if (!inviteCode || !inviteTitle) {
      mainB.hide();
    } else {
      mainB.show();
    }
  }, [inviteCode, inviteTitle, mainB]);

  const onChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };

  const onChangeInviteTitle = (e) => {
    setInviteTitle(e.target.value);
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
        className={"input"}
        type="text"
        placeholder={"for organization"}
        value={inviteTitle}
        onChange={onChangeInviteTitle}
      />
    </div>
  );
};

export default CreateInviteGuest;
