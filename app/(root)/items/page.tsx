import ItemList from "@/components/ItemsList";
import SearchBar from "@/components/SearchBar";
import { getBaseURL } from "@/lib/utils";
import FilterSidebar from "@/components/FilterSidebar";


  
export default async function SearchItemsPage({ searchParams }: any) {
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || "1";
  const items: any[] = [];

  const baseURL = await getBaseURL()

  const response = await fetch(`${baseURL}/api/items/list?page=${page}&query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  items.push(...data.items);

  console.log(`${baseURL}/api/items/list?page=${page}&query=${query}`)


  return (
    <div className="h-screen flex overflow-hidden  text-gray-100">

      <FilterSidebar />

      {/* Main content area */}
      <div className="flex-1 ml-64 flex flex-col pt-6">
        <div className="p-6 flex justify-center">
          {/* Search bar */}
          <SearchBar query={query} />
        </div>

        {/* Item list */}
        <div className="px-6">
          <ItemList items={items} />
        </div>
      </div>
    </div>
  );
}
