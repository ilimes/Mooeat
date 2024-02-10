'use client';

import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { InfoTypes } from '@/types/Common/Common.interface';
import { FriendTypes } from '@/types/Friend/Friend.interface';
import { loadFriendList } from '@/api/Api';
import TopTitle from '@/components/SharedComponents/TopTitle';
import ShareContent from '@/components/Share/ShareContent';
import ReceivedList from '@/components/Share/ReceivedList';

const Share = () => {
  const { data: session, status } = useSession();
  const [activeKey, setActiveKey] = useState('share');
  const [items, setItems] = useState<InfoTypes[]>([
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
  ]);

  const [friendList, setFriendList] = useState<FriendTypes[]>([]);

  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const friendList1 = friendList?.filter((e) => e?.from_user_seq === userSeq && e?.agree === 'Y');
  const friendList2 = friendList?.filter((e) => e?.to_user_seq === userSeq && e?.agree === 'Y');
  const pureFriendList = friendList1?.filter((e) =>
    friendList2?.find((ele) => ele?.from_user_seq === e?.to_user_seq),
  );
  const pureCondition = pureFriendList?.length !== 0;

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const getFriendList = async () => {
    const formData: any = { user_seq: userSeq };
    const result = await loadFriendList(formData);
    setFriendList(result?.list);
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
      {activeKey === 'share' && <ShareContent pureFriendList={pureFriendList} />}
      {activeKey === 'received' && <ReceivedList pureFriendList={pureFriendList} />}
      {activeKey === 'sent' && <ShareContent pureFriendList={pureFriendList} />}
    </div>
  );
};

export default Share;
