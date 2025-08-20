import Image from "next/image";
import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import ItemList from "@/components/ItemsList";

export default async function Home({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const items: any[] = [];

  if (!query) {
    // Fetch all items if no query is provided
    const response = await fetch(`http://localhost:3001/api/items/list?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    items.push(...data.items);
  }

  return (
    <>
      <Hero />
      <SearchBar query={query} />
      <h1 className="text-3xl font-semibold mt-10 px-10">
        {query ? "Search results for: " + query : "All Items"}
      </h1>
      <ItemList items={items} />
    </>
  );
}
