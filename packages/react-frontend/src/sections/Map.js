import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LogoutHeader from "../components/LogoutHeader";
import NavBar from "../components/NavBar";
import Select from "react-select";

function CampusMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/buildings")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((building) => ({
          label: building.name,
          value: building,
        }));
        setBuildingOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleBuildingSelect = (selectedOption) => {
    setSelectedBuilding(selectedOption.value);
  };

  const handleDirections = () => {
    if (!selectedBuilding) return;

    getUserLocation();

    const currentPosition = new window.google.maps.LatLng({
      lat: userLocation.lat,
      lng: userLocation.lng,
    });

    const destinationPosition = new window.google.maps.LatLng({
      lat: selectedBuilding.position.lat,
      lng: selectedBuilding.position.lng,
    });

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentPosition,
        destination: destinationPosition,
        travelMode: "WALKING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      },
    );
  };

  return (
    <div className="text-center">
      <LogoutHeader text="Campus Map" />
      <Select
        options={buildingOptions}
        onChange={handleBuildingSelect}
        placeholder="Search for a building"
      />
      <button onClick={handleDirections}>Get Directions</button>
      <LoadScript googleMapsApiKey="AIzaSyDDQYpqY1kkU_HeXVNnkwryQEeKR8fusd0">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "660px" }}
          center={{ lat: 35.30081350938093, lng: -120.66024162824894 }}
          zoom={15}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
      <NavBar activePage="map" />
    </div>
  );
}

export default CampusMap;
