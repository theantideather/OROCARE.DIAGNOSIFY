import React from 'react';
import { AlertTriangle, Phone, Clock, MapPin } from 'lucide-react';
import type { EmergencyInfo } from '../../types';

interface EmergencySectionProps {
  emergencyInfo: EmergencyInfo;
}

export function EmergencySection({ emergencyInfo }: EmergencySectionProps) {
  const handleEmergencyCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {emergencyInfo.isEmergency && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800">Emergency Warning</h3>
              <p className="text-red-700">{emergencyInfo.warningMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            Emergency Contacts
          </h3>
          <div className="space-y-3">
            {emergencyInfo.emergencyContacts.map((contact, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{contact.name}</span>
                  {contact.available24x7 && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      24/7
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleEmergencyCall(contact.phone)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {contact.phone}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            24/7 Medical Facilities
          </h3>
          <div className="space-y-3">
            {emergencyInfo.nearbyFacilities.map((facility, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">{facility.name}</span>
                  <span className="text-sm text-gray-600">{facility.distance}</span>
                </div>
                {facility.isOpen24x7 && (
                  <div className="flex items-center gap-1 text-sm text-green-600 mb-2">
                    <Clock className="w-4 h-4" />
                    Open 24/7
                  </div>
                )}
                <button
                  onClick={() => handleEmergencyCall(facility.phone)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Facility
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}