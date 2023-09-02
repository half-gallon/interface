import { useEffect, useRef, useState } from 'react';

const mimeType = "audio/webm";

export function useRecord() {
	const mediaRecorder = useRef<MediaRecorder>();
  const [permission, setPermission] = useState(false);
	const [recordingStatus, setRecordingStatus] = useState("inactive");
	const [stream, setStream] = useState<MediaStream>();
	const [audio, setAudio] = useState<string>();
	const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);


  useEffect(() => {
    getMicrophonePermission;
  }, []);

  const getMicrophonePermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				setPermission(true);
				setStream(mediaStream);
			} catch (err: any) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};


  const startRecording = async () => {
    setAudio(undefined);
    if(stream === undefined) return;
    if(mediaRecorder === undefined) return;
		setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { mimeType: "audio/webm" });

		mediaRecorder.current = media;
		mediaRecorder.current.start();

		let localAudioChunks: Blob[] = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};

		setAudioChunks(localAudioChunks);
    setIsRecording(true);
	};

	const stopRecording = () => {
		setRecordingStatus("inactive");
    if(mediaRecorder.current === undefined) return;

		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			const audioUrl = URL.createObjectURL(audioBlob);

			setAudio(audioUrl);

			setAudioChunks([]);
      setIsRecording(false);
		};
	};


  return { getMicrophonePermission, startRecording, stopRecording, isRecording, audio, permission };
}
