"use client";

import { useEffect, useState, useMemo, useRef } from "react";

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

// Progressive Image Item with prioritized viewport loading
function CollageImage({
    src,
    alt,
    isTopPriority,
    onClick,
}: {
    src: string;
    alt: string;
    isTopPriority: boolean;
    onClick: () => void;
}) {
    const [isVisible, setIsVisible] = useState(isTopPriority);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isTopPriority || isVisible) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px 0px" } // Pre-load 200px before scrolling into view
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isTopPriority, isVisible]);

    return (
        <div
            ref={containerRef}
            onClick={onClick}
            className="
                group relative w-full cursor-pointer overflow-hidden rounded-2xl
                border border-white/10 bg-white/5 backdrop-blur-sm
                shadow-md shadow-black/40 transition-all duration-300 ease-out
                hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-400/50
                min-h-[180px]
            "
        >
            {/* Skeleton loader animation while downloading */}
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-800/60 rounded-2xl" />
            )}

            {isVisible && (
                <img
                    src={src}
                    alt={alt}
                    loading={isTopPriority ? "eager" : "lazy"}
                    // Fetch priority ensures the top images hit the network first
                    fetchPriority={isTopPriority ? "high" : "low"}
                    onLoad={() => setIsLoaded(true)}
                    className={`
                        w-full h-auto object-cover rounded-2xl transition-all duration-500 ease-out group-hover:scale-105
                        ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"}
                    `}
                />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-3">
                <span className="text-xs font-mono text-white/80">View Fullscreen</span>
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                </div>
            </div>
        </div>
    );
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
                // Fetch the generated static photos.json directly
                const res = await fetch("/photos.json");
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

    const photoColumns = useMemo(() => {
        const cols: { src: string; globalIndex: number }[][] = Array.from(
            { length: columnCount },
            () => []
        );
        photos.forEach((photo, index) => {
            cols[index % columnCount].push({ src: photo, globalIndex: index });
        });
        return cols;
    }, [photos, columnCount]);

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

    // Mark the first top rows (e.g. initial 2 items per column) as top priority
    const priorityThreshold = columnCount * 2;

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black py-10 px-4 sm:px-8 overflow-hidden">
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto">
                <div className="flex gap-4 items-start">
                    {photoColumns.map((colPhotos, colIndex) => (
                        <div key={colIndex} className="flex-1 flex flex-col gap-4">
                            {colPhotos.map(({ src, globalIndex }) => (
                                <CollageImage
                                    key={src}
                                    src={src}
                                    alt={`HackRPI photo ${globalIndex}`}
                                    isTopPriority={globalIndex < priorityThreshold}
                                    onClick={() => setSelectedPhoto(src)}
                                />
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
                    <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors z-10"
                        aria-label="Close fullscreen view"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

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