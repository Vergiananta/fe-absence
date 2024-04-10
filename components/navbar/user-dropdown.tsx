import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
interface Props {
  auth: boolean;
}
export const UserDropdown = ({ auth }: Props) => {
  return (
    <Dropdown placement="bottom-right">
      <Navbar.Item>
        <Dropdown.Trigger>
          <Avatar
            bordered
            as="button"
            color="secondary"
            size="md"
            src="https://theme.zdassets.com/theme_assets/11761347/21f68e58e5c72d9d2fc808927bac4cb82ebab87f.jpg"
          />
        </Dropdown.Trigger>
      </Navbar.Item>
      {auth ? (
        <Dropdown.Menu
          aria-label="User menu actions"
          onAction={(actionKey) => console.log({ actionKey })}
        >
          <Dropdown.Item key="profile" css={{ height: "$18" }}>
            <Text b color="inherit" css={{ d: "flex" }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              zoey@example.com
            </Text>
          </Dropdown.Item>

          <Dropdown.Item key="logout" withDivider color="error">
            Log Out
          </Dropdown.Item>
          <Dropdown.Item key="switch" withDivider>
            <DarkModeSwitch />
          </Dropdown.Item>
        </Dropdown.Menu>
      ) : null}
    </Dropdown>
  );
};
