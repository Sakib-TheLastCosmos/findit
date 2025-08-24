import { auth } from "@/auth";
import { uploadFile } from "@/lib/cloudinary";
import { db, FieldValue } from "@/lib/firebaseAdmin";
import { typesenseClient } from "@/lib/typesense";
import { getUsername } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const lat = formData.get("lat") as number | null;
    const lon = formData.get("lon") as number | null;
    const date = formData.get("date") as string;
    const status = formData.get("status") as string;
    const image = formData.get("image") as File | null;

    if (!title || !slug) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const docRef = db.collection("items").doc(slug);

    const session = await auth();
    const username = getUsername(session?.user?.email ?? "");

    let imageUrl = "";
    if (image) {
      const result = await uploadFile(image, "items");
      imageUrl = result.secure_url;
    }

    const authorDocRef = db.collection("users").doc(username);
    const authorDocSnap = await authorDocRef.get();
    const authorData = authorDocSnap.data();

    // Add to Firebase
    const itemData = {
      title,
      subtitle: subtitle || "",
      description: description || "",
      location: {
        place: location || "",
        lat: lat || null,
        lon: lon || null
      },
      date: date || "",
      status: status || "lost",
      imageUrl: imageUrl || "",
      slug,
      uploadedAt: FieldValue.serverTimestamp(),
      author: {
        username: username,
        name: authorData?.name || "",
        profilePic: authorData?.profilePic || ""
      }
    };

    await docRef.set(itemData);

    // Convert date string to int64 timestamp
    const dateInt64 = date ? Math.floor(new Date(date).getTime()) : undefined;

    await typesenseClient.collections("items").documents().upsert({
      title,
      subtitle: subtitle || "",
      location: lat && lon ? [Number(lat), Number(lon)] : undefined, // [lat, lon] for geopoint
      date: dateInt64,
      status: status || "lost",
      slug,
      uploadedAt: Date.now(), // client time in milliseconds
      author_username: username,
      author_name: authorData?.name || "",
    });



    return new Response(JSON.stringify({ message: "Item reported successfully", id: slug }), { status: 200 });
  } catch (error: unknown) {
    console.error("Error reporting item:", (error as Error).message);
    return new Response(JSON.stringify({ message: "Internal server error", error: (error as Error).message }), { status: 500 });
  }
}
