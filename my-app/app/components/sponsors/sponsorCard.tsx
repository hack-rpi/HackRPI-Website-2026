
export default function SponsorCard({name, tier}: any) {
  let bg_color, text_color;
  if (tier === "obsidian") {
    bg_color = "bg-slate-800";
    text_color = "text-red-500";
  }
  else if (tier === "gold") {
    bg_color = "bg-yellow-300";
    text_color = "text-orange-500";
  }
  else if (tier === "silver") {
    bg_color = "bg-slate-500";
    text_color = "text-gray-200";
  }
  else if (tier === "bronze") {
    bg_color = "bg-orange-700";
    text_color = "text-yellow-200";
  }
  else { // if something went wrong
    bg_color = "bg-white";
    text_color = "text-red-500";
  }

  let style = "w-[50vh] h-[35vh] m-5 my-15 p-5 " + bg_color + " " + text_color;
	return (
    <div className={style}>
      {name}
    </div>
	);
};
