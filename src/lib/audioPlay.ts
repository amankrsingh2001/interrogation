import { ElevenLabsClient, stream } from "elevenlabs";
import { Readable } from "stream";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLAB_API_KEY,
});

export const Voice = async(text:any)=> {
  const audioStream = await client.textToSpeech.convertAsStream(
    "FGY2WhTYpPnrIDTdsKH5",
    {
      text: text,
      model_id: "eleven_v2_flash",
    }
  );

  await stream(Readable.from(audioStream));


}


