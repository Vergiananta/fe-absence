import { Col, Row, User, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IconButton, StyledBadge } from "./table.styled";
import { Absence } from "../../pages/dashboard";

interface Props {
  user: Absence;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const handleTimein = () => {
    const dateObject = new Date(user.timeIn);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const date = String(dateObject.getDate()).padStart(2, "0");
    const hours = String(dateObject.getHours()).padStart(2, "0");
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  const handleTimeout = () => {
    if (user.timeOut) {
      const dateObject = new Date(user.timeOut);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const date = String(dateObject.getDate()).padStart(2, "0");
      const hours = String(dateObject.getHours()).padStart(2, "0");
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${date} ${hours}:${minutes}`;
    }
    return `-`;
  };

  switch (columnKey) {
    case "name":
      return (
        <User
          squared
          src={
            "https://static.vecteezy.com/system/resources/previews/000/576/246/original/vector-sign-of-people-icon.jpg"
          }
          name={user.name}
          css={{ p: 0 }}
        >
          {user.nik}
        </User>
      );
    case "role":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {user.role_name}
            </Text>
          </Row>
        </Col>
      );
    case "clockIn":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {handleTimein()}
            </Text>
          </Row>
        </Col>
      );
    case "clockOut":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {handleTimeout()}
            </Text>
          </Row>
        </Col>
      );

  }
};
