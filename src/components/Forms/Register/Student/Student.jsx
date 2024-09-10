import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Forms.css";
import { useTelegram } from "../../../../hooks/useTelegram";

const formType = "type_student_reg_form";

const StudentRegForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [org, setOrg] = useState("");
  const [orgs, setOrgs] = useState([]);
  const { tg } = useTelegram();
  const location = useLocation();
  const navigate = useNavigate();

  tg.BackButton.isVisible();
  tg.BackButton.show();

  const onClickBackButton = () => {
    navigate("/regform");
  };

  useEffect(() => {
    tg.BackButton.onClick(onClickBackButton);
    return () => {
      tg.BackButton.offClick(onClickBackButton);
    };
  }, [onClickBackButton, tg]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const orgsParam = urlParams.get("orgs");
    if (orgsParam) {
      const parsedOrgs = orgsParam.split(",").map((org) => {
        const [key, value] = org.split("=");
        return { key, value };
      });
      setOrgs(parsedOrgs);
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
        org_id: org,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [firstName, lastName, login, inviteCode, org, tg]);

  useEffect(() => {
    tg.MainButton.onClick(onSendData);
    // tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.MainButton.offClick(onSendData);
      // tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, [tg]);

  useEffect(() => {
    if (!firstName || !lastName || !login || !inviteCode || !org) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [login, firstName, lastName, inviteCode, org, tg]);

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
