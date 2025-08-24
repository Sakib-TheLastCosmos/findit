'use client';

import { useState } from "react";
import { Upload, XCircle, Calendar } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { slugify } from "@/lib/utils";
import LocationInput from "@/components/LocationInput";

export default function ReportItemPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("lost");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lat || !lon) {
      alert("Please select a valid location from suggestions");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("lat", lat.toString());
    formData.append("lon", lon.toString());
    formData.append("date", date);
    formData.append("status", status);
    formData.append("slug", slugify(title));
    if (image) formData.append("image", image);

    try {
      const response = await fetch("/api/report", { method: "POST", body: formData });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to submit report");
      }
      const result = await response.json();
      window.location.href = `/items/${result.id}`;
    } catch (err: unknown) {
      console.error("Error submitting report:", (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => setImage(null);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-xl rounded-2xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Report an Item</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Lost Wallet, Found Phone..."
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              placeholder="Briefly describe the item in one line"
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Provide details about the item"
              rows={4}
              className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Location Input */}
          <LocationInput
            location={location}
            setLocation={setLocation}
            lat={lat}
            lon={lon}
            setLat={setLat}
            setLon={setLon}
          />

          {/* Date & Status */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-300">Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-gray-700 rounded-lg px-4 py-2 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
              <Select value={status} onValueChange={(val) => setStatus(val)}>
                <SelectTrigger className="w-full bg-gray-800 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-4">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border-gray-700">
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Upload Image</label>
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer bg-gray-900 hover:border-blue-400 hover:bg-gray-800 transition relative"
              >
                <Upload className="w-12 h-12 mb-2 text-gray-400" />
                <span className="text-gray-400 text-sm text-center">
                  Click to upload or drag and drop
                </span>
                {image && (
                  <div className="absolute top-2 right-2 flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-lg shadow">
                    <span className="text-green-400 text-xs truncate max-w-[120px]">{image.name}</span>
                    <XCircle className="w-4 h-4 text-red-500 cursor-pointer" onClick={removeImage} />
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}
