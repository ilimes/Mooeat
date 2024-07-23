import Image from 'next/image';
import { Avatar } from 'antd';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import useCountUp from '@/hooks/useCountUp';

const User = ({
  userName,
  profilePath,
  value,
  suffix,
}: {
  userName?: string;
  profilePath?: string;
  value?: number;
  suffix?: string;
}) => {
  const val = useCountUp(Number(value), 700);

  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      <Avatar
        size={25}
        icon={
          profilePath ? (
            <img
              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profilePath}`}
              alt="profile"
            />
          ) : (
            <Image src={unknownAvatar} alt="unknown" />
          )
        }
      />
      <div>{userName || '닉네임'}</div>
      <div style={{ marginLeft: 'auto' }}>
        {val?.toLocaleString() || 0} {suffix}
      </div>
    </div>
  );
};

export default User;
