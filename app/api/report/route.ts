import { db, FieldValue } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, subtitle, description, location, date, status, image } = body;

    if (!title || !slug) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    // ⚠ Use `db`, not `admin.default`!
    const docRef = db.collection("items").doc(slug);

    await docRef.set({
      title,
      subtitle: subtitle || "",
      description: description || "",
      location: location || "",
      date: date || "",
      status: status || "lost",
      image: image || "",
      slug,
      uploadedAt: FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: "Item reported successfully", id: slug }), { status: 200 });
  } catch (error: unknown) {
    console.error("Error reporting item:", (error as Error).message);
    return new Response(JSON.stringify({ message: "Internal server error", error: (error as Error).message }), { status: 500 });
  }
}
