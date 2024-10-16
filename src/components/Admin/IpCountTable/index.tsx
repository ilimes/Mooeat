import { Col, Row, Table, TableColumnsType } from 'antd';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { loadIpData } from '@/src/app/api/Api';

interface DataType {
  idx: number;
  ip: string;
  count: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'No.',
    dataIndex: 'idx',
    key: 'idx',
    width: 70,
    align: 'center',
  },
  {
    title: 'IP 주소',
    dataIndex: 'ip',
    key: 'ip',
    align: 'center',
    width: 260,
  },
  {
    title: '횟수',
    dataIndex: 'count',
    key: 'count',
    align: 'center',
    render: (text) => `${text}회`,
    width: 120,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: 'hsla(0,0%,100%,.8)', border: '1px solid #f5f5f5', padding: 10 }}
      >
        <p style={{ fontWeight: 700 }}>{`${label}위`}</p>
        <p className="label">{`횟수: ${payload[0].value}회`}</p>
        <p className="intro">{`IP 주소: ${payload?.[0]?.payload?.ip}`}</p>
      </div>
    );
  }

  return null;
};

const IpCountTable = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;

  const [data, setData] = useState<DataType[] | []>([]);
  const sumCount = data?.length;

  const getData = async () => {
    const result = await loadIpData();
    setData(result?.list);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getData();
    }
  }, [status]);

  return (
    <>
      <div style={{ marginBottom: 10, fontWeight: 400, fontSize: 13, color: 'grey' }}>
        총 {Number(sumCount)?.toLocaleString()}개
      </div>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Table
            rowKey={(record) => record?.idx}
            columns={columns}
            dataSource={data}
            bordered
            tableLayout="fixed"
            scroll={{ x: 450 }}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} style={{ height: 650 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={650}
              data={data?.slice(0, 5)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="idx" tickFormatter={(value) => `${value}위`} fontSize={13} />
              <YAxis />
              {/* <Tooltip formatter={(data: number) => data + '회'}/> */}
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                type="monotone"
                dataKey="count"
                name="횟수"
                fill="#8884d8"
                stroke="#8884d8"
                strokeWidth={3}
                animationDuration={500}
                label={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  fill: '#fff',
                  position: 'center',
                  formatter: (value: number) => {
                    if (value > 0) {
                      return `${value}회`;
                    }
                  },
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};

export default IpCountTable;
