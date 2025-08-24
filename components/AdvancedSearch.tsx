"use client";
import React, { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import LocationInput from "./LocationInput";
import { useSearchParams } from "next/navigation";

const AdvancedSearch = () => {
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("query") ?? "");
    const [statusFilter, setStatusFilter] = useState(searchParams.get("status") ?? "lost");
    const [location, setLocation] = useState(searchParams.get("location") ?? "");
    const [lat, setLat] = useState<number | null>(
        searchParams.get("lat") ? Number(searchParams.get("lat")) : null
    );
    const [lon, setLon] = useState<number | null>(
        searchParams.get("lon") ? Number(searchParams.get("lon")) : null
    );
    const [radius, setRadius] = useState(searchParams.get("radius") ?? "");
    const [author, setAuthor] = useState(searchParams.get("author") ?? "");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") ?? "");

    const today = new Date().toISOString().split("T")[0];
    const [endDate, setEndDate] = useState(searchParams.get("endDate") ?? today);

    return (
        <aside className="fixed top-20 left-0 h-[calc(100%-4rem)] w-72 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 mt-6 text-blue-400">Advanced Search</h2>

            {/* Form */}
            <form method="GET" className="flex flex-col gap-5">
                {/* Query */}
                <div>
                    <input
                        type="text"
                        name="query"
                        placeholder="Search..."
                        className="mt-4 w-full rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none transition bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter} name="status">
                        <SelectTrigger className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 text-gray-100">
                            <SelectItem value="lost">Lost</SelectItem>
                            <SelectItem value="found">Found</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Location */}
                <div>
                    <LocationInput
                        location={location}
                        setLocation={setLocation}
                        lat={lat}
                        lon={lon}
                        setLat={setLat}
                        setLon={setLon}
                        isRequired={false}
                    />
                    <input type="hidden" name="lat" value={lat ?? ""} />
                    <input type="hidden" name="lon" value={lon ?? ""} />
                    <input
                        type="number"
                        name="radius"
                        placeholder="Radius (km)"
                        className="mt-4 w-full rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none transition bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Posted by"
                        className="w-full rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none transition bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-400"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                {/* Date Range */}
                <div>
                    <label className="block mb-2 text-gray-300 text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 mb-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <label className="block mb-2 text-gray-300 text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                {/* Search & Clear */}
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mt-4 rounded-lg shadow-md"
                >
                    Search
                </Button>

                <Button
                    type="reset"
                    onClick={() => {
                        setStatusFilter("");
                        setLocation("");
                        setLat(null);
                        setLon(null);
                        setRadius("");
                        setAuthor("");
                        setStartDate("");
                        setEndDate("");
                    }}
                    className="bg-gray-100 hover:bg-red-400 text-black font-medium w-full mt-1 rounded-lg shadow-md"
                >
                    Clear Filters
                </Button>
            </form>
        </aside>
    );
};

export default AdvancedSearch;
