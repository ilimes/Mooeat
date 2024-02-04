'use client'

import { Avatar, Button, Col, Input, Row, Select, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InfoTypes } from "@/types/Common/Common.interface";
import { FriendTypes } from "@/types/Friend/Friend.interface";
import { useSession } from "next-auth/react";
import { loadFriendList } from "@/api/Api";

const Titles = ({name, required} : {name: string, required: boolean}) => {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 7 }}>
      <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
    </div>
  )
}

const Share = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeKey, setActiveKey] = useState('share');
  const [items, setItems] = useState<InfoTypes[]>([
    {
      key: 'share',
      label: '공유하기',
    },
    {
      key: 'get',
      label: '받은 목록'
    },
    {
      key: 'send',
      label: '보낸 목록',
    },
  ]);

  const [friendList, setFriendList] = useState<FriendTypes[]>([]);
  const user_seq = session?.user?.info?.userInfo?.user_seq;

  const friendList1 = friendList?.filter(e => e?.from_user_seq === user_seq && e?.agree === 'Y');
  const friendList2 = friendList?.filter(e => e?.to_user_seq === user_seq && e?.agree === 'Y');
  const pureFriendList = friendList1?.filter(e => friendList2?.find(ele => ele?.from_user_seq === e?.to_user_seq))
  const pureCondition = pureFriendList?.length != 0;

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const getFriendList = async () => {
    const formData = { user_seq };
    const result = await loadFriendList(formData);
    setFriendList(result?.list);
  }

  useEffect(() => {
    if (status === 'authenticated') {
      getFriendList();
    }
  }, [status])

  return (
    <div>
      <Title>공유하기</Title>
      <Explain>등록된 친구에게 내 식단을 공유해보세요.</Explain>
      <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 600 }} tabBarGutter={20} />
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Image src={"/img/share/share.png"} alt='Attendance' width={300} height={210} />
      </div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <Titles name="대상 선택" required />
              <Select placeholder="공유할 친구를 선택해주세요." options={pureFriendList?.map((e: FriendTypes, i: number) => ({ value: e?.to_user_seq, label: <><Avatar size={32} icon={<UserOutlined />} /> {`${e?.to_user_nm} (${e?.to_user_id})`}</> }))} style={{ width: '100%', height: 55 }} size="large" />
            </div>
            <div>
              <Titles name="내용" required />
              <Input.TextArea placeholder="내용을 작성해주세요." style={{ resize: 'none', height: 196, padding: 13 }} size="large" />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <FileUpload />
        </Col>
      </Row>
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <Button type="primary" style={{ width: 130, height: 50, fontWeight: 600 }}>공유하기</Button>
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <a href="https://kr.freepik.com/free-vector/colorful-icons-set-style_12067938.htm#query=share&position=5&from_view=search&track=sph&uuid=ff78e392-b332-4598-ac8b-18451751f2c3">작가 coolvector</a> 출처 Freepik
      </div>
    </div>
  );
};

export default Share;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`