// app/items/[slug]/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getBaseURL } from "@/lib/utils";
interface ItemDetailsPageProps {
  params: Promise<any>
}

export default async function ItemDetailsPage({
  params,
}: ItemDetailsPageProps) {
  const { slug } = await params;

  // Mock data for now
  const baseURL = await getBaseURL()
  const response = await fetch(`${baseURL}/api/items/${slug}`); // Fetch item details from API
  console.log(response)
  const item = await response.json();

  const statusColor =
    item.status === "lost"
      ? "bg-red-500/20 text-red-400"
      : "bg-green-500/20 text-green-400";

  const actionButtonLabel =
    item.status === "lost" ? "I Have Found This" : "This is Mine";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Back Button */}
      <div className="p-6">
        <Link href="/items">
          <Button
            variant="ghost"
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg px-4 py-2"
          >
            &larr; Back to Search
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="flex-1 bg-gray-800">
            <Image
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-[350px] object-cover md:h-full"
              width={1000}
              height={1000}
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col p-8">
            {/* Title + Status */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-blue-400">{item.title}</h1>
              <Badge
                className={`${statusColor} px-3 py-1 text-sm rounded-full capitalize`}
              >
                {item.status}
              </Badge>
            </div>

            {/* Short Description */}
            <p className="text-gray-300 leading-relaxed">{item.subtitle}</p>

            {/* Metadata */}
            <div className="border-t border-gray-700 mt-6 pt-6 space-y-2 text-gray-200">
              <div>
                <span className="font-semibold text-gray-100">Category: </span>
                {item.category}
              </div>
              <div>
                <span className="font-semibold text-gray-100">Location: </span>
                {item.location}
              </div>
              <div>
                <span className="font-semibold text-gray-100">Date: </span>
                {item.date}
              </div>
            </div>

            {/* Poster Profile
            <div className="border-t border-gray-700 mt-6 pt-6 flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={item.postedBy.avatarUrl} />
                <AvatarFallback>
                  {item.postedBy.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-100">{item.postedBy.name}</p>
                <p className="text-sm text-gray-400">Posted this item</p>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-2 shadow-md">
                {actionButtonLabel}
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg px-6 py-2 shadow-md">
                Contact {item.status === "lost" ? "Reporter" : "Finder"}
              </Button>
            </div>
          </div>
        </div>

        {/* Elaborate Description Section */}
        <div className="bg-gray-900 mt-8 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            More Details
          </h2>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
