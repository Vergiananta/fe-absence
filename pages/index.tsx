import { GetServerSideProps, NextApiRequest, NextPage } from "next";
import AbsenceComponent from "../components/absence";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Context } from "vm";

export interface AbsenceObj {
  id?: string;
  timeIn: string;
  timeOut: string;
}

const Absence: NextPage = () => {
  const [data, setData] = useState<AbsenceObj>();

  const router = useRouter();
  const handleUserData = async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL_ABSENCE}/absence`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        try {
          const absenceData = await res.json();
          setData(absenceData.data);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
        }
      } else if (res.status === 401) {
        router.push("/login");
      }
    } catch (error) {
      console.error("error absence: ", error);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
    handleUserData();
  }, []);
  return <AbsenceComponent absenceData={data} reload={handleUserData}/>;
};
export default Absence;
