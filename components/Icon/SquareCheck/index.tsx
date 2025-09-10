export interface SquareCheckProps {
  isChecked?: boolean;
  onClick?: () => void;
}

export default function SquareCheck({ isChecked = false, onClick }: SquareCheckProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      className="cursor-pointer"
      onClick={onClick}
    >
      <rect width=" 16" height="16" fill={isChecked ? '#66798D' : '#F0F3FA'} rx="4" />
      <path
        fill="#B6C2D9"
        fillRule="evenodd"
        d="M12.659 4.254c.415.372.457 1.02.094 1.446l-3.827 4.483a2.293 2.293 0 0 1-3.214.293L3.375 8.559a1.043 1.043 0 0 1-.156-1.44.983.983 0 0 1 1.406-.16l2.337 1.916c.14.114.341.096.459-.042l3.826-4.483a.983.983 0 0 1 1.412-.096Z"
        clipRule="evenodd"
      />
      <clipPath id="a">
        <rect width="16" height="16" fill={isChecked ? '#fff' : '#B6C2D9'} rx="4" />
      </clipPath>
    </svg>
  );
}
