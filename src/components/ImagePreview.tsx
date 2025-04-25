import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <div className="mb-8">
      <div className="aspect-video max-h-[400px] rounded-lg overflow-hidden
                    border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                    transition-all duration-200">
        <img
          src={imageUrl}
          alt="Trading chart"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}