import React, { useState } from 'react';
import { Upload, Camera } from 'lucide-react';
import { CameraCapture } from './CameraCapture';

interface ImageCaptureProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function ImageCapture({ onImageUpload, fileInputRef }: ImageCaptureProps) {
  const [showCamera, setShowCamera] = useState(false);

  const handleCameraCapture = (imageData: string) => {
    // Create a file from the base64 data
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const file = new File([ab], 'chart-capture.jpg', { type: mimeString });
    
    // Create a synthetic event
    const event = {
      target: {
        files: [file]
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    onImageUpload(event);
  };

  return (
    <div className="text-center mb-8">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onImageUpload}
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg
                     border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     active:translate-x-1 active:translate-y-1
                     active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-200
                     flex items-center gap-2 font-bold"
          >
            <Upload className="w-5 h-5" />
            Upload Chart
          </button>

          <button
            onClick={() => setShowCamera(true)}
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
        
        <p className="text-gray-600 text-sm">
          Upload or capture a clear image of your trading chart for analysis
        </p>
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}