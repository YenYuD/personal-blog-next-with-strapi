import { FirstBlock } from "@/containers/landing-page";
export default function HomePage() {
  return (
    <>
      <div
        className="flex justify-start flex-col items-center pt-[64px] bg-gradient-container h-full"
      >
        <div className="relative flex flex-col z-10 justify-evenly w-full h-full max-w-6xl px-4">
          <FirstBlock />
        </div>
      </div>
    </>
  );
}
