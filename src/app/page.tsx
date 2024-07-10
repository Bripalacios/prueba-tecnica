import { BuscadorComponent } from "@/components/BuscadorComponent";
import { ProductComponent } from "@/components/ProductComponent";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 mt-8">Rick and Morty</h1>
      <BuscadorComponent />
      <ProductComponent />
    </main>
  );
}