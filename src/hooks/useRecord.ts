import { useEffect, useRef, useState } from 'react';
import { convertWebmToWav } from '~/utils';

const mimeType = 'audio/webm';

export function useRecord() {
  const mediaRecorder = useRef<MediaRecorder>();
  const [permission, setPermission] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [stream, setStream] = useState<MediaStream>();
  const [audio, setAudio] = useState<string>();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [wavBlob, setWavBlob] = useState<Blob | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    getMicrophonePermission;
  }, []);

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
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
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  const startRecording = async () => {
    setAudio(undefined);
    if (stream === undefined) return;
    if (mediaRecorder === undefined) return;
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    try {
      setIsProcessing(true);
      setRecordingStatus('inactive');
      if (mediaRecorder.current === undefined) return;
      
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        
        const wavBlob = await convertWebmToWav(audioBlob);
        setWavBlob(wavBlob);
        // const audioUrl = URL.createObjectURL(audioBlob);
        const audioUrl = URL.createObjectURL(wavBlob);
        
        setAudio(audioUrl);
        
        setAudioChunks([]);
        setIsRecording(false);
      };
    } catch(e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    getMicrophonePermission,
    startRecording,
    stopRecording,
    isRecording,
    audio,
    permission,
    wavBlob,
    isProcessing,
  };
}
