"use client";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-screen px-20" >
      <Link href="/">
      <h1 className="text-4xl font-extrabold text-gray-900 ">GoGoal</h1>

      </Link>
      <Link href="">Github</Link>
    </header>
  );
};

export default Navbar;
