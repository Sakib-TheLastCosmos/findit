"use client";

import { useState } from "react";
import { Camera, Upload, XCircle } from "lucide-react";

interface SignUpProps {
    name: string;
    email: string;
}

export default function SignUpPage({ name, email }: SignUpProps) {
    const [fullName, setFullName] = useState(name);
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [facebook, setFacebook] = useState("");
    const [dob, setDob] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", fullName);
        formData.append("email", email); // keep hidden
        formData.append("mobile", mobile);
        formData.append("address", address);
        formData.append("facebook", facebook);
        formData.append("dob", dob);
        if (profilePic) formData.append("profilePic", profilePic);

        try {
            const res = await fetch("/api/profile/update", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to sign up");

            window.location.href = "/"; // redirect to home after successful sign up
        } catch (err: unknown) {
            alert((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

        const removeImage = () => setProfilePic(null);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-lg w-full bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 text-gray-200">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-white">
                    Complete Your Profile
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block font-semibold mb-1">Mobile Number</label>
                        <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                            placeholder="Enter mobile number"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block font-semibold mb-1">Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                            placeholder="Enter your address"
                            rows={2}
                            required
                        />
                    </div>

                    {/* Facebook */}
                    <div>
                        <label className="block font-semibold mb-1">Facebook ID (optional)</label>
                        <input
                            type="text"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                            placeholder="Enter Facebook username or ID"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block font-semibold mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                            required
                        />
                    </div>

                    {/* Profile Picture */}
                    {/* Image Upload */}
                    <div>
                        <label className="block font-semibold mb-2">Upload Profile Photo</label>
                        <div className="flex flex-col items-center justify-center w-full">
                            <label
                                htmlFor="file-upload"
                                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer bg-gray-900 hover:border-blue-400 hover:bg-gray-800 transition relative"
                            >
                                <Upload className="w-12 h-12 mb-2 text-gray-400" />
                                <span className="text-gray-400 text-sm text-center">
                                    Click to upload or drag and drop
                                </span>
                                {profilePic && (
                                    <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-lg shadow">
                                        <span className="text-green-400 text-xs truncate max-w-[120px]">{profilePic.name}</span>
                                        <XCircle className="w-4 h-4 text-red-500 cursor-pointer" onClick={removeImage} />
                                    </div>
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        {loading ? "Saving..." : "Complete Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
