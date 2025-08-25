import { typesenseClient } from "@/lib/typesense";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";


    // 1. Search in Typesense
    const searchResults = await typesenseClient
      .collections("users")
      .documents()
      .search({
        q: query,
        query_by: "name", // adjust fields according to your schema
        per_page: 20,
      });

    const ids: string[] = searchResults.hits?.map(
      (hit: any) => hit.document.id
    ) || [];

    if (ids.length === 0) {
      return NextResponse.json({ users: [] });
    }

    // 2. Fetch from Firebase by IDs
    const userDocs = await Promise.all(
      ids.map(async (id) => {
        const doc = await db.collection("users").doc(id).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
        return null;
      })
    );

    const users = userDocs.filter((u) => u !== null);
    console.log(users)

    // 3. Return result
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error in /api/profile/list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}