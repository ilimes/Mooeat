import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CardComponent: React.FC = () => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="카드 Example 입니다." description="설명란입니다." />
  </Card>
);

export default CardComponent;