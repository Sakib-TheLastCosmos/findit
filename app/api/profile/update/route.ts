import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Firestore Admin SDK
import { uploadFile } from "@/lib/cloudinary";
import { auth } from "@/auth";
import { getUsername } from "@/lib/utils";
import { typesenseClient } from "@/lib/typesense";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    console.log("session", session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const username = getUsername(session?.user?.email)

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = session?.user?.email as string; // Use email from session to prevent spoofing
    const mobile = formData.get("mobile") as string;
    const address = formData.get("address") as string;
    const facebook = formData.get("facebook") as string;
    const dob = formData.get("dob") as string;
    const profilePicFile = formData.get("profilePic") as File | null;

    let profilePicUrl: string | null = null;

    if (profilePicFile) {
      const result = await uploadFile(profilePicFile, "profiles");
      profilePicUrl = result.secure_url;
    }

    // ✅ Admin SDK Firestore works directly
    await db.collection("users").doc(username).set({
      name,
      email,
      mobile,
      address,
      facebook,
      dob,
      profilePic: profilePicUrl,
      updatedAt: new Date(),
    });

    await typesenseClient.collections("users").documents().upsert({
      id: username,
      name,
      username
    })

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error updating profile:", (err as Error).message);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
