import { ElevenLabsClient, stream } from "elevenlabs";
import { Readable } from "stream";

const client = new ElevenLabsClient({
  apiKey: "sk_12aff4b7684a805e17e0aa033a546198fc0120570da6b85d",
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


