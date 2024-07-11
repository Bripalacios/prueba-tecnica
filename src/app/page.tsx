import { BuscadorComponent } from "@/app/components/BuscadorComponent";
import { ProductComponent } from "@/app/components/ProductComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">
        <h1 className="text-4xl font-bold text-gray-800 ">Rick and Morty</h1>
        <ProductComponent />
      </main>
    </>
  );
}