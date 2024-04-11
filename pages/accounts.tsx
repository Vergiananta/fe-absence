import React, { useEffect } from "react";
import { Accounts } from "../components/accounts";
import { useRouter } from "next/router";

const accounts = () => {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  return <Accounts />;
};

export default accounts;
