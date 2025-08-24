// Client Component (ResponsiveLayout.tsx)
"use client";

import { useState } from "react";
import ItemList from "@/components/ItemsList";
import SearchBar from "@/components/SearchBar";
import AdvancedSearch from "@/components/AdvancedSearch";
import { Filter, Settings, Settings2 } from "lucide-react";

export default function ItemsPageWrapper({ items, query }: { items: any[], query: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row text-gray-100">
      
      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-gray-900 p-4 overflow-auto">
            <AdvancedSearch />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block w-72 bg-gray-900 flex-shrink-0 p-4 md:h-screen md:overflow-auto">
        <AdvancedSearch />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col pt-6 overflow-auto">
        <div className="fixed px-4 md:px-6 mb-4 flex items-center justify-center">
          {/* Mobile toggle button */}
          <button
            className="flex md:hidden ml-2 px-4 py-1 bg-gray-700 rounded"
            onClick={() => setSidebarOpen(true)}
          >
            <Settings2 className="mr-2" />
            Filters
          </button>
        </div>

        <div className="px-4 md:px-6 flex-1">
          <ItemList items={items} />
        </div>
      </div>
    </div>
  );
}
