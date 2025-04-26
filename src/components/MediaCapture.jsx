'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const MediaCapture = ({ type, onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const recordedChunks = useRef([]);

  // Initialize media stream based on type
  useEffect(() => {
    const initMedia = async () => {
      try {
        const constraints = type === 'audio' ? { audio: true } : { video: true, audio: type === 'video' };
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);

        if (videoRef.current && type !== 'audio') {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Failed to access media device. Please check permissions.', {
          duration: 3000,
          className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        });
      }
    };

    initMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [type]);

  // Handle recording for video and audio
  const startRecording = () => {
    if (!stream) return;

    recordedChunks.current = [];
    const mimeType = type === 'video' ? 'video/webm' : 'audio/webm';
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: mimeType });
      setRecordedBlob(blob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Capture photo for camera mode
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob((blob) => {
      setCapturedImage(blob);
    }, 'image/jpeg');
  };

  // Confirm the captured media
  const confirmCapture = () => {
    if (type === 'image' && capturedImage) {
      onCapture(capturedImage);
    } else if ((type === 'video' || type === 'audio') && recordedBlob) {
      onCapture(recordedBlob);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-2 sm:mx-4 border border-red-600">
        <h2 className="text-lg font-bold mb-4">
          {type === 'image' ? 'Capture Photo' : type === 'video' ? 'Record Video' : 'Record Audio'}
        </h2>

        {type !== 'audio' && (
          <div className="relative mb-4">
            <video ref={videoRef} className="w-full rounded-lg" muted />
            <canvas ref={canvasRef} className="hidden" />
            {capturedImage && (
              <img
                src={URL.createObjectURL(capturedImage)}
                alt="Captured"
                className="w-full rounded-lg mt-2"
              />
            )}
          </div>
        )}

        {type === 'audio' && recordedBlob && (
          <audio
            src={URL.createObjectURL(recordedBlob)}
            controls
            className="w-full mb-4"
          />
        )}

        {type === 'video' && recordedBlob && (
          <video
            src={URL.createObjectURL(recordedBlob)}
            controls
            className="w-full rounded-lg mb-4"
          />
        )}

        <div className="flex justify-between gap-2">
          {type === 'image' && !capturedImage && (
            <Button
              onClick={capturePhoto}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Capture
            </Button>
          )}

          {(type === 'video' || type === 'audio') && !recordedBlob && (
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              className={`${
                isRecording ? 'bg-red-600' : 'bg-green-600'
              } text-white hover:bg-opacity-90`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
          )}

          {(capturedImage || recordedBlob) && (
            <Button
              onClick={confirmCapture}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Confirm
            </Button>
          )}

          <Button
            onClick={onClose}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaCapture;