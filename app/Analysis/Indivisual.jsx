"use client"
import React,{useState, useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Indivisual = () => {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5009/indivisual');
        const result = await response.json();
        setData(result);  
        console.log("Indivisual Results: ",result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const transformedData = data
    ? data.map((parameter) => ({
        name: parameter.HealthParameter,
        values: parameter.Values.map((value, index) => ({
          time: `Time ${index + 1}`,
          value: value,
        })),
      }))
    : [];

  return (
    <div>
        <div className='text-lg font-bold'>Health Parameters</div>
        <br />
        <div>
    <div className="flex flex-wrap w-full justify-between">
        
  {transformedData.map((parameter) => (
    <div key={parameter.name} className="w-full sm:w-1/2 lg:w-1/2 p-4">
      <h3 className='inline-block text-base text-center bg-[#FDCB50] p-1 rounded-lg'>{parameter.name}</h3>
      <br />
      <br />
      <ResponsiveContainer width="100%" height={300} className="border border-[#DDDDDD] p-2 pt-10 rounded-xl shadow-2xl">
        <LineChart data={parameter.values} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <Tooltip />
          <Legend />
          <Line
            type="natural"
            strokeWidth={2}
            dot={false}
            dataKey="value"
            stroke="#8884d8"
            curve="natural"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ))}
</div>

    </div>
    </div>
  )
}

export default Indivisual