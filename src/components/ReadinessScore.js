import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MAP_API_KEY = "AIzaSyAs69xs8PnRAYu14WB4MaCGhKQov-8jOFM"; // Your API Key

const ReadinessScore = () => {
  const location = useLocation();
  const { selectedVillage } = location.state || {}; // Get village from ReadinessForm

  const [villageData, setVillageData] = useState([]);
  const [villageDetails, setVillageDetails] = useState(null);

  // Default location (Girnare)
  const defaultLocation = { lat: 20.0743, lng: 73.6610 };

  // Load village dataset from public folder
  useEffect(() => {
    fetch("/villageDataset.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("📂 Loaded Village Dataset:", data); // Debugging

        setVillageData(data);
        const village = data.find(
          (v) => v["Habitation Name"].trim() === selectedVillage?.trim()
        );

        if (village && village.Latitude && village.Longitude) {
          console.log("✅ Found Village:", village);
          setVillageDetails({
            lat: parseFloat(village.Latitude),
            lng: parseFloat(village.Longitude),
          });
        } else {
          console.error("❌ Village not found in dataset, defaulting to Girnare");
          setVillageDetails(defaultLocation); // Fallback to Girnare
        }
      })
      .catch((error) => {
        console.error("❌ Error loading dataset:", error);
        setVillageDetails(defaultLocation); // Ensure fallback even on error
      });
  }, [selectedVillage]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      {/* Village Name Section */}
      <h1 className="text-3xl font-bold mt-4">
        {selectedVillage ? selectedVillage : "Girnare"}
      </h1>

      {/* Google Map Section */}
      <div className="mt-6 w-full max-w-4xl h-96">
        <LoadScript googleMapsApiKey={MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={villageDetails || defaultLocation} // Use village details or fallback to Girnare
            zoom={12}
          >
            <Marker position={villageDetails || defaultLocation} />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* About Village Section (Unchanged) */}
      <div className="mt-6 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">About {selectedVillage}</h2>
        <p className="text-gray-300 mb-4">
          According to Census 2011, the location code of **Giranare** village is **549962**. It is located in **Deola Tehsil** of **Nashik District**, Maharashtra, India.  
          The village is **31 km** from Deola (sub-district HQ) and **93 km** from Nashik (district HQ).  
          As per 2009 stats, **Girnare is the Gram Panchayat** of this village.
        </p>

        {/* Key Facts Table */}
        <div className="bg-gray-700 p-4 rounded-md shadow">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-900 text-gray-200">
                <th className="border border-gray-600 px-4 py-2">Attribute</th>
                <th className="border border-gray-600 px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="border border-gray-600 px-4 py-2">Total Area</td>
                <td className="border border-gray-600 px-4 py-2">1681.47 hectares</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Total Population</td>
                <td className="border border-gray-600 px-4 py-2">2,993</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Male Population</td>
                <td className="border border-gray-600 px-4 py-2">1,562</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Female Population</td>
                <td className="border border-gray-600 px-4 py-2">1,431</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Sex Ratio</td>
                <td className="border border-gray-600 px-4 py-2">916 females per 1000 males</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Literacy Rate</td>
                <td className="border border-gray-600 px-4 py-2">69.60%</td>
              </tr>
              <tr>
                <td className="border border-gray-600 px-4 py-2">Households</td>
                <td className="border border-gray-600 px-4 py-2">582</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggestions Section (Unchanged) */}
      <div className="mt-6 w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Development Suggestions for Girnare</h2>
        <ul className="text-gray-300 list-disc list-inside space-y-2">
          <li><strong>Schools Needed:</strong> 3</li>
          <li><strong>Hospitals Needed:</strong> 1</li>
          <li><strong>Railway Access:</strong> Consider developing a closer railway link.</li>
          <li><strong>Education Programs:</strong> Conduct literacy programs, night schools, or digital learning initiatives.</li>
          <li><strong>Market Access:</strong> Develop local markets to reduce dependence on distant towns.</li>
        </ul>
      </div>

    </div> 
  );
};

export default ReadinessScore;
