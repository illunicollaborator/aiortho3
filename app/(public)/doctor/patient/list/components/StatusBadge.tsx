import React from "react";

type StatusBadgeProps = {
  status: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = "";
  let textColor = "";
  let dotColor = "";

  switch (status) {
    case "완료":
      bgColor = "rgba(218, 223, 233, 0.8)";
      textColor = "#66798D";
      dotColor = "#66798D";
      break;
    case "처방전":
      bgColor = "rgba(13, 142, 255, 0.16)";
      textColor = "rgba(0, 125, 235, 1)";
      dotColor = "rgba(0, 125, 235, 1)";
      break;
    case "처방대기":
      bgColor = "rgba(115, 228, 132, 0.2)";
      textColor = "rgba(12, 161, 71, 1)";
      dotColor = "rgba(12, 161, 71, 1)";
      break;
    default:
      bgColor = "rgba(218, 223, 233, 0.8)";
      textColor = "#66798D";
      dotColor = "#66798D";
  }

  return (
    <div
      className="rounded-[14px] flex min-h-7 px-3 py-1 items-center gap-1 justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="rounded-full flex my-auto w-2 h-2 flex-shrink-0"
        style={{ backgroundColor: dotColor }}
      />
      <div className="self-stretch my-auto" style={{ color: textColor }}>
        {status}
      </div>
    </div>
  );
};

export default StatusBadge;
