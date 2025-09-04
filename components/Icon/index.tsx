interface AutoLoginCheckIconProps {
  isChecked?: boolean;
  onClick?: () => void;
}

export const AutoLoginCheckIcon = ({ isChecked = false, onClick }: AutoLoginCheckIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      onClick={onClick}
      className="cursor-pointer"
    >
      <rect
        width="20"
        height="20"
        rx="4"
        fill={isChecked ? '#0054A6' : '#DADFE9'}
        stroke={isChecked ? '#0054A6' : '#DADFE9'}
        strokeWidth="1"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="2"
        d="m5 10 2.829 2.829a1 1 0 0 0 1.414 0l5.971-5.972"
      />
    </svg>
  );
};
