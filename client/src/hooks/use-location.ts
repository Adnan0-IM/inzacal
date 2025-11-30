import { useEffect, useState } from "react";

type Location = { latitude: number; longitude: number } | null;

type UseLocationState = {
  location: Location;
  loading: boolean;
  error: string | null;
};

export function useLocation(): UseLocationState {
  const [state, setState] = useState<UseLocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // SSR/unsupported guard
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: "Geolocation is not supported in this environment.",
      });
      return;
    }

    const opts: PositionOptions = {
      enableHighAccuracy: true, // set true if you need GPS precision
      timeout: 10000, // 10s
      maximumAge: 60_000, // cache last position for 1 min
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setState({
          location: { latitude, longitude },
          loading: false,
          error: null,
        });
      },
      async (error) => {
        // Common code 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
        const message = `Geolocation error (${error.code}): ${error.message}`;

        // Fallback: try IP-based location (approximate, city-level)
        try {
          const res = await fetch("https://api.ipify.org/?format=json", {
            cache: "no-store",
          });
          if (res.ok) {
            const data = await res.json();
            if (
              data &&
              typeof data.latitude === "number" &&
              typeof data.longitude === "number"
            ) {
              setState({
                location: {
                  latitude: data.latitude,
                  longitude: data.longitude,
                },
                loading: false,
                error: null,
              });
              return;
            }
          }
        } catch {
          // ignore
        }
        setState({ location: null, loading: false, error: message });
      },
      opts
    );
  }, []);

  return state;
}


