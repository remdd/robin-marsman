import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";

export default function Home() {
  return (
    <PageContainer>
      <H1>robin marsman</H1>
      <div className="h-1 w-48 bg-white my-16" />
      <p className="py-4 px-8 bg-white text-lg">
        Debut album <strong>"Red world dawning"</strong> coming soon
      </p>
    </PageContainer>
  );
}
