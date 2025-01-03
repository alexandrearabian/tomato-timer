import { Timer } from "./components/Timer";

export default function Home({ maxTime }: { maxTime: number }) {
  return (
    <>
      <Timer maxTime={maxTime} />
    </>
  );
}
