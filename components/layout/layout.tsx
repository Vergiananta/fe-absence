import React, { useEffect, useState } from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";
import { WrapperLayout } from "./layout.styles";
import jwt from "jsonwebtoken";
interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [decoded, setDecoded] = React.useState<Object>();
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };
  const [token, setToken] = useState<string>();
  useEffect(() => {
    setToken(sessionStorage.getItem("token") as string);

    try {
      const decoded: any = jwt.decode(
        sessionStorage.getItem("token") as string
      );
      setDecoded(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  const auth = token ? true : false;
  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <WrapperLayout>
        {auth ? <SidebarWrapper decoded={decoded} /> : null}
        <NavbarWrapper auth={auth}>{children}</NavbarWrapper>
      </WrapperLayout>
    </SidebarContext.Provider>
  );
};
