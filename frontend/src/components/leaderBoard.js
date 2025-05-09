import React, { useEffect, useState } from "react";
import { TrophyIcon, FireIcon, StarIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "../context/darkMode";


const Leaderboard = ({ title, data, darkMode }) => {
  return (
    <div className={`relative max-w-2xl w-full mx-auto rounded-2xl shadow-xl overflow-hidden z-10 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
    }`}>
      <h1 className={`text-center text-2xl font-bold py-6 ${
        darkMode ? "bg-gray-700" : "bg-gray-100"
      }`}>{title}</h1>
      <ol className={`divide-y ${
        darkMode ? "divide-gray-600" : "divide-gray-200"
      }`}>
        {data.map((user, index) => {
          let trophyColor = "";
          let animationClass = "";
          let glow = "";

          if (index === 0) {
            trophyColor = "text-yellow-400";
            animationClass = "animate-bounce";
            glow = darkMode ? "shadow-yellow-400 shadow-lg" : "shadow-yellow-200 shadow-lg";
          } else if (index === 1) {
            trophyColor = darkMode ? "text-gray-300" : "text-gray-500";
            animationClass = "animate-pulse";
            glow = darkMode ? "shadow-gray-400 shadow-md" : "shadow-gray-300 shadow-md";
          } else if (index === 2) {
            trophyColor = "text-orange-400";
            animationClass = "animate-pulse";
            glow = darkMode ? "shadow-orange-400 shadow-sm" : "shadow-orange-300 shadow-sm";
          }

          return (
            <li
              key={index}
              className={`flex items-center px-8 py-5 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${glow} ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              onClick={() =>
                window.open(
                  `http://www.rewards1.com/forums-profile.php?user_id=${user.userId}`,
                  "_blank"
                )
              }
            >
              <span className={`text-xl font-semibold w-8 text-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {index + 1}
              </span>
              <img
                src={`http://www.rewards1.com/uploads/avatar/${user.userId}.jpg`}
                onError={(e) =>
                  (e.target.src =
                    "https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png")
                }
                className={`w-14 h-14 rounded-full mx-4 ${
                  darkMode ? "border-gray-500" : "border-gray-300"
                } border`}
                alt="Avatar"
              />
              <span className="flex-1 text-lg font-medium">{user.userName}</span>

              {index < 3 ? (
                <TrophyIcon
                  className={`h-8 w-8 mr-3 ${trophyColor} ${animationClass}`}
                />
              ) : null}

              <span className={`text-lg font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}>
                {user.earnings.toFixed(2)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const LeaderBoard = () => {
  const [data, setData] = useState([]);
  const { darkMode } = useDarkMode(); // Get dark mode state

  useEffect(() => {
    setTimeout(() => {
      setData([
        { userId: 3405462, userName: "LiMiTx", earnings: 1000 },
        { userId: 203, userName: "bean", earnings: 500 },
        { userId: 204, userName: "john", earnings: 450 },
        { userId: 205, userName: "doe", earnings: 400 },
        { userId: 206, userName: "alex", earnings: 350 },
      ]);
    }, 500);
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden ${
      darkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>

      {/* Floating Left/Right Decorations */}
      <div className={`absolute left-4 top-1/4 animate-spin-slow opacity-30 ${
        darkMode ? "text-yellow-400" : "text-yellow-300"
      }`}>
        <StarIcon className="h-12 w-12" />
      </div>
      <div className={`absolute left-10 bottom-1/3 animate-ping opacity-20 ${
        darkMode ? "text-orange-500" : "text-orange-300"
      }`}>
        <FireIcon className="h-10 w-10" />
      </div>
      <div className={`absolute right-4 top-1/3 animate-spin-slow opacity-30 ${
        darkMode ? "text-gray-300" : "text-gray-400"
      }`}>
        <StarIcon className="h-12 w-12" />
      </div>
      <div className={`absolute right-10 bottom-1/4 animate-ping opacity-20 ${
        darkMode ? "text-red-400" : "text-red-300"
      }`}>
        <FireIcon className="h-10 w-10" />
      </div>

      {/* Leaderboard */}
      <Leaderboard title="Leaderboard" data={data} darkMode={darkMode} />

      {/* Motivational Quote */}
      <div className={`mt-10 text-center text-lg font-semibold animate-pulse ${
        darkMode ? "text-white" : "text-gray-800"
      }`}>
        🚀 Only the hungry reach the top. <span className="text-yellow-400">Will you be next?</span>
      </div>

      {/* Rewards Animation */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8 text-center">
        {/* 1st Reward */}
        <div className={`rounded-xl p-6 animate-bounce shadow-lg ${
          darkMode 
            ? "bg-gray-800 border-yellow-400 shadow-yellow-400 text-white" 
            : "bg-white border-yellow-300 shadow-yellow-200 text-gray-800"
        } border`}>
          <TrophyIcon className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-2">🥇 1st Place</h3>
          <p className="text-lg">Win a FREE Trip to <span className="text-yellow-400">Tozeur</span> 🌴</p>
        </div>

        {/* 2nd Reward */}
        <div className={`rounded-xl p-6 animate-pulse shadow-md ${
          darkMode 
            ? "bg-gray-800 border-gray-400 shadow-gray-400 text-white" 
            : "bg-white border-gray-300 shadow-gray-300 text-gray-800"
        } border`}>
          <TrophyIcon className={`h-10 w-10 mx-auto mb-2 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`} />
          <h3 className="text-xl font-bold mb-2">🥈 2nd Place</h3>
          <p className="text-lg">3 Days Stay at <span className={darkMode ? "text-gray-300" : "text-gray-500"}>Sousse Palace Hotel</span> 🏨</p>
        </div>

        {/* 3rd Reward */}
        <div className={`rounded-xl p-6 animate-pulse shadow-sm ${
          darkMode 
            ? "bg-gray-800 border-orange-400 shadow-orange-400 text-white" 
            : "bg-white border-orange-300 shadow-orange-300 text-gray-800"
        } border`}>
          <TrophyIcon className="h-10 w-10 text-orange-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold mb-2">🥉 3rd Place</h3>
          <p className="text-lg">1 Month trial at <span className="text-orange-400">California Gym</span> 💪</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;