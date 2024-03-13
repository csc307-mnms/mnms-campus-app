import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LogoutHeader from "../components/LogoutHeader";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BackendURI } from "../data/data";

function Shuttle() {
  const [userLocation, setUserLocation] = useState(null);
  const [shuttleOptions, setShuttleOptions] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetch(`${BackendURI}/shuttle/`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((stop) => ({
          label: stop.stopName,
          day: stop.activeDay,
          night: stop.activeNight,
          value: stop,
        }));
        let new_options = [];
        options.forEach((stop) => {
          if (
            new Date().getHours() <= 18 &&
            new Date().getHours() >= 7 &&
            stop.day
          ) {
            new_options.push(stop);
          } else if (
            new Date().getHours() <= 7 ||
            (new Date().getHours() >= 18 && stop.night)
          ) {
            new_options.push(stop);
          }
        });

        setShuttleOptions(new_options);
      })
      .catch((error) => {
        console.error("Error fetching stops:", error);
      });
  }, []);

  useEffect(() => {
    async function fetchUserLocation() {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    }
    fetchUserLocation();
  }, []);

  async function getUserLocation() {
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

  const handleShuttleSelect = (selectedOption) => {
    setSelectedStop(selectedOption.value);
  };

  const handleDirections = () => {
    if (!selectedStop) return;
    console.log(new Date().getHours());
    console.log("userLocation", userLocation);

    const currentPosition = new window.google.maps.LatLng({
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    });

    const destinationPosition = new window.google.maps.LatLng({
      lat: selectedStop.latitude,
      lng: selectedStop.longitude,
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
      <div>
        <LogoutHeader text="Shuttle Map" />
        <Select
          options={shuttleOptions}
          onChange={handleShuttleSelect}
          placeholder="Search for a Shuttle Stop"
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
        <NavBar activePage="shuttle" />
      </div>
    </div>
  );
}

export default Shuttle;
