import React from 'react';

const benefits = {
  provider: [
    'Reduces doctor-patient workload',
    'Automates initial diagnoses',
    'Streamlines routine interactions'
  ],
  patient: [
    'Accessible healthcare 24/7',
    'Early detection of health issues',
    'Personalized medical guidance',
    'Cost-effective diagnostics'
  ]
};

export function Benefits() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Healthcare Provider Benefits</h3>
        <ul className="space-y-2">
          {benefits.provider.map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Benefits</h3>
        <ul className="space-y-2">
          {benefits.patient.map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}