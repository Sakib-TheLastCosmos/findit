import admin from "@/lib/firebaseAdmin";
import { getBaseURL } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Facebook, Phone, MessageCircle } from "lucide-react";

interface ProfileProps {
  params: Promise<any>;
}

const ProfilePage = async ({params}: ProfileProps) => {
    const {username} = await params;

  const baseURL = await getBaseURL();
  const profileResponse = await fetch(`${baseURL}/api/profile/get?profileId=${username}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const userData = await profileResponse.json();

  if (!userData || userData.error) {
    return <p className="text-center mt-12 text-red-500">Profile not found</p>;
  }

    return (
        <div className="min-h-screen pb-12">
            {/* Cover Banner */}
            <div className="h-40 w-full bg-primary relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                        <AvatarImage src={userData.profilePic || ""} alt="Profile" />
                        <AvatarFallback>{userData.name ? userData.name[0].toUpperCase() : "?"}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Name & Email */}
            <div className="mt-20 text-center">
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-gray-500">{userData.email}</p>
            </div>

            <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                {/* Profile Info Card */}
                <Card className="shadow-lg">
                    <CardHeader className="px-6 py-4">
                        <CardTitle className="text-xl font-bold">Profile Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-6 py-4">
                        {userData.mobile && (
                            <div>
                                <Label className="mb-2 text-accent">Mobile</Label>
                                <p className="text-gray-300">{userData.mobile}</p>
                            </div>
                        )}
                        {userData.address && (
                            <div>
                                <Label className="mb-2 mt-10 text-accent">Address</Label>
                                <p className="text-gray-300">{userData.address}</p>
                            </div>
                        )}
                        {userData.dob && (
                            <div>
                                <Label className="mb-2 mt-10 text-accent">Date of Birth</Label>
                                <p className="text-gray-300">{userData.dob}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Activity / Stats Card */}
                <Card className="shadow-lg md:col-span-2">
                    <CardHeader className="px-6 py-4">
                        <CardTitle className="text-xl font-bold">Activity Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 py-4 grid grid-cols-3 gap-4 text-center">
                        <div className=" rounded-lg shadow hover:shadow-md transition">
                            <h1 className="text-8xl font-semibold text-yellow-200">{userData.itemsReported || 0}</h1>
                            <p className="text-yellow-500 mt-5">Reported</p>
                        </div>
                        <div className=" rounded-lg shadow hover:shadow-md transition">
                            <h1 className="text-8xl font-semibold text-green-300">{userData.itemsFound || 0}</h1>
                            <p className="text-green-500 mt-5">Found</p>
                        </div>
                        <div className="rounded-lg shadow hover:shadow-md transition text-blue-300">
                            <h1 className="text-8xl font-semibold">{userData.itemsClaimed || 0}</h1>
                            <p className="text-blue-500 mt-5">Claimed</p>
                        </div>

                        {/* Contact Buttons */}
                        <div className="pt-10 justify-center gap-6 w-full md:col-span-2">
                                <h1 className="text-xl font-bold text-left">Contact</h1>

                            <div className="py-4 flex gap-6 w-full md:col-span-2">
                                <a
                                    href={`${userData.facebook}`}
                                    target="_blank"
                                    className="flex items-center justify-center w-14 h-14 aspect-square rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    <Facebook size={28} />
                                </a>
                                <a
                                    href={`https://wa.me/${userData.mobile}`}
                                    target="_blank"
                                    className="flex items-center justify-center w-14 h-14 aspect-square rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                                >
                                    <MessageCircle size={28} />
                                </a>
                                <a
                                    href={`tel:${userData.mobile}`}
                                    className="flex items-center justify-center w-14 h-14 aspect-square rounded-full bg-gray-800 text-white hover:bg-gray-900 transition"
                                >
                                    <Phone size={28} />
                                </a>

                            </div>

                        </div>


                    </CardContent>
                </Card>
            </div>

            {/* Recent Items Section */}
            <div className="max-w-5xl mx-auto mt-8 px-6">
                <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {userData.recentItems?.length > 0 ? (
                        userData.recentItems.map((item: any) => (
                            <Card key={item.id} className="shadow hover:shadow-md transition">
                                <CardContent className="px-4 py-4">
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-gray-500 text-sm">{item.category}</p>
                                    <p className="text-gray-500 text-sm">{item.date}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">No recent items</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
