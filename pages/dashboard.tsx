import type { NextPage } from "next";
import { Content } from "../components/home/content";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  return <Content />;
};

export default Home;
