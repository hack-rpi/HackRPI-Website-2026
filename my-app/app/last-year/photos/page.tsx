"use client";

import "@/app/globals.css";
import LastYearCollage from "@/app/components/prev-projects/LastYearCollage";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

export default function PastYearProjects() {
  return (
    <>
      <NavBar showOnScroll={false} />
      <div
        className="flex w-full flex-col items-center justify-center bg-linear-to-b from-sky-500 via-purple-500 to-purple-800 pt-[8vh]"
        id="winners"
      >
        <h2 className="m-5 p-5 text-center text-3xl font-bold">Photos from HackRPI 2025!</h2>

        <LastYearCollage />
      </div>
      <Footer />
    </>
  );
}
