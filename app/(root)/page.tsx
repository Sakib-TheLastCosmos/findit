import { getBaseURL } from "@/lib/utils";
import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import ItemList from "@/components/ItemsList";

export default async function Home({ searchParams }: any) {
  const query = (await searchParams)?.query || "";
  const page = (await searchParams)?.page || "1";
  const items: any[] = [];

  const baseUrl = await getBaseURL()


    const response = await fetch(`${baseUrl}/api/items/list?page=${page}&query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    items.push(...data.items);


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
