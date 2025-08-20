import Image from "next/image";
import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import ItemList from "@/components/ItemsList";
import { headers } from "next/headers";

export default async function Home({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const items: any[] = [];

  const host = (await headers()).get("host"); // e.g., localhost:3000 or your deployed domain
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  if (!query) {
    // Fetch all items if no query is provided
    const response = await fetch(`${baseUrl}/api/items/list?page=${page}`, {
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
