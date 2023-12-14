import { Radio } from 'antd';
import { useSession } from 'next-auth/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ApiCountChart = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState<string>('month');

    const getData = async () => {
      const formData = { type, group: true }
      const result = await fetchApiData(formData);
      setData(result?.list);
    }

    useEffect(() =>{
      getData();
    }, [type])

    return (
      <>
        <div style={{ marginBottom: 20 }}>
          <Radio.Group defaultValue="month" size="large" onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="year">올해</Radio.Button>
            <Radio.Button value="month">이번 달</Radio.Button>
            <Radio.Button value="day">오늘</Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <XAxis dataKey="name" fontSize={13} />
              <YAxis />
              <Tooltip formatter={(data) => data + '회'}/>
              <Legend />
              <Bar
                type="monotone"
                dataKey="count"
                name="호출 횟수"
                fill="#8884d8"
                stroke="#8884d8"
                strokeWidth={3}
                animationDuration={500}
                label={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  fill: '#fff',
                  position: 'center',
                  formatter: (value: any) => {
                    if(value > 1){
                      return value + '회';
                    }
                  },
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
}

export default ApiCountChart;

export const fetchApiData = async (formData: { type: string }) => {
  const res = await fetch(`/api/api`, {
      method: 'POST',
      body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}