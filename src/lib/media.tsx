


export const cameraCheck =  async()=> {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 576, ideal: 720, max: 1080 },
          },
      });
      return stream;
    } catch (err: unknown) {
      console.log(err);
    }
  }

  export const audioCheck = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return audioStream;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  };

  

  export const displayMedia = async() =>{
        let captureStream;
        try {
          captureStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              displaySurface: "browser",
            },
            audio: true
          });
        } catch (err) {
          console.log(`Error: ${err}`);
        }
        return captureStream;
      
  }