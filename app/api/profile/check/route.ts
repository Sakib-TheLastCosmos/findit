import { auth } from "@/auth"; // your NextAuth setup
import admin from "@/lib/firebaseAdmin"; // your initialized Firebase Admin SDK
import { getUsername } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth(); // get NextAuth session
  if (!session?.user?.email) {
    return NextResponse.json({ complete: false });
  }

  try {
    const username = getUsername(session.user.email);
    const snap = await admin.firestore().collection("users").doc(username).get();

    if (!snap.exists) {
      return NextResponse.json({ complete: false });
    }

    const data = snap.data();

    // Check required fields
    const required = ["mobile", "address", "dob"];
    const complete = required.every((f) => data?.[f] && data[f].trim() !== "");

    return NextResponse.json({ complete });
  } catch (err) {
    console.error("Error checking profile completion:", err);
    return NextResponse.json({ complete: false });
  }
}
