"use client";

import "@/app/globals.css";
import LastYearCollage from "@/app/components/prev-projects/LastYearCollage";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

export default function PastYearProjects() {
  return (
    <>
      <NavBar showOnScroll={false}/>
      <div className="w-full pt-[8vh] flex items-center justify-center flex-col bg-linear-to-b from-sky-500 via-purple-500 to-purple-800" id="winners">
        <h2 className="text-3xl font-bold text-center p-5 m-5">Photos from HackRPI 2025!</h2>

        <LastYearCollage />
      </div>
      <Footer/>
    </>
  );
}
