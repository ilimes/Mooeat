import { loadApiData } from '@/api/Api';
import { Radio, Select } from 'antd';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    const token = session?.user?.info?.data?.token;

    const nowYear = Number(moment().format('YYYY'));

    const [data, setData] = useState([]);
    const [year, setYear] = useState<number>(2024);
    const [type, setType] = useState<string>('day');

    const getData = async () => {
      const formData = { type, group: true, year }
      // const result = await fetchApiData(formData);
      const result = await loadApiData(formData, token);
      setData(result?.list);
    }

    const onChangeSelect = (e: number) => {
      if (nowYear != e) {
        setType('year');
      }
      setYear(e);
    }

    useEffect(() =>{
      if (status === 'authenticated') {
        getData();
      }
    }, [type, year, status])

    return (
      <>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <Select options={options} value={year} onChange={(e) => onChangeSelect(e)} style={{ width: 85 }} size="large" />
          <Radio.Group value={type} size="large" onChange={(e) => setType(e.target.value)}>
            <Radio.Button value="year">당해</Radio.Button>
            <Radio.Button value="month" disabled={nowYear != year ? true : false}>이번 달</Radio.Button>
            <Radio.Button value="day" disabled={nowYear != year ? true : false}>오늘</Radio.Button>
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
              <Tooltip formatter={(data: number) => data + '회'}/>
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
                  formatter: (value: number) => {
                    if(value > 0){
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

const fetchApiData = async (formData: { type: string }) => {
  const res = await fetch(`/api/api`, {
      method: 'POST',
      body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}