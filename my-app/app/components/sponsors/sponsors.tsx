import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';
import sponsors from '../../../public/sponsors/sponsors.json';
import { useRef, useEffect } from 'react';

export default function Sponsors() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const drawRainEnabled = false; // Set to true to display rain effect

    useEffect(() => {
        // Exit early inside the hook instead of wrapping the hook in an if-statement
        if (!drawRainEnabled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w = 0;
        let h = 0;
        let animationFrameId: number;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        const resize = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();

        const NUM_DROPS = 120;
        const drops = Array.from({ length: NUM_DROPS }, () => ({
            x: Math.random() * (w + 200) - 100,
            y: Math.random() * (h + 100) - 100,
            l: Math.random() * 40 + 25,
            speed: Math.random() * 3 + 4,
            raincolor: Math.floor(Math.random() * 100 + 100),
        }));

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            const topFadeEnd = h * 0.15;
            const fadeStart = h * 0.6;
            const fadeEnd = h * 0.95;
            const SPEED_MULTIPLIER = 4;

            ctx.lineWidth = 1;

            drops.forEach((d) => {
                let alphaMultiplier = 1;

                if (d.y < topFadeEnd) {
                    alphaMultiplier = Math.max(0, d.y / topFadeEnd);
                } else if (d.y > fadeStart) {
                    alphaMultiplier = 1 - Math.min((d.y - fadeStart) / (fadeEnd - fadeStart), 1);
                }

                const alpha = 0.5 * alphaMultiplier;

                if (alpha > 0.05) {
                    ctx.strokeStyle = `rgba(${d.raincolor}, ${d.raincolor}, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(d.x, d.y);
                    ctx.lineTo(d.x + 1, d.y + d.l);
                    ctx.stroke();
                }

                d.y += d.speed * SPEED_MULTIPLIER;
                d.x += 1.5;

                if (d.y > fadeEnd) {
                    d.y = -d.l - 20;
                    d.x = Math.random() * (w + 200) - 100;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        }

        draw();

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
    }, [drawRainEnabled]); // Added to dependency array

    return (
        <div className="relative min-h-0 md:min-h-screen overflow-hidden p-5 py-20 md:py-5 gap-10 flex flex-col">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 [will-change:transform]"
            />
            <h2 className="relative text-center left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wider text-white/90 uppercase font-mono z-10">
                Thank you to our sponsors that make HackRPI possible!
            </h2>
            
            <div className="flex flex-row justify-center flex-wrap gap-6 sm:gap-10 z-10 max-w-7xl mx-auto w-full">
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