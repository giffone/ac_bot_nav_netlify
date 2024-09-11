import React, { useCallback, useEffect, useState } from "react";
import "../Forms.css";
import { useTelegram } from "../../../hooks/useTelegram";
import { useBackButton } from "../../../hooks/useBackButton";
import { useUrlParams } from "../../../hooks/useUrlParams";

const formType = "type_create_admin";

const CreateAdminForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [org, setOrg] = useState("");
  const { mainBt, sendData } = useTelegram();
  const { getMenu } = useUrlParams();
  const orgMenu = getMenu("orgs");
  const roleMenu = getMenu("roles");

  useBackButton("/adminform");

  const onSendData = useCallback(() => {
    const data = {
      form_type: formType,
      user_data: {
        telegram_id: id,
        user_name: name,
        role_id: role,
        organization_id: org,
      },
    };
    sendData(data);
  }, [id, name, role, org]);

  useEffect(() => {
    if (!id || !name || !role || !org) {
      mainBt.hide();
    } else {
      mainBt.show();
      mainBt.onClick(onSendData);

      return () => {
        mainBt.offClick(onSendData);
      };
    }
  }, [id, name, role, org]);

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const onChangeOrg = (e) => {
    setOrg(e.target.value);
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
        <option value="" disabled>
          Select role
        </option>
        {roleMenu.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <select value={org} onChange={onChangeOrg} className={"select"}>
        <option value="" disabled>
          Select organization
        </option>
        {orgMenu.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CreateAdminForm;
