import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();

export async function convertWebmToWav(webmBlob: Blob): Promise<Blob> {
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: "/ffmpeg-core.js",
      wasmURL: "/ffmpeg-core.wasm",
    });
  }

  const inputName = "input.webm";
  const downloadFileExtension = "wav";
  const outputName = `output.${downloadFileExtension}`;

  await ffmpeg.writeFile(inputName, new Uint8Array(await webmBlob.arrayBuffer()));
  await ffmpeg.exec(["-i", inputName, outputName]);

  const outputData = await ffmpeg.readFile(outputName);
  const outputBlob = new Blob([outputData], {
    type: `audio/${downloadFileExtension}`,
  });

  return outputBlob;
}
export const shortenAddress = (address?: string, size: number = 4) => {
  if(address === undefined) return '';

  return  `${address.substring(0, 2 + size)}...${address.substring(address.length - size)}`;
}