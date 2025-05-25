"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DoctorDashboard from "./components/DoctorDashboard";
const DoctorHomePage = () => {
  const router = useRouter();

  return (
    <div>
      <DoctorDashboard />
    </div>
    
  );
};

export default DoctorHomePage;
