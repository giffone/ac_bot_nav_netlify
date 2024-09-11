import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";

const formType = "type_guest_reg_form";

const GuestRegForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [inviteCode, setInviteCode] = useState();
  const { tg } = useTelegram();

  useBackButton("/regform");

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });

    tg.MainButton.onClick(
      useCallback(() => {
        const data = {
          form_type: formType,
          user_data: {
            first_name: firstName,
            last_name: lastName,
            invite_code: inviteCode,
          },
        };
        tg.sendData(JSON.stringify(data));
      })
    );

    return () => {
      tg.MainButton.offClick();
    };
  }, [firstName, lastName, inviteCode, tg]);

  useEffect(() => {
    if (!firstName || !lastName || !inviteCode) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [firstName, lastName, inviteCode]);

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Input your personal data</h3>
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
        placeholder={"invite code"}
        value={inviteCode}
        onChange={onChangeInviteCode}
      />
    </div>
  );
};

export default GuestRegForm;
