"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "@/auth";

const Navbar = () => {
  const router = useRouter();
  const [userComplete, setUserComplete] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkProfile = async () => {
      const res = await fetch("/api/profile/check", { cache: "no-store" });
      const data = await res.json();
      setUserComplete(data.complete);

      if (!data.complete) {
        router.push("/signup");
      }
    };

    checkProfile();
  }, [router]);

  const handleSignIn = async () => {
    await signIn("google");
    const res = await fetch("/api/profile/check", { cache: "no-store" });
    const data = await res.json();
    if (!data.complete) {
      router.push("/signup");
    } else {
      router.refresh();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white px-8 py-6 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold">Lost & Found</div>
      <ul className="flex space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/report">Report Item</Link></li>
        <li><Link href="/items">Search Items</Link></li>
        <li>
          {userComplete ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button onClick={handleSignIn}>Sign In</button>
          )}
        </li>
        <li><Link href="/help">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
