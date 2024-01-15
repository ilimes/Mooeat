import { loadApiData } from '@/api/Api';
import { Radio, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const options = [
  {
    label: 2024,
    value: 2024
  },
  {
    label: 2023,
    value: 2023
  },
]

const ApiCountChart = () => {
   const { data: session, status } = useSession();

    const [data, setData] = useState([]);
    const [year, setYear] = useState<number>(2024);
    const [type, setType] = useState<string>('month');
    const [sumCount, setSumCount] = useState(0);

    // const getData = async () => {
    //   const formData = { type, year }
    //   const result = await fetchApiData(formData);
    //   setData(result?.list);
    //   setSumCount(result?.sum_count);
    // }
    const getData = async () => {
      const token = session?.user?.token?.data?.token;
      const formData: { type: string, year: number } = { type, year }
      const result = await loadApiData(formData, token);
      setData(result?.list);
      setSumCount(result?.sum_count);
    }

    useEffect(() =>{
      if (status === 'authenticated') {
        getData();
      }
    }, [type, year, status])

    return (
      <>
        <div style={{ marginBottom: 10, fontWeight: 400, fontSize: 13, color: 'grey' }}>총 {sumCount}회</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
          <Select options={options} value={year} onChange={(e) => setYear(e)} style={{ width: 85 }} size="large" />
          <Radio.Group value={type} size="large" onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="year">년간</Radio.Button>
            <Radio.Button value="month">월간</Radio.Button>
            <Radio.Button value="day">일간</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              <Tooltip formatter={(data) => data + '회'}/>
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="호출 횟수"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 4.5 }}
                activeDot={{ r: 6 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    );
}

export default ApiCountChart;

const fetchApiData = async (formData: { type: string }) => {
  const res = await fetch(`/api/api`, {
      method: 'POST',
      body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}