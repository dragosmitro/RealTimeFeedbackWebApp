import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton.jsx";
import { emojis, emojiNames } from "../utils/consts.js";
import { Emoji } from "./Emoji.jsx";
import { convertDate } from "../utils/consts.js";

export default function ProfessorActivityView(user) {
  const [activityDescription, setActivityDescription] = useState("");
  const [activityKey, setActivityKey] = useState("");
  const [activityDuration, setActivityDuration] = useState("");

  const [activityOpen, setActivityOpen] = useState(null);

  const [emojiCounters, setEmojiCounters] = useState(
    Array(emojis.length).fill(0)
  );

  useEffect(() => {
    const deleteExpiredActivities = async () => {
      const ids = await fetch(
        "http://localhost:5048/api/activity/deleteExpired",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const deletedIds = await ids.json();
      deletedIds.IDS.map(async (id, index) => {
        const commNumbers = await fetch(
          `http://localhost:5048/api/comment/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      });
    };
    const retrieveProfessorActivity = async () => {
      const response = await fetch(
        `http://localhost:5048/api/activity/getActivitiesBy/${user.user.userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const activities = await response.json();
      const activity = activities[0];
      setActivityOpen(activity);
    };

    deleteExpiredActivities();
    retrieveProfessorActivity();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (activityOpen) {
        const response = await fetch(
          `http://localhost:5048/api/comment/get/${activityOpen.activityid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const comms = await response.json();
        updateEmojiCounters(comms);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activityOpen]);

  const updateEmojiCounters = (comments) => {
    const updatedCounters = [...emojiCounters];
    comments.forEach((comment) => {
      const emojiIndex = emojiNames.indexOf(comment.comment);
      if (emojiIndex !== -1) {
        updatedCounters[emojiIndex]++;
      }
    });
    setEmojiCounters(updatedCounters);
  };

  const handleActivityDescriptionChange = (event) => {
    setActivityDescription(event.target.value);
  };

  const handleActivityKeyChange = (event) => {
    setActivityKey(event.target.value);
  };

  const handleActivityDurationChange = (event) => {
    setActivityDuration(event.target.value);
  };

  const handleEndActivityEarly = async (event) => {
    const response = await fetch(
      `http://localhost:5048/api/activity/delete/${activityOpen.activityid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const commNumbers = await fetch(
      `http://localhost:5048/api/comment/delete/${activityOpen.activityid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setEmojiCounters(Array(emojis.length).fill(0));
    setActivityOpen(null);
  };

  const handleCreateActivity = async () => {
    const response = await fetch("http://localhost:5048/api/activity/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        description: activityDescription,
        password: activityKey,
        duration: activityDuration,
        createdBy: user.user.userid,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      setActivityOpen(await response.json());
    }
  };

  return (
    <React.Fragment>
      {!activityOpen && (
        <React.Fragment>
          <div className="flex flex-row-reverse mb-[20px]">
            <LogoutButton />
          </div>
          <div className="text-blue-400">
            <div className="flex flex-row justify-center text-3xl">
              CREEARE ACTIVITATE
            </div>
            <div className="flex flex-row justify-center mt-[40px]">
              <div className="text-black flex flex-col justify-between w-[200px]">
                <p>Descrierea activitatii:</p>
                <div>
                  <p className="mt-[5px]">Parola activitate:</p>
                  <p className="mt-[5px]">Durata Activitate in minute</p>
                </div>
              </div>
              <div className="flex flex-col">
                <textarea
                  type="text"
                  className="border border-black rounded-sm px-2"
                  placeholder="descriere..."
                  value={activityDescription}
                  onChange={handleActivityDescriptionChange}
                  rows={4}
                />
                <input
                  type="text"
                  className="border border-black rounded-sm mt-[5px] px-2"
                  placeholder="parola activitate..."
                  value={activityKey}
                  onChange={handleActivityKeyChange}
                />
                <input
                  type="text"
                  className="border border-black rounded-sm mt-[5px] px-2"
                  placeholder="durata activitate..."
                  value={activityDuration}
                  onChange={handleActivityDurationChange}
                />
              </div>
            </div>
            <div className="text-white flex flex-row justify-center mt-[20px]">
              <button
                className="bg-blue-400 text-xl rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white"
                onClick={handleCreateActivity}
              >
                CREEAZA
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {activityOpen && (
        <React.Fragment>
          <div className="flex flex-row-reverse mb-[20px]">
            <LogoutButton />
          </div>
          <div className="text-blue-400 font-bold">
            <p className="text-[32px] flex flex-col items-center text-xl mb-5">
              Professor activity view
            </p>
            {/* <p>DE CATRE PROFESORUL '{user.user.username}' </p> */}
            <p>
              Activitatea se inchide la: {convertDate(activityOpen.endDate)}
            </p>
            <p>Nume: {activityOpen.activitydesc}</p>
            <p>Parola: {activityOpen.password}</p>
          </div>
          <div className="my-10 grid grid-cols-2 gap-x-2 gap-y-2 place-items-center">
            {emojis.map((emoji, index) => (
              <Emoji
                key={index}
                emoji={emoji}
                counters={true}
                value={emojiCounters[index]}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleEndActivityEarly}
              className="text-white rounded-lg py-2 px-4 bg-blue-400 hover:bg-blue-500"
            >
              Inchide activitate
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
