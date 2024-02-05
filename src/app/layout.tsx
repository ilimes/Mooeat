import "./globals.css";
import type { Metadata } from "next";
import SessionProvider from "../../lib/SessionProvider";
import CustomLayout from "@/components/CustomLayout";
import RecoilRootProvider from "@/lib/RecoilRootProvider";
import StyledComponentsRegistryAnt from "@/lib/AntdRegistry";
import StyledComponentsRegistry from "@/lib/Registry";
import { ConfigProvider } from "antd";
import theme from "../../theme/themeConfig";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Mooeat",
  description: "Mooeat",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
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
            <ReactQueryProvider>
              <RecoilRootProvider>
                <StyledComponentsRegistry>
                  <StyledComponentsRegistryAnt>
                    <ConfigProvider theme={theme}>
                      <CustomLayout>{children}</CustomLayout>
                    </ConfigProvider>
                  </StyledComponentsRegistryAnt>
                </StyledComponentsRegistry>
              </RecoilRootProvider>
            </ReactQueryProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
