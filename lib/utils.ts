import { clsx, type ClassValue } from "clsx"
import { redirect } from "next/navigation"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify (text: string) {
    const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")       // Replace spaces with -
    .replace(/[^\w\-]+/g, "")   // Remove all non-word chars
    .replace(/\-\-+/g, "-");    // Replace multiple - with single -

  // Append short random ID
  const randomId = Math.random().toString(36).substring(2, 8); // 6 chars
  return `${slug}-${randomId}`;
}

export async function isProfileCompleted () {

  // On client, browser automatically sends cookies
  const res = await fetch("/api/profile/check", { cache: "no-store" });
  const { complete } = await res.json();
  console.log("hello")
  return complete;
}

export function getUsername(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) return email; // no @ found, return full string
  return email.slice(0, atIndex);
}