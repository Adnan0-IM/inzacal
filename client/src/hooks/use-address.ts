import axios from "axios";
// Prefer env vars; do not hardcode tokens
const TOKEN = "pk.93404536e1228147a1f312b0e74f5ce5";
const HOST = "eu1.locationiq.com";

export type Address = {
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  district?: string;
  county?: string;
  city?: string;
  town?: string;
  village?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  display?: string;
} | null;

export type LocationIQResponse = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address?: Record<string, string>;
  boundingbox?: [string, string, string, string];
};

async function reverseGeocode(lat: number, lon: number): Promise<Address> {
  if (!TOKEN) throw new Error("Missing VITE_LOCATIONIQ_TOKEN");
  const url = `https://${HOST}/v1/reverse.php?key=${encodeURIComponent(
    TOKEN
  )}&lat=${lat}&lon=${lon}&format=json&addressdetails=1&normalizeaddress=1`;

  const response = await axios.get<LocationIQResponse>(url, {
    headers: { Accept: "application/json" },
    validateStatus: () => true,
  });

  if (response.status === 429) {
    throw new Error("Rate limited by LocationIQ (429)");
  }
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Reverse geocode failed: ${response.status}`);
  }

  const data = response.data;
  const a = data.address || {};
  const city =
    a.city ||
    a.town ||
    a.village ||
    a.municipality ||
    a.city_district ||
    a.state_district;
  const suburb =
    a.suburb || a.neighbourhood || a.hamlet || a.district || a.county;
  const postcode = a.postcode;
  const display =
    data.display_name || [suburb, city].filter(Boolean).join(", ");

  return {
    road: a.road,
    neighbourhood: a.neighbourhood,
    suburb,
    district: a.district,
    county: a.county,
    city,
    state: a.state,
    postcode,
    country: a.country,
    country_code: a.country_code,
    display,
  };
}


import { useEffect, useState } from "react";
import { useLocation } from "@/hooks/use-location";
export function useAddress() {
  const { location, loading, error } = useLocation();
  const [address, setAddress] = useState<Address | null>(null);
  const [addrError, setAddrError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      reverseGeocode(location.latitude, location.longitude)
        .then((addr) => {
          setAddress(addr);
          setAddrError(null);
        })
        .catch((err) => {
          setAddress(null);
          setAddrError(err.message || "Reverse geocoding failed");
        });
    } else {
      setAddress(null);
      setAddrError(null);
    }
  }, [location]);

  return { address, loading, error: error || addrError };
}


