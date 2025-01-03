import { Timer } from "./components/Timer";

export default function Home() {
  const MAX_HOURS = 12;
  return (
    <>
      <Timer maxTime={MAX_HOURS} />
    </>
  );
}
