import React from "react";
import StatusBadge from "./StatusBadge";

// Mock data for the patient list
const patients = [
  {
    id: "82869",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "홍지원",
    treatmentPeriod: "2025.01.30 ~ 2025.01.30",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "2025.01.30 (화)",
    status: "완료",
  },
  {
    id: "82870",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "처방전",
  },
  {
    id: "82866",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "김지희",
    treatmentPeriod: "2025.01.30 ~ 2025.01.30",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "2025.01.30 (화)",
    status: "처방전",
  },
  {
    id: "82864",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "처방대기",
  },
  {
    id: "82864",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "처방대기",
  },
  {
    id: "82865",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/87d",
    doctor: "김지희",
    treatmentPeriod: "2025.01.30 ~ 2025.01.30",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "2025.01.30 (화)",
    status: "완료",
  },
  {
    id: "82864",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "완료",
  },
  {
    id: "82864",
    name: "박명수",
    birthdate: "980530",
    gender: "남",
    ageInfo: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "완료",
  },
];

// Column header component with sort icon
const ColumnHeader = ({ title, className }: { title: string; className?: string }) => (
  <div className={`flex-1 min-h-[48px] px-2.5 py-3 flex items-center justify-start ${className || ''}`}>
    <div className="flex w-full items-center justify-start">
      <div className="text-[#161621] font-bold opacity-80 flex-1">
        {title}
      </div>
      <div className="flex items-center justify-center w-6 h-6 px-2 py-1">
        <div className="w-2.5">
          {/* Sort icons would go here - using placeholders for now */}
          <div className="aspect-[1.29] object-contain object-center w-full fill-[#DADFE9]"></div>
          <div className="aspect-[1.43] object-contain object-center w-full fill-[#DADFE9]"></div>
        </div>
      </div>
    </div>
  </div>
);

// Divider line between rows
const RowDivider = () => (
  <div className="w-full h-px bg-[#8395AC] opacity-20"></div>
);

const PatientList = () => {
  return (
    <div className="mt-7 w-full sm:max-w-full">
      {/* Table Header */}
      <div className="rounded-xl bg-[rgba(241,244,249,0.5)] flex min-h-[48px] w-full">
        <ColumnHeader title="등록번호" className="flex-[0.8]" />
        <ColumnHeader title="환자명" className="flex-[0.7]" />
        <ColumnHeader title="생년월일" className="flex-[0.8]" />
        <ColumnHeader title="성별" className="flex-[0.4]" />
        <ColumnHeader title="S/A" className="flex-[0.6]" />
        <ColumnHeader title="담당 의사" className="flex-[0.7]" />
        <ColumnHeader title="치료 처방 기간" className="flex-[1.5]" />
        <ColumnHeader title="환자 등록일" className="flex-[1.2]" />
        <ColumnHeader title="최종 처방일" className="flex-[1.2]" />
        <ColumnHeader title="처방 상태" className="flex-[0.8]" />
      </div>

      {/* Table Body */}
      <div className="w-full font-normal text-sm text-[#161621] sm:max-w-full">
        {patients.map((patient, index) => (
          <React.Fragment key={index}>
            <div className="flex min-h-[68px] w-full items-center">
              {/* Registration Number */}
              <div className="flex-[0.8] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.id}
                </div>
              </div>

              {/* Patient Name */}
              <div className="flex-[0.7] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.name}
                </div>
              </div>

              {/* Birthdate */}
              <div className="flex-[0.8] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.birthdate}
                </div>
              </div>

              {/* Gender */}
              <div className="flex-[0.4] min-h-[68px] px-2.5 py-6 flex items-center justify-center">
                <div className="text-[#161621] opacity-80">
                  {patient.gender}
                </div>
              </div>

              {/* Age Info */}
              <div className="flex-[0.6] min-h-[68px] px-2.5 py-6 flex items-center justify-center">
                <div className="text-[#161621] opacity-80">
                  {patient.ageInfo}
                </div>
              </div>

              {/* Doctor */}
              <div className="flex-[0.7] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.doctor}
                </div>
              </div>

              {/* Treatment Period */}
              <div className="flex-[1.5] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.treatmentPeriod}
                </div>
              </div>

              {/* Registration Date */}
              <div className="flex-[1.2] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.registrationDate}
                </div>
              </div>

              {/* Last Prescription Date */}
              <div className="flex-[1.2] min-h-[68px] px-2.5 py-6 flex items-center justify-start">
                <div className="text-[#161621] opacity-80 truncate">
                  {patient.lastPrescriptionDate}
                </div>
              </div>

              {/* Status */}
              <div className="flex-[0.8] min-h-[68px] px-3 py-5 flex items-center justify-center">
                <StatusBadge status={patient.status} />
              </div>
            </div>
            <RowDivider />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
