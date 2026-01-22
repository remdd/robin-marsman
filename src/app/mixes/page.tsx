import { Navigation } from "@/components/Navigation";

export default function Mixes() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold text-white tracking-widest">
            Mixes
          </h1>
          <Navigation />
        </div>
      </div>
    </div>
  );
}