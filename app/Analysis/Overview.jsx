"use client"
import React, { useEffect, useState } from 'react'
import "../../app/globals.css"
// import Plot from 'react-plotly.js';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Overview = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5009/overview');
                const result = await response.json();
                console.log("results from graph database: ", result);

                // Transform the data into a grouped format
                const transformedData = [];
                let currentReport = null;

                result.forEach(item => {
                    if (item.n.report_date) {
                        // Start a new report
                        if (currentReport) {
                            transformedData.push(currentReport);
                        }
                        currentReport = {
                            ReportDate: item.n.report_date,
                            HealthParameters: []
                        };
                    } else if (item.n.name) {
                        // Add health parameter to the current report
                        currentReport?.HealthParameters.push({
                            name: item.n.name,
                            value: item.n.value,
                            remark: item.n.remark
                        });
                    }
                });

                // Push the last report
                if (currentReport) {
                    transformedData.push(currentReport);
                }

                setData(transformedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
           <div className='overflow-y-scroll no-scrollbar'>
           
            {data && data.length > 0 ? (
                data.map((report, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h2 className='text-base font-bold pb-3'>Report Date: {report.ReportDate}</h2>
                    
                        <table className='border' border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead className='bg-[#1A2238] text-[#D45028]'>
                                <tr>
                                    <th className='w-96 p-2'>Name</th>
                                    <th className='w-96 p-2'>Value</th>
                                    <th className='w-96 p-2'>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(report.HealthParameters) && report.HealthParameters.map((param, paramIndex) => (
                                    <tr key={paramIndex}>
                                        <td className='p-2'>{param.name}</td>
                                        <td className='p-2'>{param.value}</td>
                                        <td className='p-2'>{param.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
<br />
                        <ResponsiveContainer width="100%" height={300} className="border border-black p-1">
                            <BarChart data={report.HealthParameters}>
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickMargin={10}/>
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} tickMargin={10}/>
                                <Tooltip />
                                <Bar dataKey="value" fill="#2A9D90" radius={4} barSize={60}/>
                            </BarChart>
                        </ResponsiveContainer>
                        <br />
                        <br />

                        {/* 3D Graph representation */}
                        {/* <Plot
                            data={[
                                {
                                    type: 'scatter3d',
                                    mode: 'markers',
                                    x: report.HealthParameters.map(param => param.name),
                                    y: report.HealthParameters.map(param => param.remark),
                                    z: report.HealthParameters.map(param => param.value),
                                    marker: { size: 5, color: report.HealthParameters.map(param => param.value) },
                                },
                            ]}
                            layout={{
                                title: 'Health Parameters in 3D',
                                scene: {
                                    xaxis: { title: 'Parameter Name' },
                                    yaxis: { title: 'Remarks' },
                                    zaxis: { title: 'Values' },
                                },
                            }}
                            style={{ width: '100%', height: '500px' }}
                        /> */}

                    </div>
                ))
            ) : (
                <p>Loading data...</p>
            )}
        </div>
        </>
    )
}

export default Overview
