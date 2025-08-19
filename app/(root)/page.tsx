import Image from "next/image";
import Hero from "../../components/Hero";
import SearchBar from "../../components/SearchBar";
import ItemList from "@/components/ItemsList";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {

  const query = (await searchParams).query;

  const items = [
    {
      title: 'Lost Wallet',
      description: 'Black leather wallet with ID cards',
      location: 'Dhaka University',
      date: '2025-08-17',
      imageUrl: '/wallet.jpg',
      status: "lost"
    },
    {
      title: 'Lost Keys',
      description: 'Set of house and bike keys',
      location: 'Gulshan',
      date: '2025-08-15',
      imageUrl: '/keys.jpg',
      status: "found"
    },
    {
      title: 'Found Phone',
      description: 'iPhone 12 found in the park',
      location: 'Ramna Park',
      date: '2025-08-14',
      imageUrl: '/phone.jpg',
      status: "found"
    },
    {
      title: 'Lost Backpack',
      description: 'Blue backpack with books and laptop',
      location: 'Bashundhara City',
      date: '2025-08-13',
      imageUrl: '/backpack.jpg',
      status: "lost"
    }
  ];

  return (
    <>
      <Hero />
      <SearchBar query={query} />
      <h1 className="text-3xl font-semibold mt-10 px-10">
        {query ? "Search results for: " + query : "All Items"}
      </h1>
      <ItemList items={items} />
    </>
  );
}
