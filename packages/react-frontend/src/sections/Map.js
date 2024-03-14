import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LogoutHeader from "../components/LogoutHeader";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BackendURI } from "../data/data";

function CampusMap() {
  const [userLocation, setUserLocation] = useState();
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetch(`${BackendURI}/buildings/`)
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

  useEffect(() => {
    function fetchUserLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(error);
            },
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    }

    fetchUserLocation()
      .then((location) => {
        setUserLocation(location);
      })
      .catch((error) => {
        console.error("Error fetching user location:", error);
      });
  }, []);

  const handleBuildingSelect = (selectedOption) => {
    setSelectedBuilding(selectedOption.value);
  };

  const handleDirections = useCallback(() => {
    if (!selectedBuilding) return;
    console.log("userLocation", userLocation);

    const currentPosition = new window.google.maps.LatLng({
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    });

    const destinationPosition = new window.google.maps.LatLng({
      lat: selectedBuilding.lat,
      lng: selectedBuilding.lng,
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
  }, [selectedBuilding, userLocation]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const buildingName = urlParams.get("building");
    if (buildingName && userLocation) {
      const building = buildingOptions.find(
        (building) => building.label === buildingName,
      );
      if (building) {
        setSelectedBuilding(building.value);
        handleDirections();
      }
    }
  }, [buildingOptions, userLocation, handleDirections]);

  return (
    <div className="text-center">
      <div>
        <LogoutHeader text="Campus Map" />
        <Select
          options={buildingOptions}
          onChange={handleBuildingSelect}
          placeholder="Search for a building"
        />
        <button onClick={handleDirections}>Get Directions</button>
      </div>
      <div className="">
        <LoadScript googleMapsApiKey="AIzaSyDDQYpqY1kkU_HeXVNnkwryQEeKR8fusd0">
          <GoogleMap
            mapContainerStyle={{ height: "75vh", width: "100%" }}
            center={{ lat: 35.30081350938093, lng: -120.66024162824894 }}
            zoom={15}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <NavBar activePage="map" />
      </div>
    </div>
  );
}

export default CampusMap;
