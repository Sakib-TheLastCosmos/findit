import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import ItemList from "@/components/ItemsList";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const query = searchParams?.query || "";
  const page = searchParams?.page || "1";
  const items: any[] = [];

  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  if (!query) {
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
