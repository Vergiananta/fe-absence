import { Button, Card, Divider, Input } from "@nextui-org/react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { FormEvent, useState, MouseEvent, MouseEventHandler } from "react";
import { useRouter } from "next/router";

interface LoginObj {
  nik?: string;
  password?: string;
}
export const LoginComponent = () => {
  const [login, setLogin] = useState<LoginObj>();
  const router = useRouter();
  const handleChange = (e: any) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    router.push("/");
  };
  return (
    <Box
      css={{
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Card
        style={{ width: "30%", border: "1px solid black", margin: "5% auto" }}
      >
        <Card.Header className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Login User</p>
        </Card.Header>
        <Divider />
        <Card.Body className="overflow-visible py-2">
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
                label="NIK"
                name="nik"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Nomor Induk Kepegawaian"
                onChange={(e) => handleChange(e)}
              />
              <Input
                label="Password"
                name="password"
                type={"password"}
                bordered
                fullWidth
                size="lg"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
              />
            </Flex>
          </Flex>
        </Card.Body>
        <Divider css={{ my: "$5" }} />
        <Card.Footer>
          <Button auto onClick={handleSubmit}>
            Login
          </Button>
        </Card.Footer>
      </Card>
    </Box>
  );
};
