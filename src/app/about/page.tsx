import { Navigation } from "@/components/Navigation";
import { PageContainer } from "@/components/PageContainer";

export default function About() {
  return (
    <PageContainer>
      <h1 className="text-6xl font-bold text-white tracking-widest">
        About
      </h1>
      <Navigation />
    </PageContainer>
  );
}