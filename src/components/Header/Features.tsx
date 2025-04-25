import React from 'react';
import { Brain, Mic, Database, Clock } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Custom Medical LLM',
    description: 'Specialized healthcare AI trained on leading medical institutions data'
  },
  {
    icon: Mic,
    title: 'Voice Technology',
    description: 'Advanced voice recognition with natural responses'
  },
  {
    icon: Database,
    title: 'Data-Driven',
    description: 'Trained on high-quality medical datasets for accurate diagnoses'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock access to AI-powered diagnostics'
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {features.map((feature, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}