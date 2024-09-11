import React, { useCallback, useEffect, useState } from "react";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";
import { useBackButton } from "../../../../hooks/useBackButton";
import { useUrlParams } from "../../../../hooks/useUrlParams";

const formType = "type_student_reg_form";

const StudentRegForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
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
        login: login,
        invite_code: inviteCode,
        org_id: org,
      },
    };
    sendData(data);
  }, [firstName, lastName, login, inviteCode, org]);

  useEffect(() => {
    if (!firstName || !lastName || !login || !inviteCode || !org) {
      mainBt.hide();
    } else {
      mainBt.show();
      mainBt.onClick(onSendData);

      return () => {
        mainBt.offClick(onSendData);
      };
    }
  }, [firstName, lastName, login, inviteCode, org]);

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
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
      <input
        className={"input"}
        type="text"
        placeholder={"login/email on platform"}
        value={login}
        onChange={onChangeLogin}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"invite code"}
        value={inviteCode}
        onChange={onChangeInviteCode}
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
    </div>
  );
};

export default StudentRegForm;
