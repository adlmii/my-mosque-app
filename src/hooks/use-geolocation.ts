"use client";

import { useState } from "react";

interface LocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

export function useGeolocation() {
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const getLocation = () => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      } as GeolocationPositionError);
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { location, getLocation };
}