import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Forms.css";
import { useTelegram } from "../../../hooks/useTelegram";

const formType = "type_create_admin";

const CreateAdminForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [member, setMember] = useState("");
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
  const { tg } = useTelegram();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const rolesParam = urlParams.get("roles");
    if (rolesParam) {
      const parsedRoles = rolesParam.split(",").map((role) => {
        const [key, value] = role.split("=");
        return { key, value };
      });
      setRoles(parsedRoles);
    }

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
        telegram_id: id,
        user_name: name,
        role_id: role,
        member_id: member,
      },
    };
    tg.sendData(JSON.stringify(data));
  }, [id, name, role, member, tg]);

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
    if (!id || !name || !role || !member) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [id, name, role, member, tg]);

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const onChangeMember = (e) => {
    setMember(e.target.value);
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

export default CreateAdminForm;
