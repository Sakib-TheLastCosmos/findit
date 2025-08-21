import { db } from "@/lib/firebaseAdmin";
import { typesenseClient } from "@/lib/typesense";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const query = url.searchParams.get("query"); // optional
    const status = url.searchParams.get("status"); // optional filter
    const location = url.searchParams.get("location"); // optional filter

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const pageSize = 20;

    // If query or filters exist, leave empty for now
    // if (query || status || location) {
    //   return new Response(
    //     JSON.stringify({ message: "Filtering not implemented yet" }),
    //     { status: 200 }
    //   );
    // }

    if (query) {
      // 1. Search in Typesense
      const searchResult = await typesenseClient.collections("itemsIndex").documents().search({
        q: query,
        query_by: "title,subtitle",
        sort_by: "date:desc",
        per_page: pageSize,
        page,
      });

      const hits = searchResult?.hits ?? []; // safely default to empty array
      const ids = hits.map((hit: any) => hit.document.slug); // extract slugs/IDs

      // 2. Fetch full items from Firebase using these IDs in parallel
      const items = await Promise.all(
        ids.map(async (id: string) => {
          const doc = await db.collection("items").doc(id).get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        })
      );

      // Filter out any nulls (in case some IDs don't exist in Firebase)
      const filteredItems = items.filter(Boolean);

      return new Response(JSON.stringify({ page, items: filteredItems }), { status: 200 });
    }


    // No filters: fetch page-th 20 items
    const snapshot = await db
      .collection("items")
      .orderBy("uploadedAt", "desc")
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();

    const items: any[] = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return new Response(JSON.stringify({ page, items }), { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching items:", (error as Error).message);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: (error as Error).message }),
      { status: 500 }
    );
  }
}
