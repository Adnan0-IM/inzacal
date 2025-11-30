import { useEffect, useState } from "react";
import { useLocation } from "@/hooks/use-location";

const TOKEN = import.meta.env.VITE_LOCATIONIQ_TOKEN as string | undefined;

export type Address = {
  city?: string;
  suburb?: string;
  postcode?: string;
  display?: string;
} | null;

async function reverseGeocode(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<Address> {
  if (!TOKEN) {
    throw new Error("Missing VITE_LOCATIONIQ_TOKEN");
  }

  const url = `https://us1.locationiq.com/v1/reverse.php?key=${encodeURIComponent(
    TOKEN
  )}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&format=json`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Reverse geocode failed: ${res.status} ${res.statusText}`);
  }
  const data: any = await res.json();
  const a = data?.address ?? {};

  const city =
    a.city ||
    a.town ||
    a.village ||
    a.municipality ||
    a.city_district ||
    a.state_district;

  const suburb =
    a.suburb || a.neighbourhood || a.hamlet || a.county || a.state_district;

  const postcode = a.postcode;
  const display =
    data?.display_name || [suburb, city].filter(Boolean).join(", ");

  return { city, suburb, postcode, display };
}

export function useReverseGeocode(lat?: number, lon?: number) {
  const [address, setAddress] = useState<Address>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) {
      setAddress(null);
      setLoading(false);
      setError(null);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    reverseGeocode(lat, lon, ctrl.signal)
      .then(setAddress)
      .catch((e) => {
        if (e.name !== "AbortError") setError(String(e.message || e));
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [lat, lon]);

  return { address, loading, error };
}

export function useAddress() {
  const { location } = useLocation();
  const { address, loading, error } = useReverseGeocode(
    location?.latitude,
    location?.longitude
  );
  return { address, loading, error };
}
