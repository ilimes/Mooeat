import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "../../lib/SessionProvider";
import CustomLayout from "@/components/CustomLayout";
import RecoilRootProvider from "@/lib/RecoilRootProvider";
import StyledComponentsRegistryAnt from "@/lib/AntdRegistry";
import StyledComponentsRegistry from "@/lib/Registry";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";

export const metadata: Metadata = {
  title: "Mooeat",
  description: "Mooeat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <SessionProvider>
            <RecoilRootProvider>
              <StyledComponentsRegistry>
                <StyledComponentsRegistryAnt>
                  <ConfigProvider theme={theme}>
                    <CustomLayout>{children}</CustomLayout>
                  </ConfigProvider>
                </StyledComponentsRegistryAnt>
              </StyledComponentsRegistry>
            </RecoilRootProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
