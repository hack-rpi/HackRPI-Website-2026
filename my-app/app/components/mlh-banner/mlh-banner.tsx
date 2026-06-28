import Image from "next/image";
import Link from "next/link";

export default function MlhBanner({src} : {src: string}) {
  src = "/mlh-badges/mlh-trust-badge-2027-white.svg";
	return (
		<div>
			<Link
				id="mlh-trust-badge"
				href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
				target="_blank"
				rel="noopener noreferrer"
				className="trust-badge
					bg-green block w-20 desktop:max-w-25 h-auto fixed right-2 desktop:right-5 top-0 z-10000
					transition-all duration-200 ease-out hover:scale-110
				"
			>
				<Image
					src={src}
					alt="Major League Hacking 2027 Hackathon Season"
					width={0}
					height={0}
					className="w-auto h-auto"
					preload={true}
				/>
			</Link>
		</div>
	);
}
