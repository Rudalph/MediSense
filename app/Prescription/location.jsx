// "use client";
// import React, { useState } from 'react';
// import { LuNewspaper } from "react-icons/lu";

// const location = () => {
//     const [location, setLocation] = useState(null);
//     const [facilities, setFacilities] = useState([]);
//     const [mapUrl, setMapUrl] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const getLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const coords = {
//                     lat: position.coords.latitude,
//                     lon: position.coords.longitude
//                 };
//                 setLocation(coords);
//                 fetchMedicalFacilities(coords.lat, coords.lon);
//             });
//         }
//     };

//     const fetchMedicalFacilities = async (latitude, longitude) => {
//         setLoading(true);
//         try {
//             const response = await fetch("http://127.0.0.1:5000/find_medical_facilities", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ latitude, longitude, radius: 5000 })
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setFacilities(data.facilities);
//                 setMapUrl("http://127.0.0.1:5000/get_map");
//             } else {
//                 alert("No medical facilities found.");
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//         setLoading(false);
//     };

//     return (
//         <div>
//             <div className='fixed bottom-0 right-0 hidden md:block overflow-y-scroll no-scrollbar'>
//                 <div className="drawer drawer-end">
//                     <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                     <div className="drawer-content">
//                         <label htmlFor="my-drawer-4" className="btn drawer-button bg-transparent shadow-none">
//                             <LuNewspaper size={20} className='text-[LuNewspaper]' />
//                         </label>
//                     </div>
//                     <div className="drawer-side overflow-y-scroll no-scrollbar">
//                         <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//                         <div className="p-4 min-h-full bg-base-200 text-base-content mt-24 w-[1000px]">
//                             <button className="btn mb-4 bg-transparent border border-[#1A2238] text-[#1A2238] hover:bg-[#1A2238] hover:text-white" onClick={getLocation}>
//                                 Get Location
//                             </button>
//                             {location && <p>Lat: {location.lat}, Lon: {location.lon}</p>}

//                             {loading && <p>Loading medical facilities...</p>}
                            
//                             {facilities.length > 0 && (
//                                 <div>
//                                     <h2 className="text-lg font-bold mb-2">Medical Facilities</h2>
//                                     <div className="overflow-x-auto">
//                                         <table className="table table-zebra w-full">
//                                             <thead>
//                                                 <tr>
//                                                     <th>Name</th>
//                                                     <th>Type</th>
//                                                     <th>Distance (km)</th>
//                                                     <th>Address (km)</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {facilities.map((facility, index) => (
//                                                     <tr key={index}>
//                                                         <td>{facility.name}</td>
//                                                         <td>{facility.type}</td>
//                                                         <td>{facility.distance}</td>
//                                                         <td>{facility.address}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     {mapUrl && (
//                                         <iframe
//                                             src={mapUrl}
//                                             width="100%"
//                                             height="300px"
//                                             className="mt-4 border border-gray-300 rounded"
//                                         ></iframe>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default location;

//ABOVE CODE IS OF IMPORTANCE -> WITHOUT FILTER FEATURE

"use client";
import React, { useState } from 'react';
import { LuNewspaper } from "react-icons/lu";

const Location = () => {
    const [location, setLocation] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [mapUrl, setMapUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('all');

    const facilityTypes = [
        'all',
        'hospital',
        'pharmacy',
        'medical-facility',
        'doctor',
        'healthcare-facility'
    ];

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                setLocation(coords);
                fetchMedicalFacilities(coords.lat, coords.lon, selectedType);
            });
        }
    };

    const fetchMedicalFacilities = async (latitude, longitude, facilityType) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/find_medical_facilities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    latitude, 
                    longitude, 
                    radius: 5000,
                    facilityType: facilityType === 'all' ? null : facilityType
                })
            });

            const data = await response.json();
            if (response.ok) {
                setFacilities(data.facilities);
                // Add timestamp to force map refresh
                setMapUrl(`http://127.0.0.1:5000/get_map?t=${new Date().getTime()}`);
            } else {
                alert("No medical facilities found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setSelectedType(newType);
        if (location) {
            fetchMedicalFacilities(location.lat, location.lon, newType);
        }
    };

    return (
        <div>
            <div className='fixed bottom-0 right-0 hidden md:block overflow-y-scroll no-scrollbar'>
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-4" className="btn drawer-button bg-transparent shadow-none">
                            <LuNewspaper size={20} className='text-[LuNewspaper]' />
                        </label>
                    </div>
                    <div className="drawer-side overflow-y-scroll no-scrollbar">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="p-4 min-h-full bg-base-200 text-base-content mt-24 w-[1000px]">
                            <button className="btn mb-4 bg-transparent border border-[#1A2238] text-[#1A2238] hover:bg-[#1A2238] hover:text-white" onClick={getLocation}>
                                Get Location
                            </button>
                            {location && <p>Lat: {location.lat}, Lon: {location.lon}</p>}

                            {loading && <p>Loading medical facilities...</p>}
                            
                            {facilities.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-bold mb-2">Medical Facilities</h2>
                                    <div className="mb-4">
                                        <label className="mr-2">Filter by type:</label>
                                        <select 
                                            value={selectedType}
                                            onChange={handleTypeChange}
                                            className="select select-bordered"
                                        >
                                            {facilityTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Distance (km)</th>
                                                    <th>Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {facilities.map((facility, index) => (
                                                    <tr key={index}>
                                                        <td>{facility.name}</td>
                                                        <td>{facility.type}</td>
                                                        <td>{facility.distance}</td>
                                                        <td>{facility.address}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {mapUrl && (
                                        <iframe
                                            src={mapUrl}
                                            width="100%"
                                            height="300px"
                                            className="mt-4 border border-gray-300 rounded"
                                        ></iframe>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;