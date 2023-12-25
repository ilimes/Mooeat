"use client";

import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Wrapper from "../Wrapper";
import MobileNav from "../../MobileNav/MobileNav";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import useIsMobile from "@/hooks/useIsMobile";
import { useRecoilState, useSetRecoilState } from "recoil";
import { collapseState, isMobileState, menuState } from "@/recoil/states";
import { MenuListTypes } from "@/types/Common/Common.interface";

const { Content } = Layout;

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const mobile = useIsMobile();
  const router = useRouter();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);
  const setMenuList = useSetRecoilState(menuState);

  /**
   * 메뉴 리스트 불러오기
   */
  const getMenuList = async () => {
    const result = await fetchMenuData();
    const list = result?.list?.map((e: MenuListTypes) => ({
      key: e.menu_path,
      label: e.menu_nm,
      onClick: () => router.push(e.menu_path),
    }));
    setMenuList(list);
  };

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  useEffect(() => {
    getMenuList();
  }, []);

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
