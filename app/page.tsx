import Goal from "@/components/Goal";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10">
      <Navbar />
      <Goal />
    </main>
  );
}
