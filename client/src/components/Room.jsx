import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import User from "./Tile/User";
import ChatContainer from "./Chat/ChatContainer";
import axios from "axios";

const Room = () => {
  const peers = useHMSStore(selectPeers);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
        setAudioChunks(audioChunks);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        setAudioBlob(audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        const audio = new Audio(audioUrl);
        const audioFile = new File([audioBlob], "audio.wav", {
          type: "audio/wav",
        });
        const formData = new FormData();
        formData.append("audioFile", audioFile, "audio.wav");
        axios
          .post("http://localhost:8000/audio/upload", formData)
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        audio.play();
      });
    });
  }, []);

  return (
    <div className="flex flex-col pt-4 w-3/4 h-1/2 ">
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap justify-center items-start w-full ">
          {peers.map((p) => (
            <User key={p.id} peer={p} />
          ))}
        </div>
        <ChatContainer />
      </div>
      <Footer count={peers.length} mediaRecorder={mediaRecorder} />
    </div>
  );
};

export default Room;
