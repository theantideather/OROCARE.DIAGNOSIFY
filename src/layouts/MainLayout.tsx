import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-teal-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-white">OrocareAI</h1>
          <p className="text-lg text-gray-300">Advanced Dental Diagnosis</p>
        </header>
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}