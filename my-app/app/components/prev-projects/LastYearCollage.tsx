"use client";

import { useEffect, useState } from "react";

export default function LastYearCollage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/last-year/photos", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPhotos(data.photos ?? []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to load photos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="py-6 text-center text-gray-500">Loading photos…</p>;
  if (error) return <p className="py-6 text-center text-red-600">Error: {error}</p>;
  if (!photos.length) return <p className="py-6 text-center text-gray-500">No photos found.</p>;

  return (
    <div className="flex w-full items-center justify-center">
      {/* Masonry-style layout using CSS columns */}
      <div className="w-full columns-1 gap-3 p-5 [column-fill:balance] sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {photos.map((src) => (
          <div
            key={src}
            className="animate-fadeIn mb-3 break-inside-avoid overflow-hidden rounded-xl opacity-0 shadow-sm"
          ></div>
        ))}
      </div>
    </div>
  );
}
