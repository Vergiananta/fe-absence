import type { NextPage } from "next";
import { Content } from "../components/home/content";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {UserAccount} from "./accounts";
export interface Absence {
  id: string;
  timeIn: string;
  timeOut: string;
  name: string;
  nik: string;
  role_name: string;
}
interface Paging {
  pageNo: number;
  rowPage: number;
}
const Home = () => {
  const router = useRouter();
  const [data, setData] = useState<Absence[]>([]);
  const handleUserData = async () => {
    try {
      setData([]);
      const res = await fetch(`${process.env.BASE_URL_ABSENCE}/absence/list`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        const response = await res.json();
        let tempData: Absence[] = []
        for (let i = 0; i < response.data.length; i++) {
          await tempData.push(
            {
              id: response.data[i].id,
              timeIn: response.data[i].timeIn,
              timeOut: response.data[i].timeOut,
              name: response.data[i].user.name,
              nik: response.data[i].user.nik,
              role_name: response.data[i].user.role.name,
            },
          );
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

  return <Content users={data} />;
};

export default Home;
