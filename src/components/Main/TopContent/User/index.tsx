import Image from 'next/image';
import { Avatar } from 'antd';
import SlotCounter from 'react-slot-counter';
import FlipNumbers from 'react-flip-numbers';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import useCountUp from '@/src/hooks/useCountUp';

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
    <div
      style={{
        display: 'flex',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 15,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 5,
        }}
      >
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
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* {val?.toLocaleString() || 0} {suffix} */}
        <span style={{ margin: '0 5px' }}>
          {/* {value ? <SlotCounter value={value?.toLocaleString()} /> : 0} */}
          <FlipNumbers
            play
            duration={1.5}
            color="#000"
            width={10}
            height={16}
            numbers={value?.toLocaleString() || '0'}
          />
        </span>
        <span style={{ fontSize: 13 }}>{suffix}</span>
      </div>
    </div>
  );
};

export default User;
