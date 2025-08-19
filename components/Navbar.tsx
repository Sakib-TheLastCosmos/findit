import React from 'react';
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth'; // Importing auth functions

const Navbar = async () => {
    const session = await auth(); // Get the current session

  return (
    <nav className="bg-primary text-white px-8 py-6 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        Lost & Found
      </div>

      {/* Menu Links */}
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-primary-light transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/report" className="hover:text-primary-light transition-colors">
            Report Item
          </Link>
        </li>
        <li>
          <Link href="/items" className="hover:text-primary-light transition-colors">
            Search Items
          </Link>
        </li>
        <li>
            {session?.user ? (
              <Link href="/profile" className="hover:text-primary-light transition-colors">
                {session.user.name || 'Profile'}
            </Link>
            ) : (
                <form action={async () => {
                    "use server";
                    await signIn("google")
                }}>
                    <button type="submit">Sign In</button>
                </form>
            )}
        </li>
        <li>
          <Link href="/help" className="hover:text-primary-light transition-colors">
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
