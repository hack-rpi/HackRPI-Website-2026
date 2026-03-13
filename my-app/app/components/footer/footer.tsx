export default function Footer() {
	return (
		<div className="h-screen w-full bg-transparent" id="footer">
			<div className="h-[50vh]" />
			<div className="rounded-xl w-[calc(100%-2.5rem)] border-gBlack border-1 text-2xl mx-5 bottom-5 h-[50vh] relative flex flex-row text-center bg-gBlack">
				<div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-25 pl-30">
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
				<div className="relative z-10 w-[100vw] font-mono h-[100vh] flex flex-col pt-45 content-center items-center">
					<span className="">Darrin Communications Center</span>
					<span className="">@ Rensselaer Polytechnic Institute</span>
					<span className="">110 8th St, Troy, NY 12180</span>
				</div>
			</div>
			<span>Made with ❤️ by HackRPI. © 2026 HackRPI</span>
		</div>
	);
}