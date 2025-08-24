// app/api/items/list/route.ts
import { db } from "@/lib/firebaseAdmin";
import { typesenseClient } from "@/lib/typesense";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const query = url.searchParams.get("query") || "*"; // default to match all
    const status = url.searchParams.get("status");
    const author = url.searchParams.get("author");
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    const radius = url.searchParams.get("radius");
    const startDate = url.searchParams.get("startDate"); // mm-dd-yyyy
    const endDate = url.searchParams.get("endDate"); // mm-dd-yyyy

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const pageSize = 20;

    // Build Typesense filter string
    const filters: string[] = [];
    if (status) filters.push(`status:=${status}`);
    if (author) filters.push(`author_username:=${author}`);
    if (lat && lon && radius) {
      filters.push(`location:(${lat}, ${lon}, ${radius} km)`);
    }

    // Add date filter if startDate or endDate exists
    const startTimestamp = startDate
      ? Math.floor(new Date(`${startDate}T00:00:00`).getTime() / 1000)
      : undefined;

    const endTimestamp = endDate
      ? Math.floor(new Date(`${endDate}T23:59:59`).getTime() / 1000)
      : undefined;
    if (startTimestamp && endTimestamp) {
      filters.push(`date:>=${startTimestamp} && date:<=${endTimestamp}`);
    } else if (startTimestamp) {
      filters.push(`date:>=${startTimestamp}`);
    } else if (endTimestamp) {
      filters.push(`date:<=${endTimestamp}`);
    }

    const filterBy = filters.length ? filters.join(" && ") : undefined;

    // Search in Typesense and only fetch stored fields we need
    const searchResult = await typesenseClient
      .collections("items")
      .documents()
      .search({
        q: query,
        query_by: "title,subtitle,author_name",
        filter_by: filterBy,
        sort_by: "uploadedAt:desc",
        per_page: pageSize,
        page,
        include_fields: "slug",
      });

    // Extract slugs from Typesense results
    const slugs = searchResult?.hits?.map((hit: any) => hit.document.slug) || [];
    console.log(slugs);

    // Fetch full documents from Firebase
    const items = await Promise.all(
      slugs.map(async (slug: string) => {
        const doc = await db.collection("items").doc(slug).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      })
    );

    return new Response(JSON.stringify({ page, items: items.filter(Boolean) }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error fetching items:", (error as Error).message);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: (error as Error).message }),
      { status: 500 }
    );
  }
}
