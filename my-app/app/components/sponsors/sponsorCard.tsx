
export default function SponsorCard({name, tier}: any) {
  let bg_color, text_color, hover;
  if (tier === "obsidian") {
    bg_color = "bg-slate-800";
    text_color = "text-purple-500";
    hover = "hover:shadow-xl hover:shadow-purple-900/50 hover:transition-color duration-300";

  }
  else if (tier === "gold") {
    bg_color = "bg-yellow-300";
    text_color = "text-orange-500";
    hover = "hover:shadow-xl hover:shadow-yellow-900/50 hover:transition-color duration-300";
  }
  else if (tier === "silver") {
    bg_color = "bg-slate-500";
    text_color = "text-blue-200";
    hover = "hover:shadow-xl hover:shadow-blue-900/50 hover:transition-color duration-300";
  }
  else if (tier === "bronze") {
    bg_color = "bg-orange-700";
    text_color = "text-red-180";
    hover = "hover:shadow-xl hover:shadow-red-900/50 hover:transition-color duration-300";
  }
  else { // if something went wrong
    bg_color = "bg-white";
    text_color = "text-red-500";
    hover = "hover:shadow-xl hover:shadow-white-900/50 hover:transition-color duration-300";
  }

  let style = "w-[10vh] h-[2.5vh] m-5 my-15 p-5 rounded-2xl " + bg_color + " " + text_color + " " + hover + " shadow-2xl rotate-[-25deg] origin-center text-center flex items-center justify-center" ;


	return (
    <div className={style}>
      {name}
    </div>
	);
};
