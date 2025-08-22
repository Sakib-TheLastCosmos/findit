import React from "react";
import { signIn, signOut } from "@/auth";
import { auth } from "firebase-admin";

interface SignInOutButtonProps {
  isSignedIn: boolean;
}

const SignInOutButton = ({ isSignedIn }: SignInOutButtonProps) => {
  return (
    <>
      {isSignedIn ? (
        // If signed in -> show Sign Out button
        <form
          action={async () => {
            "use server";
            await signOut();
            console.log("signed out")
            const session = await auth()
            console.log(session)
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
    </>
  );
};

export default SignInOutButton;
