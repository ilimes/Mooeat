"use client";

import StyledComponentsRegistryAnt from "../../lib/AntdRegistry";
import StyledComponentsRegistry from "../../lib/Registry";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ConfigProvider, Layout } from "antd";
import theme from "../../theme/themeConfig";
import { useEffect } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import MobileNav from "../MobileNav/MobileNav";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  collapseState,
  isMobileState,
  menuState,
  userInfoLoadingState,
  userInfoState,
} from "@/recoil/states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import Wrapper from "./Wrapper";
import AdminHeader from "../Admin/AdminHeader";
import AdminSider from "../Admin/AdminSider";

const { Content } = Layout;

interface IMenuListTypes {
  menu_cd: string;
  menu_category: string;
  menu_path: string;
  menu_nm: string;
  menu_level: number;
  parent_menu_cd: string | null;
  menu_order: string | null;
  role_rank: number;
  breadcrumb: string;
  auth_yn: string;
  use_yn: string;
}

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setUserInfoLoading = useSetRecoilState(userInfoLoadingState);
  const setCollapsed = useSetRecoilState<boolean>(collapseState);
  const setMenuList = useSetRecoilState(menuState);
  const mobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPage = pathname?.split("/")?.[1] === "admin" ? true : false;

  useEffect(() => {
    setCollapsed(false);

    if (mobile) setIsMobile(true);
    else setIsMobile(false);
  }, [mobile]);

  /**
   * 메뉴 리스트 불러오기
   */
  const getMenuList = async () => {
    const result = await fetchMenuData();
    const list = result?.list?.map((e: IMenuListTypes) => ({
      key: e.menu_path,
      label: e.menu_nm,
      onClick: () => router.push(e.menu_path),
    }));
    setMenuList(list);
  };

  /**
   * 유저 정보 불러오기
   */
  const userInfoSet = async () => {
    const token = localStorage.getItem("token");

    // 토큰이 존재할 때
    if (token) {
      const result = await fetchUserInfoData(token);

      // 토큰이 만료되지 않고 정상적인 경우
      if (result?.success) {
        setUserInfo(result?.user_info);
      } else {
        localStorage.removeItem("token");
        alert("토큰이 만료되어 로그아웃 되었습니다.");
      }
    }
    await setUserInfoLoading(true);
  };

  useEffect(() => {
    getMenuList();
    userInfoSet();
  }, []);

  return (
    <StyledComponentsRegistry>
      <StyledComponentsRegistryAnt>
        <ConfigProvider theme={theme}>
          <Layout>
            {isAdminPage && (
              <>
                <Layout style={{ background: "#F5F5F5" }}>
                  <AdminHeader />
                  <div style={{ padding: 24 }}>
                    <Layout
                      style={{
                        maxWidth: 1150,
                        width: "100%",
                        margin: "0 auto",
                        padding: 24,
                        borderRadius: 16,
                      }}
                    >
                      <Layout
                        style={{
                          background: "#fff",
                        }}
                      >
                        <AdminSider />
                        <Content>{children}</Content>
                      </Layout>
                    </Layout>
                  </div>
                  {/* <Content style={{ padding: "0 48px", maxWidth: 1150 }}> */}
                  {/* </Content> */}
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    Mooeat ©2023 Created by ilimes
                  </div>
                </Layout>
              </>
            )}
            {!isAdminPage && (
              <>
                <Header />
                <Wrapper>
                  <Content style={{ background: "white" }}>{children}</Content>
                </Wrapper>
                <Footer />
                {isMobile && <MobileNav />}
              </>
            )}
          </Layout>
        </ConfigProvider>
      </StyledComponentsRegistryAnt>
    </StyledComponentsRegistry>
  );
};

export default CustomLayout;

export const fetchMenuData = async () => {
  const res = await fetch(`/api/menu`, {
    method: "POST",
  });
  const result = await res.json();

  return result?.data;
};

export const fetchUserInfoData = async (token: string | null) => {
  const res = await fetch(`/api/userInfo`, {
    method: "POST",
    body: JSON.stringify(token),
  });
  const result = await res.json();

  return result?.data;
};
