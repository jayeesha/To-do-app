import useCalculateTime from "./hooks/useCalculateTime";

const TimeDisplay: React.FC<{
  pomodoro: object;
  selectedControl: Number;
}> = ({ pomodoro, selectedControl }) => {
  const { minutes, seconds } = useCalculateTime({ pomodoro, selectedControl });

  return (
    <>
      {minutes < 9 ? "0" : ""}
      {minutes}:{seconds < 9 ? "0" : ""}
      {seconds}
    </>
  );
};

export default TimeDisplay;
