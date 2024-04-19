import React, { useEffect, useState } from "react";
import { Accounts } from "../components/accounts";
import { useRouter } from "next/router";
import { Absence } from "./dashboard";
import { GetStaticProps } from "next";
interface Props {
  dataRole: any; // Type your data here
}

export interface UserAccount {
  id: string;
  nik: string;
  name: string;
  email: string;
  role_name: string;
}
const accounts = ({ dataRole }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<UserAccount[]>([]);
  const handleUserData = async () => {
    try {
      setData([]);
      const res = await fetch(`${process.env.BASE_URL_USER}/user/list?role=STAFF`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        const response = await res.json();
        const tempData: UserAccount[] = []
        for (let i = 0; i < response.data.length; i++) {
          await tempData.push({
            id: response.data[i].id,
            email: response.data[i].email,
            name: response.data[i].name,
            nik: response.data[i].nik,
            role_name: response.data[i].role.name,
          })
        }
        setData(tempData)
      } else if (res.status === 401) {
        sessionStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.error("error fetch: ", error);
    }
  };
  useEffect(() => {
    setData([]);
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
    handleUserData();
  }, []);
  return <Accounts users={data} data={dataRole} reload={handleUserData} />;
};

export default accounts;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(`${process.env.BASE_URL_USER}/user/roles`);
  const data = await res.json();

  return {
    props: {
      dataRole: data,
    },
  };
};
