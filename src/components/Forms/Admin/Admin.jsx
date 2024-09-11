import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Forms.css";
import { useTelegram } from "../../../hooks/useTelegram";
import { useBackButton } from "../../../hooks/useBackButton";

const formType = "type_create_admin";

const CreateAdminForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [org, setOrg] = useState("");
  const [roles, setRoles] = useState([]);
  const [orgMenu, setOrgMenu] = useState([]);
  const { mainBt, sendData } = useTelegram();
  const location = useLocation();

  useBackButton("/adminform");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const rolesParam = urlParams.get("roles");
    if (rolesParam) {
      const menu = rolesParam.split(",").map((item) => {
        const [key, value] = item.split("=");
        return { key, value };
      });
      setRoles(menu);
    }

    const orgsParam = urlParams.get("orgs");
    if (orgsParam) {
      const menu = orgsParam.split(",").map((item) => {
        const [key, value] = item.split("=");
        return { key, value };
      });
      setOrgMenu(menu);
    }
  }, [location.search]);

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
        {roles.map(({ key, value }) => (
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
