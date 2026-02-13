
export default function SponsorCard({name, tier}: any) {
  let bg_color, text_color, hover;
  if (tier === "obsidian") {
    bg_color = "bg-slate-800";
    text_color = "text-red-500";
    hover = "hover:shadow-xl hover:shadow-purple-900/50 hover:transition-color duration-300";

  }
  else if (tier === "gold") {
    bg_color = "bg-yellow-300";
    text_color = "text-orange-500";
    hover = "hover:shadow-xl hover:shadow-yellow-900/50 hover:transition-color duration-300";
  }
  else if (tier === "silver") {
    bg_color = "bg-slate-500";
    text_color = "text-gray-200";
    hover = "hover:shadow-xl hover:shadow-blue-900/50 hover:transition-color duration-300";
  }
  else if (tier === "bronze") {
    bg_color = "bg-orange-700";
    text_color = "text-yellow-200";
    hover = "hover:shadow-xl hover:shadow-red-900/50 hover:transition-color duration-300";
  }
  else { // if something went wrong
    bg_color = "bg-white";
    text_color = "text-red-500";
    hover = "hover:shadow-xl hover:shadow-white-900/50 hover:transition-color duration-300";
  }

  let style = "w-[50vh] h-[35vh] m-5 my-15 p-5 rounded-2xl " + bg_color + " " + text_color + " " + hover;
	return (
    <div className={style}>
      {name}
    </div>
	);
};
