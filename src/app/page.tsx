import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="grid grid-rows-[auto,1fr] min-h-screen w-full p-2">
      <Header />
      <Hero />
    </section>
  );
}
