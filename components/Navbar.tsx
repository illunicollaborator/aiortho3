import React from "react";
import Logo from "./Logo";
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <>
      <nav className="h-14 w-full flex items-center mx-7 shrink-0">
        <Logo fontSize="text-3xl"/>
      </nav>
      <Separator className="w-full text-[color:var(--ortho-gray-200)]" />
    </>
  );
};

export default Navbar;
