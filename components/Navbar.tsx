import React from "react";
import Link from "next/link";
import { getBaseURL } from "@/lib/utils";
import { auth, signOut, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Navbar = async () => {

  const baseURL = await getBaseURL()
  const userCompleteResponse = await fetch(`${baseURL}/api/profile/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString()
    },
  })

  const userComplete = (await userCompleteResponse.json())
  console.log(userComplete)
  if (userComplete.signedUp && !userComplete.complete) {
    // Show a message or a link to complete the profile
    redirect("/signup");
  }

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white px-8 py-6 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold">Findit</div>
      <ul className="flex space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/report">Report Item</Link></li>
        <li><Link href="/items">Search Items</Link></li>
        <li>
          {userComplete.signedUp ? (
            // If signed in -> show Sign Out button
            <form
              action={async () => {
                "use server";
                await signOut({redirectTo: "/"});
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          ) : (
            // If not signed in -> show Sign In button
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Sign In</button>
            </form>
          )}
        </li>
        <li><Link href="/help">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
