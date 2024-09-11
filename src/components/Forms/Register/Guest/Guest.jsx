import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";
import { useUrlParams } from "../../../../hooks/useUrlParams";

const formType = "type_guest_reg_form";

const GuestRegForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [org, setOrg] = useState("");
  const { sendData, mainBt } = useTelegram();
  const { getMenu } = useUrlParams();
  const orgs = getMenu("orgs");

  useBackButton("/regform");

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        first_name: firstName,
        last_name: lastName,
        invite_code: inviteCode,
        org_id: org,
      },
    };
    sendData(data);
  }, [firstName, lastName, inviteCode, org]);

  useEffect(() => {
    if (!firstName || !lastName || !inviteCode || !org) {
      mainBt.hide();
    } else {
      mainBt.show();
      mainBt.onClick(onSendData);

      return () => {
        mainBt.offClick(onSendData);
      };
    }
  }, [firstName, lastName, inviteCode, org]);

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };

  const onChangeOrg = (e) => {
    setOrg(e.target.value);
  };

  return (
    <div className={"regform"}>
      <h3>Enter your personal data and the code you were given</h3>
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
      <select value={org} onChange={onChangeOrg} className={"select"}>
        <option value="" disabled>
          Select organization
        </option>
        {orgs.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
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
