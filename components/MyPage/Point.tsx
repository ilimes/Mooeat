import { Spin } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Point = () => {
  const { data: session, status } = useSession();
  const [point, setPoint] = useState<number | null>(null);

  const loadUserInfoData = async () => {
    const result = await fetchUserInfoData({ token: session?.user?.token?.data?.token });
    if (result?.success) {
      setPoint(result?.user_info?.point)
    } else {
      setPoint(null);
    }
  }

  useEffect(() => {
    loadUserInfoData();
  }, [])

  return (
    <>
      <SubTitle>내 포인트</SubTitle>
      <StyledBoxDiv style={{ height: 50 }}>
        {
          point &&
          <>
            <span style={{ fontWeight: 600, fontSize: 18 }}>{Number(point)?.toLocaleString()}</span> 포인트
          </>
        }
        {
          !point &&
          <>
            <Spin />
          </>
        }
      </StyledBoxDiv>
      <SubTitle>적립 및 사용내역</SubTitle>
      <StyledBoxDiv>
        d
      </StyledBoxDiv>
    </>
  )
}

export default Point;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #BBCEDD;
  border-radius: 10px;
`

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #5D559A;
`

const fetchUserInfoData = async (formData: { token: string }) => {
  const res = await fetch(`/api/userInfo`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}