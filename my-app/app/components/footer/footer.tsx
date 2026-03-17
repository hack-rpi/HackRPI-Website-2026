export default function Footer() {
	return (
		<div className="h-screen w-full bg-transparent" id="footer">
			<div className="h-[50vh]" />
			<div className="rounded-xl w-[calc(100%-2.5rem)] border-gBlack border-1 text-2xl mx-5 bottom-5 h-[50vh] relative flex flex-col text-center bg-gBlack">
				<div className="relative w-full h-[90%] flex flex-row">
					<div className="relative z-10 w-1/2 h-full p-0 flex flex-col p-30 items-center">
						<div className="relative z-10 w-fit h-full p-0 flex flex-col pt-0 pl-0">
						<div
							className="text-blue-200 text-[1.75rem] leading-none ml-3 mr-auto"
							style={{ fontFamily: "Calibri, sans-serif" }}
							id="title-animate"
						>
							November 7, 8th • Troy, NY
						</div>

						<div
							className="text-[10rem] font-bold leading-none tracking-tight"
							style={{ fontFamily: "Calibri, sans-serif" }}
							id="title-animate"
						>
							HackRPI
						</div>

							<div
								className="text-blue-200 text-[2.3rem] font-mono leading-none ml-auto mr-5"
								style={{ clipPath: "inset(0px 100% 0px 0px)" }}
								id="title-animate"
							>
								IN THE CLOUDS
							</div>
						</div>
					</div>
					<div className="relative z-10 mt-7 w-1/2 h-full font-mono flex flex-col items-center justify-center text-center p-30">
						<span className="">Darrin Communications Center</span>
						<span className="">@ Rensselaer Polytechnic Institute</span>
						<span className="">110 8th St, Troy, NY 12180</span>
						<div className="mt-6 flex items-center justify-center gap-4 text-blue-200">
							<a
								href="https://discord.com/invite/BkDVUmrufa"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Discord"
								className="rounded-full border border-blue-200/50 p-2.5 hover:bg-blue-200/15 transition-colors"
							>
								<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
									<path d="M20.3 4.37a19.8 19.8 0 0 0-4.95-1.51.07.07 0 0 0-.07.03c-.21.37-.44.85-.6 1.23a18.27 18.27 0 0 0-5.34 0 12.64 12.64 0 0 0-.61-1.23.08.08 0 0 0-.07-.03A19.74 19.74 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 6.07 3.07.08.08 0 0 0 .09-.03c.47-.65.88-1.34 1.23-2.06a.08.08 0 0 0-.04-.11 13 13 0 0 1-1.88-.9.08.08 0 0 1-.01-.13l.38-.29a.08.08 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.08.08 0 0 1 .09.01l.38.29a.08.08 0 0 1-.01.13 12.34 12.34 0 0 1-1.88.9.08.08 0 0 0-.04.11c.36.72.77 1.41 1.23 2.06a.08.08 0 0 0 .09.03 19.79 19.79 0 0 0 6.07-3.07.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.15-1.08-2.15-2.4 0-1.32.95-2.4 2.15-2.4 1.2 0 2.17 1.09 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4 0-1.32.95-2.4 2.15-2.4 1.2 0 2.17 1.09 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Z" />
								</svg>
							</a>
							<a
								href="https://www.instagram.com/hack.rpi/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="rounded-full border border-blue-200/50 p-2.5 hover:bg-blue-200/15 transition-colors"
							>
								<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
									<path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.33 1.72a.96.96 0 1 0 .01 1.92.96.96 0 0 0-.01-1.92ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.72A3.28 3.28 0 1 1 8.72 12 3.29 3.29 0 0 1 12 8.72Z" />
								</svg>
							</a>
							<a
								href="https://www.tiktok.com/@hackrpi"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="TikTok"
								className="rounded-full border border-blue-200/50 p-2.5 hover:bg-blue-200/15 transition-colors"
							>
								<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
									<path d="M14.5 3c.2 1.7 1.2 3.2 2.7 4.1 1 .6 2.2.9 3.3.9V11a8.73 8.73 0 0 1-3.5-.7v5.4a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.1a3.2 3.2 0 1 0 2.8 3.1V3h0Z" />
								</svg>
							</a>
							<a
								href="mailto:hackrpi@rpi.edu"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Email"
								className="rounded-full border border-blue-200/50 p-2.5 hover:bg-blue-200/15 transition-colors"
							>
								<svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" aria-hidden="true">
									<path d="M3 6h18v12H3z" strokeWidth="1.8" />
									<path d="m4 7 8 6 8-6" strokeWidth="1.8" />
								</svg>
							</a>
							<a
								href="https://www.linkedin.com/company/hackrpiorganizingteam/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn"
								className="rounded-full border border-blue-200/40 p-2.5 hover:bg-blue-200/15 transition-colors"
							>
								<svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
									<path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.5 9.75h2.88V19H5.5V9.75Zm4.5 0h2.75v1.26h.04c.38-.72 1.31-1.48 2.7-1.48 2.88 0 3.41 1.9 3.41 4.38V19h-2.87v-4.5c0-1.07-.02-2.45-1.49-2.45-1.49 0-1.72 1.16-1.72 2.37V19H10V9.75Z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
				<span className="block w-full pb-4 text-center text-lg font-mono">Made with ❤️ by HackRPI, © 2026 HackRPI</span>
			</div>
		</div>
	);
}