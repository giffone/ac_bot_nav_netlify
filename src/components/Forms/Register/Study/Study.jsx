import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";

const formType = "type_study";

const RegisterFormStudy = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [member, setMember] = useState("");
  const [members, setMembers] = useState([]);
  const { tg } = useTelegram();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const membersParam = urlParams.get("members");
    if (membersParam) {
      const parsedMembers = membersParam.split(",").map((member) => {
        const [key, value] = member.split("=");
        return { key, value };
      });
      setMembers(parsedMembers);
    }
  }, [location.search]);

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        first_name: firstName,
        last_name: lastName,
        login: login,
        invite_code: inviteCode,
        member_id: member,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [ firstName, lastName, login, inviteCode, member, tg]);

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
    if ( !firstName || !lastName || !login || !inviteCode || !member) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [login, firstName, lastName, inviteCode, member, tg]);

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

  const onChangeMember = (e) => {
    setMember(e.target.value);
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
      <select value={member} onChange={onChangeMember} className={"select"}>
        <option value="" disabled>
          Select member
        </option>
        {members.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegisterFormStudy;
