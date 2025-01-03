"use client";

import React, { useState, useEffect } from "react";
import TimeInput from "./TimeInput";
import { Button } from "./Button";

export const Timer = ({ maxTime }: { maxTime: number }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [workTime, setWorkTime] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [mode, setMode] = useState("Work");
  // const [cycles, setCycles] = useState(1);
  const [error, setError] = useState("");
  const [breakTime, setBreakTime] = useState(5);

  const playAlarm = () => {
    const alarmSound = new Audio("/alarm-clock.mp3");
    alarmSound.play();
  };

  const normalizeTime = (hrs: number, mins: number, secs: number) => {
    let totalSeconds = (hrs || 0) * 3600 + (mins || 0) * 60 + (secs || 0);

    const normalizedHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;

    const normalizedMinutes = Math.floor(totalSeconds / 60);
    const normalizedSeconds = totalSeconds % 60;

    return {
      hours: normalizedHours > maxTime ? maxTime : normalizedHours,
      minutes: normalizedMinutes,
      seconds: normalizedSeconds,
    };
  };

  // Function to toggle the mode between "Work" and "Break"
  const toggleMode = (isWork: boolean) => {
    playAlarm();
    setMode(isWork ? "Work" : "Break");
  };

  const handleStart = () => {
    if (!hours && !minutes && !seconds) {
      setError("Please enter a valid time.");
      return;
    }
    setError("");
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setOnBreak(false);
  };

  const handleClear = () => {
    setIsActive(false);
    setOnBreak(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleBreak = () => {
    if (!onBreak) {
      setHours(0);
      setMinutes(breakTime);
      setSeconds(0);
    } else {
      setHours(workTime.hours);
      setMinutes(workTime.minutes);
      setSeconds(workTime.seconds);
    }
  };

  useEffect(() => {
    let interval = undefined;

    if (isActive || onBreak) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            setSeconds(prevSeconds - 1);
            return seconds;
          }

          setMinutes((prevMinutes) => {
            if (prevMinutes > 0) {
              setSeconds(59);
              setMinutes(prevMinutes - 1);
              return minutes;
            }

            setHours((prevHours) => {
              if (prevHours > 0) {
                setHours(prevHours - 1);
                setMinutes(59);
                setSeconds(59);
                return hours;
              }

              setIsActive(!isActive);
              setOnBreak(!onBreak);
              handleBreak();
              toggleMode(onBreak);

              return 0;
            });

            return 0;
          });

          return 0;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, onBreak, hours, minutes, seconds, handleBreak, toggleMode]);

  const validateAndSet = (value: string, unit: string) => {
    const numValue = value === "" ? 0 : Number(value);

    if (isNaN(numValue) || numValue < 0) {
      setError(`Invalid ${unit}.`);
      return;
    }

    let newHours = hours || 0;
    let newMinutes = minutes || 0;
    let newSeconds = seconds || 0;

    if (unit === "hours") newHours = numValue;
    if (unit === "minutes") newMinutes = numValue;
    if (unit === "seconds") newSeconds = numValue;

    const normalized = normalizeTime(newHours, newMinutes, newSeconds);
    setHours(normalized.hours);
    setMinutes(normalized.minutes);
    setSeconds(normalized.seconds);
    setWorkTime((prev) => ({
      ...prev,
      hours: normalized.hours,
      minutes: normalized.minutes,
      seconds: normalized.seconds,
    }));
    setError("");
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      {isActive || onBreak ? (
        <div className="flex flex-col justify-center text-center items-center space-y-4">
          <p className="text-2xl font-bold">{mode} time!</p>
          <div className="flex justify-center text-center items-center space-x-2 text-4xl">
            {String(hours || 0).padStart(2, "0")}:
            {String(minutes || 0).padStart(2, "0")}:
            {String(seconds || 0).padStart(2, "0")}
          </div>
          <div className="flex space-x-8">
            <Button onClick={handleStop}>Pause</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center text-center items-center space-x-2 text-4xl">
            <TimeInput
              placeholder="00"
              value={hours}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateAndSet(e.target.value, "hours")
              }
            />
            :
            <TimeInput
              placeholder="00"
              value={minutes}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateAndSet(e.target.value, "minutes")
              }
            />
            :
            <TimeInput
              placeholder="00"
              value={seconds}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateAndSet(e.target.value, "seconds")
              }
            />
          </div>
          {/* <div>
            <p>How many cycles would you like?</p>
            <input
              type="number"
              placeholder="1"
              value={cycles}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCycles(Number(e.target.value))
              }
              className="text-center bg-transparent border border-transparent hover:border-primary-accent hover:scale-105 focus:outline-none focus:border-primary-accent placeholder-stone-200 w-16 h-16 text-4xl rounded-md transition-all custom-arrows"
            />
          </div> */}
          <div className="flex space-x-8">
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handleClear}>Clear</Button>
          </div>
          <div className="flex justify-center text-center items-center space-x-2 text-xl">
            Break time:
            <TimeInput
              placeholder={breakTime.toString()}
              value={0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBreakTime(Number(e.target.value))
              }
            />
            minutes
          </div>
        </>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Timer;
