import React, { useState } from "react";
import LogoutButton from "./LogoutButton.jsx";
import { emojis, emojiNames } from "../utils/consts.js";
import { Emoji } from "./Emoji.jsx";
import { convertDate } from "../utils/consts.js";

export default function StudentActivityView(user) {
  const [activityKey, setActivityKey] = useState("");

  const [activityOpen, setActivityOpen] = useState(null);
  const [activityId, setActivityId] = useState("");

  const searchForActivity = async () => {
    try {
      const response = await fetch(
        `http://localhost:5048/api/activity/${activityKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await response.json();
      if (json) {
        setActivityId(json.activityid);
        setActivityOpen(true);
      }
    } catch (err) {
      console.log(err);
      alert("ACTIVITATE CU PAROLA INDICATA INEXISTENTA SAU EXPIRATA");
    }
  };

  const handleChange = (event) => {
    setActivityKey(event.target.value);
  };

  const handleEmojiClick = async (index) => {
    try {
      const activity = await fetch(
        `http://localhost:5048/api/activity/${activityKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const activityObj = await activity.json();
      if (!activityObj) {
        setActivityOpen(false);
        setActivityKey("");
        alert("ACTIVITATEA A FOST INCHEIATA");
      }
      const response = await fetch(`http://localhost:5048/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment: emojiNames[index],
          userid: user.user.userid,
          activityid: activityId,
        }),
      });
    } catch (err) {
      console.log(err);
      alert("MESAJ NETRANSMIS");
    }
  };

  return (
    <React.Fragment>
      {!activityOpen && (
        <React.Fragment>
          <div className="flex flex-row-reverse mb-[20px]">
            <LogoutButton />
          </div>
          <p className="flex justify-center text-3xl font-bold text-blue-400 mb-10">
            Student
          </p>
          <input
            type="text"
            className="border border-black rounded-sm mt-[5px] px-2"
            placeholder="cod activitate..."
            onChange={handleChange}
          />
          <br></br>
          <div className="flex justify-center mt-10">
            <button
              className="text-white bg-blue-400 text-xl rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white"
              onClick={searchForActivity}
            >
              Intra
            </button>
          </div>
        </React.Fragment>
      )}
      {activityOpen && (
        <React.Fragment>
          <div className="relative">
            <div className="flex flex-row-reverse mb-[20px]">
              <LogoutButton />
            </div>
            <div className="text-blue-400 font-bold">
              <p className="text-[32px] flex flex-col items-center text-xl mb-5">
                Student activity view
              </p>
              <p>Parola: {activityKey}</p>
            </div>
            <div className="my-10 grid grid-cols-2 gap-x-2 gap-y-2 place-items-center">
              {emojis.map((emoji, index) => (
                <div
                  key={index}
                  onClick={() => handleEmojiClick(index)}
                  className="cursor-pointer"
                >
                  <Emoji emoji={emoji} />
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
