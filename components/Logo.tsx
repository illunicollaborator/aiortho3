import React from "react";

const Logo = ({ fontSize }: { fontSize?: string }) => {
  return (
    <h1 className={`text-[color:var(--aiortho-primary)] font-bold ${fontSize}`}>
      AIOrtho
    </h1>
  );
};

export default Logo;
