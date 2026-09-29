"use client";

import { useEffect, useState, useMemo } from "react";

// Hook to detect screen width for responsive column counts
function useColumnCount() {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1280) setColumns(5);      // xl
            else if (width >= 1024) setColumns(4); // lg
            else if (width >= 768) setColumns(3);  // md
            else if (width >= 640) setColumns(2);  // sm
            else setColumns(1);
        };

        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    return columns;
}

export default function LastYearCollage() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const columnCount = useColumnCount();

    useEffect(() => {
        (async () => {
            try {
                // const res = await fetch("/api/last-year/photos", { cache: "no-store" });
                const res = await fetch("/lastYearPhotos/photos.json");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setPhotos(data.photos ?? []);
            } catch (e: any) {
                setError(e?.message || "Failed to load photos");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Distribute photos round-robin into columns.
    // When a new photo is added at the end of `photos`, it is appended to the bottom
    // of a column without altering the order/position of existing photos above it.
    const photoColumns = useMemo(() => {
        const cols: string[][] = Array.from({ length: columnCount }, () => []);
        photos.forEach((photo, index) => {
            cols[index % columnCount].push(photo);
        });
        return cols;
    }, [photos, columnCount]);

    // Close lightbox on 'Escape' key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedPhoto(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (loading) {
        return (
            <div className="w-full py-16 flex flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
                <p className="text-gray-400 text-sm font-mono">Loading photos…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-12 text-center">
                <p className="text-red-400 font-mono">Error: {error}</p>
            </div>
        );
    }

    if (!photos.length) {
        return (
            <div className="w-full py-12 text-center">
                <p className="text-gray-400 font-mono">No photos found.</p>
            </div>
        );
    }

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black py-10 px-4 sm:px-8 overflow-hidden">
            {/* Ambient Background Glow Accent */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto">
                {/* 
                  Flex container rendering individual vertical columns side-by-side.
                */}
                <div className="flex gap-4 items-start">
                    {photoColumns.map((colPhotos, colIndex) => (
                        <div key={colIndex} className="flex-1 flex flex-col gap-4">
                            {colPhotos.map((src, photoIndex) => (
                                <div
                                    key={src}
                                    onClick={() => setSelectedPhoto(src)}
                                    className="
                                        group relative w-full cursor-pointer overflow-hidden rounded-2xl
                                        border border-white/10 bg-white/5 backdrop-blur-sm
                                        shadow-md shadow-black/40 transition-all duration-300 ease-out
                                        hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-400/50
                                    "
                                >
                                    <img
                                        src={src}
                                        alt={`HackRPI photo ${colIndex}-${photoIndex}`}
                                        className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Hover Overlay Sheen & Zoom Icon */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-3">
                                        <span className="text-xs font-mono text-white/80">View Fullscreen</span>
                                        <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* FULLSCREEN LIGHTBOX MODAL */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
                    onClick={() => setSelectedPhoto(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors z-10"
                        aria-label="Close fullscreen view"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Expanded Image Container */}
                    <div
                        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-blue-900/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedPhoto}
                            alt="HackRPI expanded view"
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}