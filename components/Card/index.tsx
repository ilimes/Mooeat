import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CardComponent: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240, height: 260 }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        style={{ height: 160, objectFit: 'cover' }}
      />
    }
  >
    <Meta title="카드 Example 입니다." description="설명란입니다." />
  </Card>
);

export default CardComponent;
