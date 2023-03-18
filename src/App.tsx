import { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  function formatTime(timeString: String) {
    let [hours, minutes] = timeString.split(":");
    const dateObj = new Date();
    dateObj.setHours(+hours);
    dateObj.setMinutes(+minutes);
    const formattedTime = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const totalSeconds = +hours * 3600 + +minutes * 60;
    return { formattedTime, totalSeconds };
  }

  const currentDay = data.filter((data) => {
    return data.date === new Date().getDate().toString();
  });

  const [iftaarMessage, setIftaarMessage] = useState({
    message: "iftaar at",
    time: { hours: 0, minutes: 0, seconds: 0 },
  });
  const [sehriMessage, setSehriMessage] = useState({
    message: "sehri at:",
    time: { hours: 0, minutes: 0, seconds: 0 },
  });

  let formattedIftaarTime = "";
  let totalIftaarSeconds = 0;
  let formattedSehriTime = "";
  let totalSehriSeconds = 0;

  ({ formattedTime: formattedIftaarTime, totalSeconds: totalIftaarSeconds } =
    formatTime(currentDay[0].iftaar));
  ({ formattedTime: formattedSehriTime, totalSeconds: totalSehriSeconds } =
    formatTime(currentDay[0].sehr));

  function updateMesages() {
    const timestamp = new Date().getTime();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const diffInMillis = timestamp - startOfDay.getTime();
    const currentSeconds = Math.floor(diffInMillis / 1000);

    const remainingIftaarSeconds = totalIftaarSeconds - currentSeconds;
    if (remainingIftaarSeconds <= 0) {
      setIftaarMessage({
        message: "Iftaar time!",
        time: { hours: 0, minutes: 0, seconds: 0 },
      });
    } else {
      const hours = Math.floor(remainingIftaarSeconds / 3600);
      const minutes = Math.floor((remainingIftaarSeconds % 3600) / 60);
      const seconds = Math.floor(remainingIftaarSeconds % 60);
      setIftaarMessage({
        message: "Iftaar in",
        time: { hours, minutes, seconds },
      });
    }

    const remainingSehriSeconds = totalSehriSeconds - currentSeconds;
    if (remainingSehriSeconds <= 0) {
      setSehriMessage({
        message: "Sehri time's up!",
        time: { hours: 0, minutes: 0, seconds: 0 },
      });
    } else {
      const hours = Math.floor(remainingSehriSeconds / 3600);
      const minutes = Math.floor((remainingSehriSeconds % 3600) / 60);
      const seconds = Math.floor(remainingSehriSeconds % 60);
      setSehriMessage({
        message: "Sehri ends in",
        time: { hours, minutes, seconds },
      });
    }
  }

  setInterval(() => {
    updateMesages();
  }, 1000);

  useEffect(() => updateMesages(), []);

  return (
    <div className="h-screen w-screen flex flex-col text-gray-100">
      {/* <header className="w-screen bg-gray-800 text-gray-50 px-7 py-3 flex justify-between">
        <div className="flex items-center">
          <img src="logo.png" alt="LOGO" className="h-8 w-8 mr-2" />
        </div>
        <a className="font-bold text-lg">About</a>
      </header> */}
      <main className="flex justify-center items-center h-screen bg-[url('./images/bg.jpg')] bg-cover bg-no-repeat">
        <div className="flex flex-col justify-between h-5/6 w-4/5 max-w-3xl py-10 px-3 rounded-xl shadow-2xl border-4">
          <div>
            <div className="flex flex-col  md:flex-row items-center md:items-end justify-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ramadan: {currentDay[0].day}
              </h2>
              <p className="text-sm font-bold ml-2">{`${currentDay[0].date} ${currentDay[0].month} ${currentDay[0].year}`}</p>
            </div>
            <hr />
          </div>
          <div className="text-center">
            {new Date().getHours() < 6 ? (
              <>
                <h1 className="font-bold text-3xl md:text-4xl mb-4">
                  {sehriMessage.message || "Sehri ends in"}
                </h1>
                <div className="flex gap-4 justify-center w-full dark:text-gray-50">
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.hours}
                    </p>
                    <p className="text-light">Hours</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.minutes}
                    </p>
                    <p className="text-light">Minutes</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.seconds}
                    </p>
                    <p className="text-light">Seconds</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="font-bold text-3xl md:text-4xl mb-4">
                  {iftaarMessage.message || "Iftaar in"}
                </h1>
                <div className="flex gap-4 justify-center w-full dark:text-gray-50">
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.hours}
                    </p>
                    <p className="text-light text-gray-600">Hours</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.minutes}
                    </p>
                    <p className="text-light text-gray-600">Minutes</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl w-20 h-20 p-3 flex flex-col">
                    <p className="text-gray-700 font-black text-4xl">
                      {iftaarMessage.time.seconds}
                    </p>
                    <p className="text-light text-gray-600">Seconds</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center  gap-4">
            <p className="text-2xl font-bold dark:text-gray-50">
              Iftaar: {formattedIftaarTime}
            </p>
            <p className="text-2xl font-bold dark:text-gray-50">
              Sehri: {formattedSehriTime}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
