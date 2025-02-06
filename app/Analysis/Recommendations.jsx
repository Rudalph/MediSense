"use client"
import React,{useEffect, useState} from 'react'
import "../../app/globals.css"

const keyMapping = {
    fastingbloodglucose: "Fasting Blood Glucose",
    hdlcholesterol: "HDL Cholesterol",
    ldlchdlcratio: "LDL to HDL Ratio",
    ldlcholesterol: "LDL Cholesterol",
    postprandialbloodglucose: "Postprandial Blood Glucose",
    tchdlcratio: "Total Cholesterol to HDL Ratio",
    totalcholesterol: "Total Cholesterol",
    triglycerides: "Triglycerides",
    vldlcholesterol: "VLDL Cholesterol",
  };

const Recommendations = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5009/reco');
            const result = await response.json();  
            console.log("Recomendations Results: ",result); 
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

  return (
    <>
      

      {/* Scrollable Recommendations Section */}
      <div className=" ml-auto h-screen p-6 overflow-y-scroll no-scrollbar">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Health Recommendations</h2>
        {data ? (
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white"
              >
                <h3 className="text-xl font-semibold text-[#1A2238] capitalize">
                {keyMapping[key] || formatKey(key)}
                </h3>
                <p className="text-gray-700 text-base">
                  <strong className='text-[#D45028]'>Status:</strong> {value.status}
                </p>
                <p className="text-gray-700 mt-2 text-base">
                  <strong className='text-[#D45028]'>Recommendations:</strong> {value.Recommendations}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Loading recommendations...</p>
        )}
      </div>
      </>
  )
}

export default Recommendations