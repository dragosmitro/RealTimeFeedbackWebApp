import React, { useState, useEffect } from "react";
import ProfessorActivityView from "./ProfessorActivityView";
import StudentActivityView from "./StudentActivityView";

export default function Login() {
  const [userRole, setUserRole] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInformation(token);
    }
  }, []);

  async function handleLogin({ username, password }) {
    try {
      if (username == "" && password == "") {
        throw new Error("Username & Password is null");
      }
      if (username == "") {
        throw new Error("Username is null");
      }
      if (password == "") {
        throw new Error("Password is null");
      }
      const response = await fetch("http://localhost:5048/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.token);
        getUserInformation(data.token);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRegister({ username, password, type }) {
    try {
      if (username == "" && password == "") {
        throw new Error("Username & Password is null");
      }
      if (username == "") {
        throw new Error("Username is null");
      }
      if (password == "") {
        throw new Error("Password is null");
      }
      const response = await fetch("http://localhost:5048/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          type: type,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.token);
        getUserInformation(data.token);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function getUserInformation(token) {
    const response = await fetch(
      "http://localhost:5048/api/user/getUserInformation",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setUserRole(data.type);
      setUser(data);
    }
  }

  if (userRole == "student") {
    return <StudentActivityView user={user} />;
  } else if (userRole == "professor") {
    return <ProfessorActivityView user={user} />;
  } else {
    return (
      <React.Fragment>
        <div className="">
          <div className="flex flex-row justify-center text-3xl text-blue-500">
            Login
          </div>
          <div className="flex flex-row justify-center mt-[40px]">
            <div className="flex flex-col w-[100px]">
              <p>Username:</p>
              <p className="mt-[5px]">Password:</p>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                className="border border-black rounded-sm px-2"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                type="password"
                className="border border-black rounded-sm mt-[5px] px-2"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="text-white flex flex-row justify-center mt-[20px]">
            <button
              className="bg-blue-400 text-xl rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white"
              onClick={() => handleLogin({ username, password })}
            >
              LOGIN
            </button>
          </div>
          <div className="text-white flex flex-col items-center mt-[20px] gap-1">
            <button
              className="bg-blue-400 text-l rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white"
              onClick={() =>
                handleRegister({ username, password, type: "professor" })
              }
            >
              REGISTER PROFESOR
            </button>
            <button
              className="bg-blue-400 text-l rounded-lg py-2 px-4 hover:bg-blue-700 hover:text-white"
              onClick={() =>
                handleRegister({ username, password, type: "student" })
              }
            >
              REGISTER STUDENT
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
