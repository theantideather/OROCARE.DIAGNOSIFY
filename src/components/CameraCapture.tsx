import React, { useRef, useEffect, useState } from 'react';
import { Camera, X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
        stopCamera();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border-2 border-black p-4 max-w-2xl w-full mx-4
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Capture Chart Image</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error ? (
          <div className="p-4 bg-red-50 border-2 border-red-600 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="relative aspect-video mb-4 bg-black rounded-lg overflow-hidden
                          border-2 border-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={captureImage}
                className="bg-red-600 text-white px-6 py-3 rounded-lg
                         border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         active:translate-x-1 active:translate-y-1
                         active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-200
                         flex items-center gap-2 font-bold"
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}