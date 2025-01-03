import { Timer } from "./components/Timer";

export const Home = ({ maxTime }: { maxTime: number }) => {
  return (
    <>
      <Timer maxTime={maxTime} />
    </>
  );
};

export default Home;
