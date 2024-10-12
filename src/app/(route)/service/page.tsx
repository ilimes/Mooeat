'use client';

import { useState } from 'react';
import { Divider, Spin } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Tabs from '@/src/components/Service/Tabs';
import Message from '@/src/components/Service/Message';
import CollapseComponent from '@/src/components/Service/CollapseComponent';
import Notice from '@/src/components/Service/Notice';
import Help from '@/src/components/Service/Help';
import TopTitle from '@/src/components/SharedComponents/TopTitle';
import { MarginSpin } from '../../styles/Spin.styled';

const Service = () => {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page');
  const { data: session } = useSession();
  const [selectedKey, setSelectedKey] = useState(page || 'qna');
  return (
    <div>
      <TopTitle title="고객센터" explain="도움이 필요하신가요?" />
      <Tabs selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      {selectedKey === 'qna' && (
        <>
          <Message />
          <Divider />
          <CollapseComponent />
        </>
      )}
      {selectedKey === 'personal' && session && <Help />}
      {selectedKey === 'personal' && !session && <MarginSpin />}
      {selectedKey === 'notice' && <Notice />}
    </div>
  );
};

export default Service;
