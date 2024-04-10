import React from "react";
import { Box } from "../styles/box";
import { Button, Card, Divider } from "@nextui-org/react";
interface Props {
  absenceData: any;
}
const AbsenceComponent = ({ absenceData }: Props) => {
  const handleAbsence = () => {
    if (absenceData) {
    } else {
    }
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
          <p className="text-tiny uppercase font-bold text-center">
            Are you have {absenceData ? "Clock out?" : "Clock in?"}
          </p>
        </Card.Header>
        <Divider />
        <Card.Body className="overflow-visible py-2">
          <Button auto onClick={handleAbsence}>
            {absenceData ? "Clock out" : "Clock in"}
          </Button>
        </Card.Body>
      </Card>
    </Box>
  );
};
export default AbsenceComponent;
