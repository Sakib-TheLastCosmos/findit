"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
      <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 text-blue-400">Filters</h2>

        <div className="mb-5">
          <label className="block mb-2 text-gray-300 text-sm font-medium">Status</label>
          <Select onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-100">
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="found">Found</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-300 text-sm font-medium">Category</label>
          <Select onValueChange={(value) => setCategoryFilter(value || null)}>
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

        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mt-4 rounded-lg shadow-md"
          onClick={() => {
            setStatusFilter(null);
            setCategoryFilter(null);
            setSearch("");
          }}
        >
          Clear Filters
        </Button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 ml-64 flex flex-col overflow-auto">
        {/* Navbar */}
        <nav className="fixed top-0 left-64 right-0 h-16 bg-gray-900 border-b border-gray-800 flex items-center px-6 z-20">
          <h1 className="text-2xl font-bold text-blue-400">Search Items</h1>
        </nav>

        {/* Content */}
        <div className="mt-16 p-6">
          {/* Search bar */}
          <div className="mb-6">
            <Input
              placeholder="Search by title or location"
              className="bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4 py-2 shadow-sm w-full max-w-3xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Item list */}
          <ItemList items={filteredItems} />
        </div>
      </div>
    </div>
  );
}
