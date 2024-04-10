import { NextPage } from "next";
import AbsenceComponent from "../components/absence";
import { useEffect, useState } from "react";

const Absence: NextPage = () => {
  const [absence, setAbsence] = useState();

  useEffect(() => {}, []);
  return <AbsenceComponent absenceData={absence} />;
};

export default Absence;
