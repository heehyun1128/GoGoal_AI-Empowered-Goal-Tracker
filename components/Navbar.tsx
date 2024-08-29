"use client";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-screen lg:px-20 px-8" >
      <Link href="/">
      <h1 className="text-4xl font-extrabold text-gray-900 puff-in-hor text-focus-in ">GoGoal</h1>

      </Link>
      <Link className="text-focus-in" href="https://github.com/heehyun1128/goal_tracker">Github</Link>
    </header>
  );
};

export default Navbar;
