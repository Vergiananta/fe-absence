import { NextPage } from "next";
import AbsenceComponent from "../components/absence";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Absence: NextPage = () => {
  const [absence, setAbsence] = useState();
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  return <AbsenceComponent absenceData={absence} />;
};

export default Absence;
