import { basePath, getAssetPath } from "@/utils/paths";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-[30vh] bg-cover bg-center bg-no-repeat relative before:absolute before:inset-0 before:bg-black before:opacity-50"
      style={{
        backgroundImage: `url("${getAssetPath("/img/mars/mars-1.jpg")}")`,
      }}
    >
      <h1 className="text-6xl font-bold text-white tracking-widest relative z-10">
        robin marsman
      </h1>
    </div>
  );
}
