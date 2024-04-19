import {Button, Divider, Input, Modal, Table, Text} from "@nextui-org/react";
import React from "react";
import { Box } from "../styles/box";
import { columnsAccount } from "./data";
import { RenderCell } from "./render-cell";
import {UserAccount} from "../../pages/accounts";
import {initialUser, User} from "../accounts/add-user";
import {Flex} from "../styles/flex";
import {router} from "next/client";

interface Props {
    users: UserAccount[]
    reload: any
}
export const TableWrapper = ({ users , reload}: Props) => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<User>(initialUser);

    const handler = async (id: string) => {
        const res = await fetch(`${process.env.BASE_URL_USER}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
        if (res.ok) {
            const myUser = await res.json()
            setUser({
                id: myUser.id,
                name: myUser.name,
                nik: myUser.nik,
                email: myUser.email
            })
            setVisible(true)
        }
    };

    const closeHandler = () => {
        setVisible(false);
    };
    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${process.env.BASE_URL_USER}/user`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            if (res.ok) {
                reload()
                setVisible(false)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${process.env.BASE_URL_USER}/user/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                }
            )
            reload()
        } catch (e) {
            console.error(e)
        }
    }
  return (
    <Box
      css={{
        "& .nextui-table-container": {
          boxShadow: "none",
        },
      }}
    >
        {/*Modal Edit User*/}
        <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
    >
        <Modal.Header css={{ justifyContent: "start" }}>
            <Text id="modal-title" h4>
                Edit user
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
                        value={user.name}
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
                        value={user.nik}
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
                        value={user.email}
                        clearable
                        bordered
                        fullWidth
                        size="lg"
                        onChange={(e) => handleChange(e)}
                        placeholder="Email"
                    />
                </Flex>
            </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
            <Button auto onClick={handleSubmit}>
                Edit User
            </Button>
        </Modal.Footer>
    </Modal>
        {/*End Modal Edit User*/}
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
      >
        <Table.Header columns={columnsAccount}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {(item) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>
                  {RenderCell({ user: item, columnKey: columnKey , modal: handler, deleteUser: handleDelete})}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={8}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </Box>
  );
};
