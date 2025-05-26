"use client";
import * as React from "react";
import TitleSection from "./TitleSection";
import PatientTable from "./PatientTable";
import SearchSection from "./SearchSection";

function Sheet() {
  return (
    <section className="flex relative flex-col items-start px-8 py-9 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] max-md:px-5 w-full">
      <div className="flex z-0 flex-col w-full">
        <TitleSection title="미처방" count={2712} />
        <PatientTable />
      </div>
      
      <SearchSection />
    </section>
  );
}

export default Sheet;
