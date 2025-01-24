"use client";

import { cameraCheck } from "@/lib/media";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function () {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null);


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

  const onclickHandler = ()=>{
    router.push('/checkMedia')
  }



  return (
    <div className="flex ">
      <div className="">
        <video
          ref={videoRef}
          autoPlay
          width="500"
          height="600"
          className="shadow-xl rounded-md"
        ></video>
      </div>
      <div>
        <h1>This is the instruction page</h1>
        <button disabled={!isCameraOn} className="bg-black text-white rounded-md px-3 py-2" onClick={onclickHandler}>Next</button>
      </div>
    </div>
  );
}
