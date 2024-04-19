import React from "react";
import { Box } from "../styles/box";
import { Button, Card, Divider } from "@nextui-org/react";
import { AbsenceObj } from "../../pages";
import { useRouter } from "next/router";
interface Props {
  absenceData?: AbsenceObj;
  reload: any
}
const AbsenceComponent = ({ absenceData, reload }: Props) => {
  const router = useRouter();
  const handleAbsence = async () => {
    if (absenceData) {
      try {
        const res = await fetch(
          `${process.env.BASE_URL_USER}/user/absence/out`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          absenceData.timeOut = new Date().toDateString();
          reload()
        } else if (res.status === 401) {
          router.push("/login");
        }
      } catch (error) {
        console.error("error out absence: ", error);
      }
    } else {
      try {
        const res = await fetch(
          `${process.env.BASE_URL_USER}/user/absence/in`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 401) {
          router.push("/login");
        }
        reload()
      } catch (error) {
        console.error("error out absence: ", error);
      }
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
            {absenceData?.timeIn && !absenceData?.timeOut
              ? "Are you have Clock out?"
              : absenceData?.timeOut && absenceData?.timeIn
              ? "Your attendance today is complete"
              : "Are you have Clock in?"}
          </p>
        </Card.Header>
        <Divider />
        <Card.Body className="overflow-visible py-2">
          {absenceData?.timeIn && absenceData?.timeOut ? null : (
            <Button auto onClick={handleAbsence}>
              {absenceData?.timeIn && !absenceData?.timeOut
                ? "Clock out"
                : "Clock in"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Box>
  );
};
export default AbsenceComponent;
