
import Link from "next/link";

type Prop = {
  href: string,
  title: string,
}

export default function NavLink({href, title}: Prop) {
  return (
    <Link
      href={href}
      className="
        mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
        transition-all duration-200 bg-linear-to-r from-[#00ff7f] to-[#87CEEB]
        hover:bg-size-[100%_2px]
      "
      >
      {title}
    </Link>
  )
}
