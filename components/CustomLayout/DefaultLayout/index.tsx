"use client";

import React, { useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import Wrapper from "../Wrapper";
import MobileNav from "../../MobileNav";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import useIsMobile from "@/hooks/useIsMobile";
import { useRecoilState, useSetRecoilState } from "recoil";
import { collapseState, isMobileState, menuState } from "@/recoil/states";

const { Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const mobile = useIsMobile();
  const router = useRouter();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  return (
    <>
      <Header />
      <Wrapper>
        <Content style={{ background: "white" }}>{children}</Content>
      </Wrapper>
      <Footer />
      {isMobile && <MobileNav />}
    </>
  );
};

export default DefaultLayout;

const fetchMenuData = async () => {
  const res = await fetch(`/api/menu`, {
    method: "POST",
  });
  const result = await res.json();

  return result?.data;
};
