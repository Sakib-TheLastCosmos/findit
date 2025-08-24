import ItemList from "@/components/ItemsList";
import SearchBar from "@/components/SearchBar";
import AdvancedSearch from "@/components/AdvancedSearch";
import { getBaseURL } from "@/lib/utils";
import ItemsPageWrapper from "./ItemsPageWrapper";

export default async function SearchItemsPage({ searchParams }: any) {
  const searchParamsData = await searchParams;

  const query = searchParamsData?.query || "";
  const status = searchParamsData?.status || "";
  const author = searchParamsData?.author || "";
  const location = searchParamsData?.location || "";
  const lat = searchParamsData?.lat || "";
  const lon = searchParamsData?.lon || "";
  const radius = searchParamsData?.radius || "";
  const startDate = searchParamsData?.startDate || "";
  const endDate = searchParamsData?.endDate || "";

  const items: any[] = [];

  const baseURL = await getBaseURL();

  const itemsRes = await fetch(
    `${baseURL}/api/items/list?query=${query}&status=${status}&author=${author}&location=${location}&lat=${lat}&lon=${lon}&radius=${radius}&startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const itemsData = await itemsRes.json();
  items.push(...itemsData.items);

  return (
    <ItemsPageWrapper query={query} items={items} />
  );
}
