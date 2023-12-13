import React from "react";
import { EyeOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import { IObjTypes } from './PostCard';
import { Col, Row } from "antd";

const CntComponent = ({ obj }: { obj: IObjTypes }) => {
    return (
        <div>
          <Row gutter={[15, 15]}>
            <Col style={{ fontSize: 14 }}>
              <EyeOutlined style={{ color: '#beb4b4' }} /> {obj?.view_cnt}
            </Col>
            <Col style={{ fontSize: 14 }}>
              <CommentOutlined style={{ color: '#beb4b4' }} /> {obj?.comment_cnt}
            </Col>
            <Col style={{ fontSize: 14 }}>
              <LikeOutlined style={{ color: '#beb4b4' }} /> {obj?.like_cnt}
            </Col>
          </Row>
        </div>
    )
}

export default CntComponent;