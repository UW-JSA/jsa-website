"use client";
import Image from "next/image";
import EventCards from "@/components/EventCards";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center h-screen lg:p-40 md:p-20 sm:p-10 p-5">
        <div className="flex flex-col text-center sm:text-left gap-5">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold">
            University of Waterloo Japanese Student Association
          </h1>
          <p className="lg:text-2xl md:text-xl sm:text-md text-sm">
            A central hub for all things UWJSA.
          </p>
        </div>
        <Image src="/logo.png" alt="Logo" width={500} height={500} />
      </div>
      <EventCards />
    </div>
  );
}
