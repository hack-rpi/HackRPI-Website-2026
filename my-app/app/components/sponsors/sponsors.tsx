import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';
import sponsors from '../../../public/sponsors/sponsors.json';
import { useRef, useEffect } from 'react';

export default function Sponsors() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w = 0;
        let h = 0;
        let animationFrameId: number;

        // Cap scale at 1.5 to balance high-DPI crispness with performance
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        const resize = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();

        // 1. Group drops by color range to minimize context state changes
        const NUM_DROPS = 120; // Reduced density slightly for smooth 60fps
        const drops = Array.from({ length: NUM_DROPS }, () => ({
            x: Math.random() * (w + 200) - 100,
            y: Math.random() * (h + 100) - 100,
            l: Math.random() * 40 + 25,
            speed: Math.random() * 3 + 4,
            raincolor: Math.floor(Math.random() * 100 + 100), // Pre-floor color values
        }));

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            const topFadeEnd = h * 0.15;
            const fadeStart = h * 0.6;
            const fadeEnd = h * 0.95;
            const SPEED_MULTIPLIER = 4;

            ctx.lineWidth = 1;

            // 2. Batch single line strokes inside a single path
            ctx.beginPath();
            
            drops.forEach((d) => {
                let alphaMultiplier = 1;

                if (d.y < topFadeEnd) {
                    alphaMultiplier = Math.max(0, d.y / topFadeEnd);
                } else if (d.y > fadeStart) {
                    alphaMultiplier = 1 - Math.min((d.y - fadeStart) / (fadeEnd - fadeStart), 1);
                }

                const alpha = 0.5 * alphaMultiplier;

                if (alpha > 0.05) {
                    // Fast stroke batching without opening separate paths
                    ctx.strokeStyle = `rgba(${d.raincolor}, ${d.raincolor}, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(d.x + 1, d.y + d.l);
                    ctx.stroke();
                }

                d.y += d.speed * SPEED_MULTIPLIER;
                d.x += 1.5; // Slightly smoother drift

                if (d.y > fadeEnd) {
                    d.y = -d.l - 20;
                    d.x = Math.random() * (w + 200) - 100;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

        // 3. Debounce or throttle resize event
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 100);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div className="relative min-h-0 md:min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#5f6b7a,#2a2f4a,#111112)] p-5 py-20 md:py-5 gap-10 flex flex-col">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 [will-change:transform]"
            />
            <h2 className="relative text-center left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wider text-white/90 uppercase font-mono z-10">
                Thank you to our sponsors that make HackRPI possible!
            </h2>
            <div className="flex flex-row justify-center flex-wrap gap-10 z-10">
                {sponsors.OBSIDIAN.map((sponsor, index) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"obsidian"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
                {sponsors.GOLD.length > 0 && sponsors.GOLD.map((sponsor: any, index: number) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"gold"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
                {sponsors.SILVER.map((sponsor, index) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"silver"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
                {sponsors.BRONZE.map((sponsor, index) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"bronze"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
                {sponsors.COLLABORATORS.map((sponsor, index) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"collaborator"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
                {sponsors.TRACKS.map((sponsor, index) => (
                    <SponsorCard
                        key={index}
                        name={sponsor.name}
                        tier={"track"}
                        image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
                        link={sponsor.url}
                    />
                ))}
            </div>

            <h2 className="relative -mt-[40px] text-center top-10 left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wider text-white/90 uppercase font-mono z-10">
                More sponsors flying in soon ✈︎
            </h2>
            <div className="flex flex-row justify-center flex-wrap gap-10 z-10"></div>
        </div>
    );
}