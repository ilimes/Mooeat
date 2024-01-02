import { Radio } from 'antd';
import { useSession } from 'next-auth/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApiCountChart = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState<string>('month');
    const [sumCount, setSumCount] = useState(0);

    const getData = async () => {
      const formData = { type }
      const result = await fetchApiData(formData);
      setData(result?.list);
      setSumCount(result?.sum_count);
    }

    useEffect(() =>{
      getData();
    }, [type])

    return (
      <>
        <div style={{ marginBottom: 20 }}>
          <Radio.Group defaultValue="month" size="large" onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="year">년간</Radio.Button>
            <Radio.Button value="month">월간</Radio.Button>
            <Radio.Button value="day">일간</Radio.Button>
          </Radio.Group>
          <span style={{ marginLeft: 10, fontWeight: 400, fontSize: 13, color: 'grey'  }}>총 {sumCount}회</span>
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