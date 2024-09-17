"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import firestore from '@/Components/firebase'; // Assuming the correct path to firebase.js
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];




const Page = () => {

  const getRemarks = (entry) => {
    let remarks = [];
    if (entry.SPO2 >= 95 && entry.SPO2 <= 100) {
      remarks.push("Normal");
    } else {
      remarks.push("Consult Doctor");
    }

    if (entry.PulseRate >= 60 && entry.PulseRate <= 100) {
      remarks.push("Normal");
    } else {
      remarks.push("Consult Doctor");
    }

    if (entry.Temperature >= 30 && entry.Temperature <= 35) {
      remarks.push("Normal");
    } else {
      remarks.push("Consult Doctor");
    }

    return remarks.join(", ");
  };


  const [liveData, setLiveData] = useState([]); // State for live data updated every 5 seconds
  const [historicalData, setHistoricalData] = useState([]); // State for data fetched from Firestore
  const [counter, setCounter] = useState(0);
  const [spo2Sum, setSPO2Sum] = useState(0);
  const [pulseRateSum, setPulseRateSum] = useState(0);
  const [temperatureSum, setTemperatureSum] = useState(0);
  const [recommendations, setRecommendations] = useState(null);






  // Function to generate random SPO2 value between 95 to 100
  // const randomSPO2Generator = () => {
  //   return Math.floor(Math.random() * (100 - 95 + 1)) + 95;
  // };

  // Function to generate random Pulse Rate value between 60 to 100
  // const randomPulseRateGenerator = () => {
  //   return Math.floor(Math.random() * (100 - 60 + 1)) + 60;
  // };

  // Function to generate random Body Temperature value between 36.1°C to 37.2°C
  // const randomTemperatureGenerator = () => {
  //   return (Math.random() * (50 - 30) + 30).toFixed(1); // Generates a number between 30 and 50
  // };






  // Function to fetch data from Firestore
  const fetchData = async () => {
    const dataCollection = collection(firestore, 'data');
    const snapshot = await getDocs(dataCollection);
    const fetchedData = [];
    snapshot.forEach(doc => {
      fetchedData.push(doc.data());
    });
    setHistoricalData(fetchedData);
    console.log("fetched data", fetchedData);
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);



  // Function to update values after every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newSPO2 = randomSPO2Generator();
      const newPulseRate = randomPulseRateGenerator();
      const newTemperature = randomTemperatureGenerator();
      const currentTime = new Date().toLocaleTimeString();

      // Update state for live data
      setLiveData(prevData => [...prevData, { time: currentTime, SPO2: newSPO2, PulseRate: newPulseRate, Temperature: newTemperature }]);
      setSPO2Sum(prevSum => prevSum + newSPO2);
      setPulseRateSum(prevSum => prevSum + newPulseRate);
      setTemperatureSum(prevSum => prevSum + parseFloat(newTemperature));
      setCounter(prevCounter => prevCounter + 1);

      // If 10 values are generated, calculate averages and store data in Firestore
      if (counter === 9) {
        const spo2Average = spo2Sum / 10;
        const pulseRateAverage = pulseRateSum / 10;
        const temperatureAverage = temperatureSum / 10;

        const addDataToFirestore = async () => {
          try {
            // Get the current date and time
            const currentDate = new Date();

            // Get the day of the week (e.g., Monday, Tuesday)
            const options = { weekday: 'long' };
            const dayOfWeek = currentDate.toLocaleDateString('en-US', options);

            // Get the full date (e.g., 2024-09-16)
            const fullDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format

            // Get the exact time (e.g., 14:35:22)
            const exactTime = currentDate.toLocaleTimeString('en-US', { hour12: false }); // HH:MM:SS format

            await addDoc(collection(firestore, 'data'), {
              SPO2: spo2Average,
              PulseRate: pulseRateAverage,
              Temperature: temperatureAverage,
              timestamp: serverTimestamp(),
              day: dayOfWeek,     // Add day of the week
              date: fullDate,     // Add formatted date
              time: exactTime     // Add formatted time
            });

            console.log("Data added to Firestore");
          } catch (error) {
            console.error("Error adding data to Firestore: ", error);
          }
        };


        addDataToFirestore();

        // Reset counters and sums
        setCounter(0);
        setSPO2Sum(0);
        setPulseRateSum(0);
        setTemperatureSum(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [counter, spo2Sum, pulseRateSum, temperatureSum]);


  //Function to handle GENAI recommendations
  const handleGetRecommendations = async ({ SPO2, PulseRate, Temperature }) => {
    console.log(SPO2)
    console.log(PulseRate)
    console.log(Temperature)
    const data = {
      question: `SPO2: ${SPO2}, Pulse Rate: ${PulseRate}, Body Temperature: ${Temperature}. What health recommendations would you provide?`
    };

    try {
      //https://medisense-backend.onrender.com/genai
      //http://localhost:5002/
      const response = await fetch('https://medisense-backend.onrender.com/genai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setRecommendations(result.recommendations);
        console.log(result.recommendations)
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const clear = () => {
    setRecommendations('');
    console.log("cleared recco.", recommendations);
  }



  return (
    <div>
      {/* //mt-40 ml-4 md:mt-20 md:ml-20 lg:mt-40 lg:ml-72 */}
      <div className='lg:mt-40 text-center mt-28'>

        <div className='mb-8 lg:m-0 m-10 lg:border-none border border-[#1A2238]'>
          <h2 className='text-lg md:text-2xl lg:text-3xl mb-4 text-[#1A2238] font-semibold'>Live Data</h2>
          <div className='overflow-x-auto mx-auto '>
            <LineChart
              width={800}
              height={400}
              data={liveData}
              className='lg:w-full md:w-auto mx-auto lg:border lg:border-[#1A2238]'
            >
              <CartesianGrid strokeDasharray='none' vertical={false} horizontal={false} />
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='SPO2' stroke='#8884d8' strokeWidth={3} />
              <Line type='monotone' dataKey='PulseRate' stroke='#82ca9d' strokeWidth={3} />
              <Line type='monotone' dataKey='Temperature' stroke='#ff7300' strokeWidth={3} />
            </LineChart>
          </div>
        </div>


        <div className='lg:mt-20 lg:m-0 m-10 lg:border-none border border-[#1A2238]'>
          <h2 className='text-lg md:text-2xl lg:text-3xl mb-4 text-[#1A2238] font-semibold'>Historical Data</h2>
          <div className='overflow-x-auto mx-auto'>
            <BarChart
              width={800}
              height={400}
              data={historicalData}
              className='lg:w-full md:w-auto mx-auto lg:border lg:border-[#1A2238]'
            >
              <CartesianGrid strokeDasharray='none' vertical={false} horizontal={false} />
              <XAxis dataKey='timestamp' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='SPO2' fill='#8884d8' barSize={30} radius={[5, 5, 5, 5]} />
              <Bar dataKey='PulseRate' fill='#82ca9d' barSize={30} radius={[5, 5, 5, 5]} />
              <Bar dataKey='Temperature' fill='#ff7300' barSize={30} radius={[5, 5, 5, 5]} />
            </BarChart>
          </div>
        </div>
      </div>


      <div className='mt-20 lg:px-20'>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th className="w-40">Date</th>
                <th className="w-40">Time</th>
                <th className="w-40">Day</th>
                <th className="w-40">SPO2</th>
                <th className="w-40">Pulse Rate</th>
                <th className="w-40">Body Temperature</th>
                <th className="w-40">Analysis</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.length > 0 ? (
                historicalData.map((entry, index) => {
                  const pieData = [
                    { name: 'SPO2', value: entry.SPO2 },
                    { name: 'Pulse Rate', value: entry.PulseRate },
                    { name: 'Body Temperature', value: entry.Temperature }
                  ];

                  return (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.time}</td>
                      <td>{entry.day}</td>
                      <td>{entry.SPO2}</td>
                      <td>{entry.PulseRate}</td>
                      <td>{entry.Temperature}</td>
                      <td>
                        <button
                          className="btn border border-[#D45028] text-[#D45028] bg-transparent hover:bg-[#D45028] hover:text-[white] font-bold"
                          onClick={() => document.getElementById(`modal_${index}`).showModal()}
                        >
                          Report
                        </button>
                        <dialog id={`modal_${index}`} className="modal overflow-y-scroll no-scrollbar">
                          <div className="modal-box overflow-y-scroll no-scrollbar">
                            <h3 className="font-bold text-lg">Health Report</h3>
                            <p className="py-4">Here is a breakdown of the health data:</p>

                            {/* Pie Chart */}
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  fill="#8884d8"
                                  label
                                >
                                  {pieData.map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>

                            {/* Specifications Table */}
                            <div className="mt-4">
                              <table className="table w-full border border-gray-300">
                                <thead>
                                  <tr>
                                    <th className="w-1/3">Parameter</th>
                                    <th className="w-1/3">Value</th>
                                    <th className="w-1/3">Remarks</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>SPO2</td>
                                    <td>{entry.SPO2}</td>
                                    <td>{entry.SPO2 >= 95 && entry.SPO2 <= 100 ? 'Normal' : 'Consult Doctor'}</td>
                                  </tr>
                                  <tr>
                                    <td>Pulse Rate</td>
                                    <td>{entry.PulseRate}</td>
                                    <td>{entry.PulseRate >= 60 && entry.PulseRate <= 100 ? 'Normal' : 'Consult Doctor'}</td>
                                  </tr>
                                  <tr>
                                    <td>Body Temperature</td>
                                    <td>{entry.Temperature}</td>
                                    <td>{entry.Temperature >= 30 && entry.Temperature <= 35 ? 'Normal' : 'Consult Doctor'}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className='flex justify-center align-middle items-center m-10 '>
                              <button className="btn border border-[#1A2238] text-[#1A2238] bg-transparent hover:bg-[#1A2238] hover:text-[white] font-bold" onClick={() => handleGetRecommendations({ SPO2: entry.SPO2, PulseRate: entry.PulseRate, Temperature: entry.Temperature })}>Get AI Recommendations</button>
                            </div>

                            {recommendations && (
                              <div className="mt-4">
                                <h3 className="font-bold">AI Recommendations:</h3>
                                <p>{recommendations}</p>
                              </div>
                            )}
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button onClick={clear}>Close</button>
                          </form>
                        </dialog>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Page;




