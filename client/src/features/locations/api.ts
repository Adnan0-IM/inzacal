import { api } from "@/lib/http";
import type { CreateLocationInput, Location } from "@/types/location";

export const fetchLocations = async () => {
  const res = await api.get("/locations");
  if (!res.data) throw new Error("Failed to fetch locations");
  return res.data as Location[];
};

export const createLocation = async (payload: CreateLocationInput) => {
  const res = await api.post("/locations", payload);
  if (!res.data) throw new Error("Failed to create location");
  return res.data as Location;
};
