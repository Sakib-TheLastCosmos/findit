import type { NextRequest } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
        console.log(slug)


    if (!slug) {
      return new Response(JSON.stringify({ message: "Missing slug" }), { status: 400 });
    }

    // Reference to the document with ID = slug
    const docRef = db.collection("items").doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return new Response(JSON.stringify({ message: "Item not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ id: docSnap.id, ...docSnap.data() }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Error fetching item:", (error as Error).message);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: (error as Error).message }),
      { status: 500 }
    );
  }
}