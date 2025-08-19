"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ItemList from "@/components/ItemsList";

type Item = {
  title: string;
  description: string;
  location?: string;
  date?: string;
  imageUrl?: string;
  status?: string;
  category?: string;
};

const mockItems: Item[] = [
  { title: 'Lost Wallet', description: 'Black leather wallet with ID cards', location: 'Dhaka University', date: '2025-08-17', imageUrl: '/wallet.jpg', status: 'lost', category: 'Accessories' },
  { title: 'Lost Keys', description: 'Set of house and bike keys', location: 'Gulshan', date: '2025-08-15', imageUrl: '/keys.jpg', status: 'found', category: 'Keys' },
  { title: 'Found Phone', description: 'iPhone 12 found in the park', location: 'Ramna Park', date: '2025-08-14', imageUrl: '/phone.jpg', status: 'found', category: 'Electronics' },
  { title: 'Lost Backpack', description: 'Blue backpack with books and laptop', location: 'Bashundhara City', date: '2025-08-13', imageUrl: '/backpack.jpg', status: 'lost', category: 'Bags' },
];

export default function SearchItemsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredItems = mockItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="h-screen flex overflow-hidden bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 mt-6 text-blue-400">Filters</h2>

        {/* Status */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-300 text-sm font-medium">Status</label>
          <Select>
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
          <label className="block mb-2 text-gray-300 text-sm font-medium">Category</label>
          <Select>
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
          <label className="block mb-2 text-gray-300 text-sm font-medium">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
          />
        </div>

        {/* Date */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-300 text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
          />
        </div>

        {/* Keyword Tags */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-300 text-sm font-medium">Keywords</label>
          <input
            type="text"
            placeholder="e.g., wallet, keys, phone"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100"
          />
        </div>

        {/* Reset Button */}
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mt-4 rounded-lg shadow-md">
          Clear Filters
        </Button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-64 flex flex-col pt-6">
        <div className="p-6 flex justify-center">
          {/* Search bar */}
          <input
            placeholder="Search by title or location"
            className="bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2a focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-3 shadow-sm w-full max-w-3xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Item list */}
        <div className="px-6">
          <ItemList items={filteredItems} />
        </div>
      </div>


    </div>
  );
}
