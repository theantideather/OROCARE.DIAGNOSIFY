import React from 'react';

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
}

export function WindowFrame({ title, children }: WindowFrameProps) {
  return (
    <div className="bg-white rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                  border-2 border-black mb-8">
      <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between
                     border-b-2 border-black">
        <span className="font-bold">{title}</span>
        <div className="flex gap-2">
          <button className="w-4 h-4 bg-white border border-black"></button>
          <button className="w-4 h-4 bg-white border border-black"></button>
          <button className="w-4 h-4 bg-white border border-black"></button>
        </div>
      </div>
      {children}
    </div>
  );
}