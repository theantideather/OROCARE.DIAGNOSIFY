import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function Card({ title, children, icon }: CardProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
} 