import { basePath, getAssetPath } from "@/utils/paths";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-[30vh] bg-cover bg-center bg-no-repeat relative before:absolute before:inset-0 before:bg-black before:opacity-50 shadow-[0_0_50px_rgba(0,0,0,0.9)_inset]"
      style={{
        backgroundImage: `url("${getAssetPath("/img/mars/mars-1.jpg")}")`,
      }}
    >
      <div className="flex flex-col items-center relative z-10">
        <h1 className="text-6xl font-bold text-white tracking-widest">
          robin marsman
        </h1>
        <div className="h-1 w-[60%] bg-white my-16" />
        <p className="text-lg text-white">
          Debut album <strong>"Red world dawning"</strong> coming soon
        </p>
      </div>
    </div>
  );
}
