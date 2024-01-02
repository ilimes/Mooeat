"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import Buttons from "./Buttons";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef } from "react";
import Content from "../SharedComponents/Content";

const Main: React.FC = () => {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { ref, visible } = useIntersectionObserver(targetRef);

  return (
    <>
      <Buttons router={router} />
      <div>
        <div style={{ background: "#F2F6F8", padding: "100px 0px" }}>
          <Content>
            <div
              style={{ margin: "0 auto", maxWidth: 1200, padding: "0 16px" }}
            >
              <div
                style={{ fontSize: 20, fontWeight: "bold", color: "#47408F" }}
              >
                식단공유
              </div>
              <h1>
                친구에게,
                <br />
                나의 식단을 공유해보세요.
              </h1>
            </div>
          </Content>
        </div>
        <div style={{ background: "#F6FDEC", padding: "100px 0px" }}>
          <Content>
            <div
              ref={ref}
              className={visible ? "fade" : "default"}
              style={{ margin: "0 auto", maxWidth: 1200, padding: "0 16px" }}
            >
              <div
                style={{ fontSize: 20, fontWeight: "bold", color: "#47408F" }}
              >
                맛집정보
              </div>
              <h1>
                맛집 정보를,
                <br />다 같이 공유해보세요.
              </h1>
            </div>
          </Content>
        </div>
        <div
          style={{ background: "#141617", color: "#fff", padding: "100px 0px" }}
        >
          <Content>
            <div
              style={{ margin: "0 auto", maxWidth: 1200, padding: "0 16px" }}
            >
              <div
                style={{ fontSize: 20, fontWeight: "bold", color: "#A09BD2" }}
              >
                제목
              </div>
              <h1>
                제목상단,
                <br />
                제목하단
              </h1>
            </div>
            <div className="container">
              <div style={{ marginBottom: 20, fontWeight: 700, fontSize: 24 }}>
                👀 둘러보기
              </div>
              <StyledDiv>
                둘러보기 공간
                {/* <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent />
                                <CardComponent /> */}
              </StyledDiv>
            </div>
          </Content>
        </div>
      </div>
    </>
  );
};

export default Main;

const StyledDiv = styled.div`
  && {
    display: flex;
    gap: 10px;
    overflow: auto;
    padding-bottom: 1;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
