import Image from "next/image";

export default function MlhBanner({src} : {src: string}) {
	return (
		<a
			id="mlh-trust-badge"
			href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
			target="_blank"
			className="
				block w-20 desktop:max-w-25 h-auto fixed right-2 desktop:right-5 top-0 z-10000
				opacity-50% transition-all duration-75 ease-in hover:opacity-80
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
		</a>
	);
}
