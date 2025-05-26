"use client";
import * as React from "react";

interface PatientData {
  id: string;
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: "waiting" | "prescription";
}

// StatusBadge 컴포넌트
interface StatusBadgeProps {
  status: string;
  type: "waiting" | "prescription";
}

function StatusBadge({ status, type }: StatusBadgeProps) {
  const colorClasses = {
    waiting: {
      text: "text-[#0CA147]",
      bg: "bg-[#73E484]/20",
      dot: "bg-[#0CA147]",
    },
    prescription: {
      text: "text-sky-600",
      bg: "bg-sky-500/20",
      dot: "bg-sky-600",
    },
  };

  const { text, bg, dot } = colorClasses[type];

  return (
    <div
      className={`flex gap-1 justify-center items-center px-3 py-1 rounded-2xl ${bg} min-h-7`}
    >
      <div
        className={`flex shrink-0 self-stretch my-auto w-2 h-2 ${dot} rounded-full`}
        aria-hidden="true"
      />
      <div className={`self-stretch my-auto ${text}`}>{status}</div>
    </div>
  );
}

// TableHeaderCell 컴포넌트
interface TableHeaderCellProps {
  label: string;
  flex: string;
  paddingLeft?: string;
}

function TableHeaderCell({
  label,
  flex,
  paddingLeft = "px-2.5",
}: TableHeaderCellProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center self-stretch ${paddingLeft} py-3 my-auto min-h-12 ${flex}`}
    >
      <div className="flex items-center w-full">
        <h2 className="self-stretch my-auto text-sm font-bold opacity-80 text-zinc-900">
          {label}
        </h2>
        <div className="flex gap-2.5 justify-center items-center self-stretch py-1 pr-2 pl-2 my-auto w-6 min-h-6">
          <div className="self-stretch my-auto w-[9px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/daf2dd82521443d5bc3a21bfdf9ce9fbcd283287?placeholderIfAbsent=true"
              className="object-contain w-full aspect-[1.29] fill-zinc-200"
              alt="Sort ascending"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/4eeb6611068f29a92990bf960430d28403469d5f?placeholderIfAbsent=true"
              className="object-contain w-full aspect-[1.43] fill-zinc-200"
              alt="Sort descending"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// PatientTableHeader 컴포넌트
function PatientTableHeader() {
  return (
    <div className="flex items-center w-full rounded-xl bg-slate-100 bg-opacity-50 min-h-12">
      <TableHeaderCell label="등록번호" flex="flex-[0.8]" />
      <TableHeaderCell label="환자명" flex="flex-[0.7]" />
      <TableHeaderCell label="생년월일" flex="flex-[0.8]" />
      <TableHeaderCell label="성별" flex="flex-[0.5]" />
      <TableHeaderCell label="S/A" flex="flex-[0.6]" />
      <TableHeaderCell label="담당 의사" flex="flex-[0.7]" />
      <TableHeaderCell label="치료 처방 기간" flex="flex-[1.5]" />
      <TableHeaderCell label="환자 등록일" flex="flex-[1.2]" />
      <TableHeaderCell label="최종 처방일" flex="flex-[1.2]" />
      <TableHeaderCell label="처방 상태" flex="flex-[0.8]" paddingLeft="pl-3" />
    </div>
  );
}

// PatientTableRow 컴포넌트
interface PatientTableRowProps {
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: "waiting" | "prescription";
}

function PatientTableRow({
  registrationNumber,
  patientName,
  birthDate,
  gender,
  sa,
  doctor,
  treatmentPeriod,
  registrationDate,
  lastPrescriptionDate,
  status,
  statusType,
}: PatientTableRowProps) {
  return (
    <div className="flex items-center w-full min-h-[68px] text-sm text-zinc-900">
      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto flex-[0.8] whitespace-nowrap min-h-[68px]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {registrationNumber}
        </div>
      </div>

      <div className="gap-2.5 self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] text-ellipsis text-zinc-900 flex-[0.7] truncate">
        {patientName}
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.8]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {birthDate}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.5]">
        <div className="opacity-80 text-zinc-900">{gender}</div>
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto flex-[0.6] whitespace-nowrap min-h-[68px]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {sa}
        </div>
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[0.7]">
        <div className="self-stretch my-auto opacity-80 text-ellipsis text-zinc-900 truncate">
          {doctor}
        </div>
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[1.5]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {treatmentPeriod}
        </div>
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto min-h-[68px] flex-[1.2]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {registrationDate}
        </div>
      </div>

      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-7 my-auto whitespace-nowrap min-h-[68px] flex-[1.2]">
        <div className="self-stretch my-auto opacity-80 text-zinc-900 truncate">
          {lastPrescriptionDate}
        </div>
      </div>

      <div
        className={`flex flex-col justify-center items-start self-stretch py-5 pl-3 my-auto font-bold leading-none text-center whitespace-nowrap min-h-[68px] flex-[0.8] ${statusType === "prescription" ? "pr-1" : ""}`}
      >
        <StatusBadge status={status} type={statusType} />
      </div>
    </div>
  );
}

// 더미 데이터
const dummyPatients: PatientData[] = [
  {
    id: "1",
    registrationNumber: "82864",
    patientName: "박명수",
    birthDate: "980530",
    gender: "남",
    sa: "M/9m7d",
    doctor: "-",
    treatmentPeriod: "-",
    registrationDate: "2025.01.30 (화)",
    lastPrescriptionDate: "-",
    status: "처방대기",
    statusType: "waiting",
  },
  {
    id: "2",
    registrationNumber: "82865",
    patientName: "김철수",
    birthDate: "950315",
    gender: "남",
    sa: "M/12m3d",
    doctor: "김의사",
    treatmentPeriod: "3개월",
    registrationDate: "2025.01.29 (월)",
    lastPrescriptionDate: "2025.01.28",
    status: "처방대기",
    statusType: "waiting",
  },
  {
    id: "3",
    registrationNumber: "82866",
    patientName: "이영희",
    birthDate: "921025",
    gender: "여",
    sa: "F/6m15d",
    doctor: "박의사",
    treatmentPeriod: "2주",
    registrationDate: "2025.01.28 (일)",
    lastPrescriptionDate: "2025.01.25",
    status: "처방대기",
    statusType: "waiting",
  },
  {
    id: "4",
    registrationNumber: "82867",
    patientName: "정민호",
    birthDate: "880710",
    gender: "남",
    sa: "M/1y2m",
    doctor: "최의사",
    treatmentPeriod: "1개월",
    registrationDate: "2025.01.27 (토)",
    lastPrescriptionDate: "2025.01.20",
    status: "처방대기",
    statusType: "waiting",
  },
  {
    id: "5",
    registrationNumber: "82868",
    patientName: "강수진",
    birthDate: "990425",
    gender: "여",
    sa: "F/8m10d",
    doctor: "이의사",
    treatmentPeriod: "6개월",
    registrationDate: "2025.01.26 (금)",
    lastPrescriptionDate: "2025.01.22",
    status: "처방대기",
    statusType: "waiting",
  },
  {
    id: "6",
    registrationNumber: "82869",
    patientName: "윤지현",
    birthDate: "930812",
    gender: "여",
    sa: "F/4m5d",
    doctor: "김의사",
    treatmentPeriod: "2개월",
    registrationDate: "2025.01.25 (목)",
    lastPrescriptionDate: "2025.01.18",
    status: "처방전",
    statusType: "prescription",
  },
  {
    id: "7",
    registrationNumber: "82870",
    patientName: "오세훈",
    birthDate: "871203",
    gender: "남",
    sa: "M/2y1m",
    doctor: "박의사",
    treatmentPeriod: "4개월",
    registrationDate: "2025.01.24 (수)",
    lastPrescriptionDate: "2025.01.15",
    status: "처방전",
    statusType: "prescription",
  },
  {
    id: "8",
    registrationNumber: "82871",
    patientName: "한소희",
    birthDate: "960318",
    gender: "여",
    sa: "F/11m20d",
    doctor: "최의사",
    treatmentPeriod: "1주",
    registrationDate: "2025.01.23 (화)",
    lastPrescriptionDate: "2025.01.12",
    status: "처방전",
    statusType: "prescription",
  },
];

// 메인 PatientTable 컴포넌트
function PatientTable() {
  return (
    <div className="mt-7 w-full overflow-x-auto">
      <PatientTableHeader />
      
      <div className="w-full">
        {dummyPatients.map((patient, index) => (
          <React.Fragment key={patient.id}>
            <PatientTableRow
              registrationNumber={patient.registrationNumber}
              patientName={patient.patientName}
              birthDate={patient.birthDate}
              gender={patient.gender}
              sa={patient.sa}
              doctor={patient.doctor}
              treatmentPeriod={patient.treatmentPeriod}
              registrationDate={patient.registrationDate}
              lastPrescriptionDate={patient.lastPrescriptionDate}
              status={patient.status}
              statusType={patient.statusType}
            />
            {index < dummyPatients.length - 1 && (
              <img
                src="https://cdn.builder.io/api/v1/image/assets/304aa4871c104446b0f8164e96d049f4/c914df031f0a54b8061f5d8235a95b70eec4cdf0?placeholderIfAbsent=true"
                className="object-contain w-full stroke-[0.4px] stroke-slate-400"
                alt=""
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PatientTable; 