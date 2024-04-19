import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React from "react";
import { Flex } from "../styles/flex";
import { useRouter } from "next/router";

export interface User {
  id?: string;
  name?: string;
  nik?: string;
  email?: string;
  password?: string;
  roleId?: string;
}

export const initialUser: User = {
  name: "",
  nik: "",
  email: "",
  password: "",
  roleId: "",
};

interface Props {
  data: any[];
  reload: any
}
export const AddUser = ({ data, reload }: Props) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [user, setUser] = React.useState<User>(initialUser);

  const closeHandler = () => {
    setVisible(false);
    reload()
  };
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    const res = await fetch(`${process.env.BASE_URL_USER}/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      closeHandler();
    }
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Add User
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Add new user
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Name"
                name="name"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Employee Name"
                onChange={(e) => handleChange(e)}
              />
              <Input
                label="NIK"
                name="nik"
                clearable
                bordered
                fullWidth
                size="lg"
                onChange={(e) => handleChange(e)}
                placeholder="Nomor Induk Kepegawaian"
              />
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Email"
                name="email"
                clearable
                bordered
                fullWidth
                size="lg"
                onChange={(e) => handleChange(e)}
                placeholder="Email"
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Password"
                name="password"
                type={"password"}
                bordered
                fullWidth
                size="lg"
                onChange={(e) => handleChange(e)}
                placeholder="Password"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
