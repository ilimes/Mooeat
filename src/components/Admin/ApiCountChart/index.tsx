import { Radio, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { PureComponent, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { loadApiData } from '@/src/app/api/Api';
import { yearOptions } from '@/src/meta/select';

const ApiCountChart = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;

  const [data, setData] = useState([]);
  const [year, setYear] = useState<number>(2024);
  const [type, setType] = useState<string>('day');
  const [sumCount, setSumCount] = useState(0);

  const getData = async () => {
    const formData: { type: string; year: number } = { type, year };
    const result = await loadApiData(formData);
    setData(result?.list);
    setSumCount(result?.sum_count);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getData();
    }
  }, [type, year, status]);

  return (
    <>
      <div style={{ marginBottom: 10, fontWeight: 400, fontSize: 13, color: 'grey' }}>
        총 {Number(sumCount)?.toLocaleString()}회
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <Select
          options={yearOptions}
          value={year}
          onChange={(e) => setYear(e)}
          style={{ width: 85 }}
          size="large"
        />
        <Radio.Group value={type} size="large" onChange={(e) => setType(e.target.value)}>
          <Radio.Button value="year">년간</Radio.Button>
          <Radio.Button value="month">월간</Radio.Button>
          <Radio.Button value="day">일간</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={13} />
            <YAxis />
            <Tooltip formatter={(e: any) => `${e}회`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              name="호출 횟수"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
              strokeWidth={3}
              dot={{ r: 0 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ApiCountChart;
