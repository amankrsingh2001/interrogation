"use client";

import MediaInput from "@/components/media/mediaInput";
import { audioCheck, cameraCheck, displayMedia } from "@/lib/media";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";

export default function () {
  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const screenShareRef = useRef<MediaStream>(null);

  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);
  const [isScreenShareOn, setIsScreenShareOn] = useState<boolean>(false);

  // Check if the camera is on
  // If the camera if on mark the camera true else if the camera if off don't proceed further

  const cameraValue = async () => {
    let val = await cameraCheck();

    if (videoRef.current && val) {
      videoRef.current.srcObject = val;
      setIsCameraOn(true);
    }
  };

  useEffect(() => {
    cameraValue();
  }, []);

  // check if the mic is working or not
  // If the mic is on check the screen share else dont't proceed

  async function audio() {
    const val = await audioCheck();
    if (audioRef.current) {
      audioRef.current.srcObject = val;
      setIsAudioOn(true);
    }
  }

  useEffect(() => {
    if (isCameraOn) {
      audio();
    }
  }, [isCameraOn]);


  // Check if the screenShare is working or not 
  // If the screen share is working set the screenVal and enable the next button

  async function screenShare() {
    const screenVal = await displayMedia();
    if(screenVal && screenVal.active){
      screenShareRef.current = screenVal
      setIsScreenShareOn(true)
    }
  }
  

  useEffect(() => {
    if (isAudioOn) {
      setTimeout(()=>{
        screenShare();
      }, 1000);
      
    }
  }, [isAudioOn]);


// Stop the screen Share, Camera and mic when routing to the next page
  const onchangeHandler = () => {

    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream = videoRef.current.srcObject as MediaStream; 
      mediaStream.getTracks().forEach((track) => track.stop()); 
    }

    if(audioRef.current && audioRef.current.srcObject){
      const mediaStream = audioRef.current.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track)=>track.stop());
    }

    if (screenShareRef.current) {
      const tracks = screenShareRef.current.getVideoTracks();
      tracks.forEach((track: any) => track.stop());
    }
    router.push('/aiAssistance')
  };


  return (
    <div className="flex flex-col lg:flex-row border-2 border-black bg-slate-300 h-[calc(100vh-1.5rem)] w-full justify-evenly">
      <div className="flex border-2 w-[40%] border-pink-500 items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <video
            ref={videoRef}
            autoPlay
            width="500"
            height="600"
            className="shadow-xl border-2 border-black rounded-md"
          ></video>
        </div>
      </div>

      <div className="border-2 border-black w-[40%] flex  flex-col justify-center items-center">
        {/*Video section */}
        <div className="flex gap-2  border-2 border-black w-[30%] items-center space-x-2">
          <label
            htmlFor="videoCheck"
            className="text-sm font-medium text-gray-700"
          >
            Video check
          </label>
          <input
            type="checkbox"
            id="videoCheck"
            disabled
            checked={isCameraOn}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

    {/*Audio section */}

        <div className="flex gap-2  border-2 border-black items-center space-x-2">
          <label
            htmlFor="audioCheck"
            className="text-sm font-medium text-gray-700"
          >
            Audio Check
          </label>
          <input
            type="checkbox"
            id="audioCheck"
            disabled
            checked={isAudioOn}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

    {/*Screen Share section */}

        <div className="flex gap-2 border-2 border-black items-center space-x-2">
          <label
            htmlFor="audioCheck"
            className="text-sm font-medium text-gray-700"
          >
            Screen share
          </label>

          <input
            type="checkbox"
            id="audioCheck"
            disabled
            checked={isScreenShareOn}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>

        <div>
          <MediaInput />
        </div>
        <button disabled={!isScreenShareOn} onClick={onchangeHandler}>Next</button>
      </div>
    </div>
  );
}
