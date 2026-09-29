const fs = require('fs');
const path = require('path');

const VALID = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function naturalKey(name) {
    return name
        .toLowerCase()
        .split(/(\d+)/)
        .map((p) => (/\d+/.test(p) ? Number(p) : p));
}

async function processImages() {
    const photosDir = path.join(process.cwd(), "public", "lastYearPhotos");
    
    // Ensure public/last-year/photos target directory exists
    const targetDir = path.join(process.cwd(), "public", "last-year", "photos");
    fs.mkdirSync(targetDir, { recursive: true });

    if (!fs.existsSync(photosDir)) return;

    const entries = fs.readdirSync(photosDir, { withFileTypes: true });

    const files = entries
        .filter((e) => e.isFile())
        .map((e) => e.name)
        .filter((n) => VALID.has(path.extname(n).toLowerCase()))
        .sort((a, b) => {
            const ak = naturalKey(a);
            const bk = naturalKey(b);
            const len = Math.max(ak.length, bk.length);
            for (let i = 0; i < len; i++) {
                const av = ak[i];
                const bv = bk[i];
                if (av === undefined) return -1;
                if (bv === undefined) return 1;
                if (av === bv) continue;
                if (typeof av === "number" && typeof bv === "number") return av - bv;
                if (typeof av === "number") return -1;
                if (typeof bv === "number") return 1;
                return av < bv ? -1 : 1;
            }
            return 0;
        });

    const urls = files.map((f) => `/lastYearPhotos/${f}`);

    // Save output to public/last-year/photos/photos.json
    fs.writeFileSync(
        path.join(targetDir, "photos.json"),
        JSON.stringify({ photos: urls }, null, 2)
    );
    console.log(`Generated public/last-year/photos/photos.json with ${urls.length} photos.`);
}

processImages();