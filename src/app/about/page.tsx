import { Navigation } from "@/components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold text-white tracking-widest">
            About
          </h1>
          <Navigation />
        </div>
      </div>
    </div>
  );
}