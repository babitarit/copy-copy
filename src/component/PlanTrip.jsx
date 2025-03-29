// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Custom marker icon
// const customIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -35],
// });

// export default function PlanTrip() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     source: "",
//     destination: "",
//     duration: "",
//     budget: "",
//     tripPurpose: "",
//     preferences: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [coordinates, setCoordinates] = useState(null); // Store latitude & longitude

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Fetch coordinates for the destination when it changes
//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       if (!formData.destination) return;
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${formData.destination}`
//         );
//         const data = await response.json();
//         if (data.length > 0) {
//           setCoordinates({ lat: data[0].lat, lon: data[0].lon });
//         }
//       } catch (error) {
//         console.error("Error fetching coordinates:", error);
//       }
//     };

//     fetchCoordinates();
//   }, [formData.destination]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/generate_itinerary", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         navigate("/itinerary", {
//           state: {
//             ...formData,
//             itinerary: data.itinerary_text,
//             pdfPath: data.pdf_path,
//           },
//         });
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       alert("Failed to connect to backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-black text-center mb-6">
//         AI-powered Travel Itinerary Planner
//       </h1>

//       <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
//         <img
//           src="/src/assets/banner.jpg"
//           alt="Travel"
//           className="w-full lg:w-1/2 rounded-lg shadow-lg"
//         />

//         <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-1/3">
//           <h2 className="text-xl font-bold text-black mb-4">
//             Plan Your Perfect Trip
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="source"
//               placeholder="Source"
//               value={formData.source}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="text"
//               name="destination"
//               placeholder="Destination"
//               value={formData.destination}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="number"
//               name="duration"
//               placeholder="Duration (days)"
//               value={formData.duration}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="number"
//               name="budget"
//               placeholder="Budget (USD)"
//               value={formData.budget}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border rounded-lg"
//             />
//             <input
//               type="text"
//               name="preferences"
//               placeholder="Preferences (e.g., museums, food)"
//               value={formData.preferences}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//             />

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//             >
//               {loading ? "Generating..." : "Generate Itinerary"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Display the Map if Coordinates are Available */}
//       <div className="mt-10">
//         <h2 className="text-2xl font-bold text-black text-center mb-4">
//           Destination Map
//         </h2>
//         {coordinates ? (
//           <MapContainer
//             center={[coordinates.lat, coordinates.lon]}
//             zoom={13}
//             className="w-full h-96 rounded-lg shadow-lg"
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker
//               position={[coordinates.lat, coordinates.lon]}
//               icon={customIcon}
//             >
//               <Popup>
//                 <strong>{formData.destination}</strong>
//                 <br />
//                 Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         ) : (
//           <p className="text-center text-gray-500">Enter a destination to see the map.</p>
//         )}
//       </div>

//       <footer className="mt-10 bg-gray-800 text-white text-center py-4">
//         <p>&copy; 2025 Travel Planner. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

export default function PlanTrip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    duration: "",
    budget: "",
    tripPurpose: "",
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [review, setReview] = useState("");
  const [reviewsData, setReviewsData] = useState({});

  // Fetch reviews from JSON file
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/reviews.json");
        const data = await response.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      if (!formData.destination) return;
      try {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formData.destination}`
        );
        if (data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          setCoordinates({ lat, lon });

          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat,
                lon,
                units: "metric",
                appid: "85a1d7f89447acc9ba8139b3302eb562",
              },
            }
          );
          setWeather({
            temperature: weatherRes.data.main.temp,
            description: weatherRes.data.weather[0].description,
          });
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();

    // Fetch review dynamically from JSON
    setReview(reviewsData[formData.destination] || "No reviews available for this location.");
  }, [formData.destination, reviewsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/generate_itinerary", formData);
      navigate("/itinerary", {
        state: { ...formData, itinerary: data.itinerary_text, pdfPath: data.pdf_path },
      });
    } catch (error) {
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-black text-center mb-6">
        AI-powered Travel Itinerary Planner
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <img
          src="/src/assets/banner.jpg"
          alt="Travel"
          className="w-full lg:w-1/2 rounded-lg shadow-lg"
        />

        <div className="bg-white shadow-lg rounded-2xl p-8 w-full lg:w-1/3">
          <h2 className="text-xl font-bold text-black mb-4">Plan Your Perfect Trip</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            <input type="number" name="duration" placeholder="Duration (days)" value={formData.duration} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            <input type="number" name="budget" placeholder="Budget (USD)" value={formData.budget} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
            <input type="text" name="preferences" placeholder="Preferences (e.g., museums, food)" value={formData.preferences} onChange={handleChange} className="w-full p-2 border rounded-lg" />

            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
          </form>
        </div>
      </div>

      {formData.destination && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-black">Destination Details</h2>
          {weather ? (
            <p className="text-gray-700">Weather in {formData.destination}: {weather.temperature}°C, {weather.description}</p>
          ) : (
            <p className="text-gray-500">Fetching weather data...</p>
          )}
          <p className="text-gray-700 italic mt-2">{review}</p>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-black text-center mb-4">Destination Map</h2>
        {coordinates ? (
          <MapContainer center={[coordinates.lat, coordinates.lon]} zoom={13} className="w-full h-96 rounded-lg shadow-lg">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
              <Popup>
                <strong>{formData.destination}</strong>
                <br />
                Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="text-center text-gray-500">Enter a destination to see the map.</p>
        )}
      </div>
    </div>
  );
}


