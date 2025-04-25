import React from 'react';
import { Brain, Mic, Database } from 'lucide-react';

const technologies = [
  {
    icon: Brain,
    title: 'Custom Medical LLM',
    description: 'Specialized healthcare AI built using datasets from leading medical institutions and patient-doctor interactions'
  },
  {
    icon: Mic,
    title: 'Voice Technology Integration',
    description: 'RVC technology for voice cloning and natural responses through Alexa, Google Assistant, and other platforms'
  },
  {
    icon: Database,
    title: 'Data-Driven Approach',
    description: 'Trained on high-quality medical datasets and real conversations, minimizing AI hallucinations'
  }
];

export function TechnologySection() {
  return (
    <div className="my-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Advanced Technology Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technologies.map((tech, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <tech.icon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{tech.title}</h3>
            <p className="text-gray-600 leading-relaxed">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}