import admin from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { error: "Missing profileId parameter" },
        { status: 400 }
      );
    }

    const docRef = admin.firestore().collection("users").doc(profileId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const data = docSnap.data();

    return NextResponse.json({
      profileId,
      ...data,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
