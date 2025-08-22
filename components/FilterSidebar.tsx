'use client';
import React, { useState } from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { Button } from './ui/button';


const FilterSidebar = () => {

    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [locationFilter, setLocationFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [keywordsFilter, setKeywordsFilter] = useState("");
    const clearFilters = () => {
        setStatusFilter(null);
        setCategoryFilter(null);
        setLocationFilter("");
        setDateFilter("");
        setKeywordsFilter("");
    };


    return (
        // Sidebar
        <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 mt-6 text-blue-400">
                Filters
            </h2>

            {/* Status */}
            <div className="mb-5">
                <label className="block mb-2 text-gray-300 text-sm font-medium">
                    Status
                </label>
                <Select value={statusFilter ?? ""} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                        <SelectItem value="lost">Lost</SelectItem>
                        <SelectItem value="found">Found</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Category */}
            <div className="mb-5">
                <label className="block mb-2 text-gray-300 text-sm font-medium">
                    Category
                </label>
                <Select
                    value={categoryFilter ?? ""}
                    onValueChange={setCategoryFilter}
                >
                    <SelectTrigger className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-gray-100">
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="Keys">Keys</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Bags">Bags</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Location */}
            <div className="mb-5">
                <label className="block mb-2 text-gray-300 text-sm font-medium">
                    Location
                </label>
                <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
            </div>

            {/* Date */}
            <div className="mb-5">
                <label className="block mb-2 text-gray-300 text-sm font-medium">
                    Date
                </label>
                <input
                    type="date"
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>

            {/* Keywords */}
            <div className="mb-5">
                <label className="block mb-2 text-gray-300 text-sm font-medium">
                    Keywords
                </label>
                <input
                    type="text"
                    placeholder="e.g., wallet, keys, phone"
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
                    value={keywordsFilter}
                    onChange={(e) => setKeywordsFilter(e.target.value)}
                />
            </div>

            {/* Reset Button */}
            <Button
                onClick={clearFilters}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mt-4 rounded-lg shadow-md"
            >
                Clear Filters
            </Button>
        </aside>
    )
}

export default FilterSidebar