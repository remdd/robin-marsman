import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <h1 className="text-6xl font-bold text-white tracking-widest">
        robin marsman
      </h1>
      <div className="h-1 w-[60%] bg-white my-16" />
      <p className="py-4 px-8 bg-white text-lg">
        Debut album <strong>"Red world dawning"</strong> coming soon
      </p>
      <Navigation />
    </PageContainer>
  );
}
