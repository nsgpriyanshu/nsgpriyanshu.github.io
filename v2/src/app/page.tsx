import HomeSection from "@/components/containers/HomeSection";
import GradientBackground from "@/components/global/gradient-background";

export default function Home() {
  return (
    <GradientBackground>
    <main className="relative flex flex-col items-center justify-center px-4 !z-[999] pt-20">
        <HomeSection />
    </main>
</GradientBackground>
  );
}
