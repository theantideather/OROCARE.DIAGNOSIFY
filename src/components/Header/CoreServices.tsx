import React from 'react';
import { Stethoscope, Clock, Shield, Building } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Real-time Medical Diagnostics',
    description: 'AI-powered conversational diagnostics available instantly'
  },
  {
    icon: Clock,
    title: '24/7 Consultations',
    description: 'Round-the-clock availability for patient consultations'
  },
  {
    icon: Shield,
    title: 'Early Detection',
    description: 'Advanced capabilities for early detection and prevention'
  },
  {
    icon: Building,
    title: 'Healthcare Integration',
    description: 'Seamless integration with healthcare providers and systems'
  }
];

export function CoreServices() {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Core Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <service.icon className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}