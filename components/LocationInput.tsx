'use client';

import { useState, useRef } from "react";
import { XCircle } from "lucide-react";

const PHOTON_API = "https://photon.komoot.io/api/";

interface LocationInputProps {
  location: string;
  setLocation: (value: string) => void;
  lat: number | null;
  lon: number | null;
  setLat: (lat: number | null) => void;
  setLon: (lon: number | null) => void;
  isRequired?: boolean; // ✅ new prop
}

export default function LocationInput({
  location,
  setLocation,
  lat,
  lon,
  setLat,
  setLon,
  isRequired = true, // ✅ default true
}: LocationInputProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500); // 0.5s debounce
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchWithCoords = async (lat?: number, lon?: number) => {
      const url = new URL(PHOTON_API);
      url.searchParams.append("q", query);
      url.searchParams.append("limit", "20");
      if (lat && lon) {
        url.searchParams.append("lat", lat.toString());
        url.searchParams.append("lon", lon.toString());
      }

      try {
        const res = await fetch(url.toString());
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWithCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchWithCoords()
      );
    } else {
      fetchWithCoords();
    }
  };

  const selectLocation = (feature: any) => {
    const name = feature.properties.name || "";
    const city = feature.properties.city ? `, ${feature.properties.city}` : "";
    setLocation(name + city);
    setLat(feature.geometry.coordinates[1]);
    setLon(feature.geometry.coordinates[0]);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1 text-gray-300">Location</label>
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={handleInput}
          required={isRequired} // ✅ dynamic required
          disabled={!!lat && !!lon}
          placeholder="Dhaka University, Gulshan..."
          className={`w-full rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none transition
            ${lat && lon
              ? "bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400"
            }`}
        />
        {lat && lon && (
          <button
            type="button"
            onClick={() => {
              setLocation("");
              setLat(null);
              setLon(null);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-500"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {suggestions.length > 0 && !lat && !lon && (
        <ul className="absolute z-50 bg-gray-800 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-auto border border-gray-700">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => selectLocation(s)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-gray-100"
            >
              {s.properties.name}
              {s.properties.city ? `, ${s.properties.city}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
