'use client'

import { useState } from "react";
import { Button, Divider, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import Tabs from "@/components/Service/Tabs";
import Message from "@/components/Service/Message";
import CollapseComponent from "@/components/Service/CollapseComponent";
import Notice from "@/components/Service/Notice";
import Help from "@/components/Service/Help";
import { useSession } from "next-auth/react";
import TopTitle from "@/components/SharedComponents/TopTitle";

const Service = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const { data: session, status } = useSession();
  const [selectedKey, setSelectedKey] = useState(page || 'qna');
  return (
    <div>
      <TopTitle title="고객센터" explain="도움이 필요하신가요?" />
      <Tabs selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      {
        selectedKey === 'qna' &&
        <>
          <Message />
          <Divider />
          <CollapseComponent />
        </>
      }
      {(selectedKey === 'personal' && session) && <Help />}
      {(selectedKey === 'personal' && !session) && <Spin style={{ display: 'flex', justifyContent: 'center', margin: '100px 0' }} />}
      {selectedKey === 'notice' && <Notice />}
    </div>
  );
};

export default Service;