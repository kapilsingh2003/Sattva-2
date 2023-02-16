import {
  HMSRoomProvider,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/hms-video-react";
import Join from "./components/Join";
import Room from "./components/Room";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Client } from "appwrite";

import Header from "./components/Header/header.component";
import Activities from "./components/Activities/activities.component";
import SelfSpeakRoom from "./components/selfRoom";
import Login from "./components/Login";
import Community from "./components/Community";

import axios from "axios";
import Profile from "./components/Profile";
import Volunteer from "./Volunteer";

const SpacesApp = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return (
    <>
      {isConnected ? (
        <Room />
      ) : (
        <>
          <Join text1={"Criminal Behaviour"} text2={"Trauma"} />
          <Join text1={"Family Issues"} text2={"Drug Abuse"} />
          <Join text1={"Grief"} text2={"Overcome Fear"} />
          <Join text1={"Anger Issues"} text2={"Social Skills"} />
        </>
      )}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8000/getUser", {
        userID: "63de45ffcee58871e8ec11bc",
      })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));

  }, []);

  return (
    <BrowserRouter>
      <HMSRoomProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/speaker-room"
            element={
              <div className="relative">
                <div className="fixed rounded-full top-24 left-10">
                  <button class="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
                    <svg
                      viewBox="0 0 20 20"
                      enable-background="new 0 0 20 20"
                      class="w-6 h-6 inline-block"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                      />
                    </svg>
                  </button>
                </div>
                {/* <h1 className="text-black text-5xl text-center mt-20">
                  Destress Zone
                </h1> */}
                <div className="page">
                  <SpacesApp />
                </div>
              </div>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/self-room" element={<SelfSpeakRoom />} />
          <Route path="/feed" element={<Community user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/volunteer" element={<Volunteer />} />
        </Routes>
      </HMSRoomProvider>
    </BrowserRouter>
  );
};

export default App;
