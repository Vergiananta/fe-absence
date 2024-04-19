import {
  Col,
  Row,
  User,
  Text,
  Tooltip,
  Modal,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { IconButton, StyledBadge } from "./table.styled";
import { UserAccount } from "../../pages/accounts";

interface Props {
  user: UserAccount;
  columnKey: string | React.Key;
  modal: any,
  deleteUser: any
}

export const RenderCell = ({ user, columnKey, modal, deleteUser }: Props) => {
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
    case "email":
      return (
        <Col>
          <Row>
            <Text b size={14} css={{ tt: "capitalize" }}>
              {user.email}
            </Text>
          </Row>
        </Col>
      );
    case "actions":
      return (
        <Row
          justify="center"
          align="center"
          css={{ gap: "$8", "@md": { gap: 0 } }}
        >
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user">
              <IconButton onClick={() => modal(user.id)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete user"
              color="error"
              onClick={() => deleteUser(user.id)}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );

    default:
      return;
  }
};
