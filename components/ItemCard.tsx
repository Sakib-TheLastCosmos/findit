import Link from "next/dist/client/link";
import React from "react";

type ItemCardProps = {
  item: {
    title: string;
    description: string;
    location?: string;
    date?: string;
    imageUrl?: string;
    status?: string;
    slug?: string;
  };
}

const ItemCard: React.FC<ItemCardProps> = ({
  item
}) => {
  return (
    <div className="bg-[#1a1a1a] text-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-80">
      {/* Image */}
      <div className="w-full h-48 flex items-center justify-center bg-black">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover h-full w-full max-h-48"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold truncate">{item.title}</h2>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              item.status === "lost"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {item.status?.toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>

        <div className="text-xs text-gray-400">
          📍 {item.location}
        </div>
        <div className="text-xs text-gray-500">
          📅 {item.date}
        </div>

        <Link href={`/items/${item.slug}`}>
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"> View Details </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
