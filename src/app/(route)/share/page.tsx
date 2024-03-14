'use client';

import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { InfoTypes } from '@/types/Common/Common.interface';
import { Friend, FriendTypes } from '@/types/Friend/Friend.interface';
import { loadFriendList } from '@/api/Api';
import TopTitle from '@/components/SharedComponents/TopTitle';
import ShareContent from '@/components/Share/ShareContent';
import ReceivedList from '@/components/Share/ReceivedList';
import SentList from '@/components/Share/SentList';

const items: InfoTypes[] = [
  {
    key: 'share',
    label: '공유하기',
  },
  {
    key: 'received',
    label: '받은 목록',
  },
  {
    key: 'sent',
    label: '보낸 목록',
  },
];

const Share = () => {
  const { data: session, status } = useSession();
  const [activeKey, setActiveKey] = useState('share');

  const [friendList, setFriendList] = useState<Friend[]>([]);

  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const getFriendList = async () => {
    const formData: any = { user_seq: userSeq, type: 'P' };
    const result = await loadFriendList(formData);
    setFriendList(result?.list?.pureList);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getFriendList();
    }
  }, [status]);

  return (
    <div>
      <TopTitle title="공유하기" explain="등록된 친구에게 내 식단을 공유해보세요." />
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={onChange}
        style={{ fontWeight: 800 }}
        tabBarGutter={20}
      />
      {activeKey === 'share' && <ShareContent pureFriendList={friendList} />}
      {activeKey === 'received' && <ReceivedList pureFriendList={friendList} />}
      {activeKey === 'sent' && <SentList pureFriendList={friendList} />}
    </div>
  );
};

export default Share;
