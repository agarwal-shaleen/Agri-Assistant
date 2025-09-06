import React, { useState, useRef } from "react";

import axios from "axios";
import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighIcon , PauseIcon } from '@hugeicons/core-free-icons';


function TTSPlayer(text) {

  //const [text, setText] = useState("");

  const [audioUrl, setAudioUrl] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const myhandle = async () => {   
    if(audioUrl){
        handlePlayPause();
    }
    else{
        handleSpeak();
    }
  }

  const handleSpeak = async () => {

    try {
      if(isPlaying){
        audioRef.current.pause();

        setIsPlaying(false);
        return
      }  

      const formData = new FormData();

      formData.append("text", text.text);
      console.log("hi i am clicked" , text.text)

      const response = await axios.post("http://127.0.0.1:8000/speak", formData, {

        responseType: "blob",
        
        

      });
      console.log("hi i am clicked2")

      const url = URL.createObjectURL(new Blob([response.data], { type: "audio/mpeg" }));
      console.log(url)

      setAudioUrl(url);



      

      

        if (audioRef.current) {

          audioRef.current.src = url;

          audioRef.current.play().then(() => setIsPlaying(true))

            .catch(err => console.error("Playback failed:", err));

        }

      

    } catch (err) {

      console.error("Error:", err);

    }

  };



  const handlePlayPause = () => {

    if (!audioRef.current) return;



    if (isPlaying) {

      audioRef.current.pause();

      setIsPlaying(false);

    } else {

      audioRef.current.play();

      setIsPlaying(true);

    }

  };



  return (

    <div className="p-2">

      {/* <textarea

        className="border p-2 w-full"

        rows={3}

        placeholder="Type text here..."

        value={text}

        onChange={(e) => setText(e.target.value)}

      /> */}



      {/* Generate and auto-play */}

      <button

        className="px-4 py-2  text-black rounded"

        onClick={myhandle}
      >

    {isPlaying ? (<HugeiconsIcon icon={PauseIcon} size={20}
      color="currentColor"
      strokeWidth={1.5} />) : (<HugeiconsIcon
      icon={VolumeHighIcon}
      size={20}
      color="currentColor"
      strokeWidth={1.5}
    />)}

      </button>



      {/* Always render <audio>, even before audioUrl */}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} controls hidden />



      {/* Play / Pause toggle after generation */}

      {/* {audioUrl && (

        <div className="flex items-center space-x-2">

          <button

            className="px-4 py-2 bg-blue-500 text-white rounded"

            onClick={handlePlayPause}

          >

            {isPlaying ? "Pause" : "Resume"}

          </button>

        </div>

      )} */}

    </div>

  );

}



export default TTSPlayer;