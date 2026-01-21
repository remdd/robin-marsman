import { basePath, getAssetPath } from "@/utils/paths";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black">
      <Image
        src={getAssetPath("/img/mars/mars-1.jpg")}
        alt="Mars background"
        fill
        priority
        className="object-cover contrast-125 saturate-100 hue-rotate-350"
        style={{ zIndex: 0 }}
      />
      <div className="absolute inset-0 bg-black opacity-30 z-[1]" />
      <div className="absolute inset-0 z-[2] shadow-[inset_0_0_100px_50px_rgba(0,0,0,0.4)]" />
      <div>
        <div className="flex flex-col items-center relative z-10 text-center">
          <h1 className="text-6xl font-bold text-white tracking-widest">
            robin marsman
          </h1>
          <div className="h-1 w-[60%] bg-white my-16" />
          <p className="py-4 px-8 bg-white text-lg">
            Debut album <strong>"Red world dawning"</strong> coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
