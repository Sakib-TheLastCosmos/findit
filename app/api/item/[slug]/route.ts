import type { NextRequest } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

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
  } catch (error: any) {
    console.error("Error fetching item:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500 }
    );
  }
}