import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

interface Doctor {
  name: string;
  specialty: string;
  address: string;
  phone: string;
  distance: string;
}

export function DoctorFinder() {
  const [pincode, setPincode] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data - this would normally come from an API
  const mockDoctors: Doctor[] = [
    {
      name: "Dr. Sarah Smith",
      specialty: "General Dentist",
      address: "123 Medical Center, Near City Hospital",
      phone: "+1 (555) 123-4567",
      distance: "0.8 miles"
    },
    {
      name: "Dr. John Williams",
      specialty: "Dermatologist",
      address: "456 Healthcare Ave, Medical Plaza",
      phone: "+1 (555) 234-5678",
      distance: "1.2 miles"
    },
    {
      name: "Dr. Emily Brown",
      specialty: "Dental Surgeon",
      address: "789 Wellness Blvd, Care Complex",
      phone: "+1 (555) 345-6789",
      distance: "1.5 miles"
    }
  ];

  const handleSearch = () => {
    if (!pincode) return;
    setLoading(true);
    setTimeout(() => {
      setSearchClicked(true);
      setLoading(false);
    }, 1000);
  };

  const handleCallDoctor = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const openGoogleMaps = (address: string) => {
    const query = encodeURIComponent(`${address} ${pincode}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-offwhite border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-bold text-pine-800 mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-tiffany-500" />
        Find Doctors Near You
      </h2>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter your pincode/zip code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-4 py-3 border-4 border-black rounded-xl focus:ring-4 
                     focus:ring-tiffany-200 outline-none text-pine-800 
                     placeholder:text-gray-400"
            maxLength={6}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!pincode || loading}
          className={`px-6 py-3 rounded-xl border-4 border-black
                   flex items-center gap-2 font-bold
                   ${!pincode 
                     ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                     : 'bg-tiffany-500 hover:bg-tiffany-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                        active:translate-x-1 active:translate-y-1
                        active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                   } transition-all`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search
            </>
          )}
        </button>
      </div>

      {searchClicked && (
        <div className="space-y-4">
          {mockDoctors.map((doctor, index) => (
            <div key={index} className="border-4 border-black rounded-xl p-4 bg-white
                                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                    hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                                    transition-all">
              <h3 className="font-bold text-lg text-pine-800 mb-2">{doctor.name}</h3>
              <p className="text-tiffany-600 font-bold mb-2">{doctor.specialty}</p>
              <p className="text-pine-700 mb-2">{doctor.address}</p>
              <p className="text-pine-600 mb-4">Distance: {doctor.distance}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleCallDoctor(doctor.phone)}
                  className="flex-1 bg-pine-500 text-white px-4 py-3 rounded-xl
                           border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-1 active:translate-y-1
                           active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                           font-bold transition-all"
                >
                  Call Doctor
                </button>
                <button
                  onClick={() => openGoogleMaps(doctor.address)}
                  className="flex-1 bg-tiffany-500 text-white px-4 py-3 rounded-xl
                           border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                           active:translate-x-1 active:translate-y-1
                           active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                           font-bold transition-all"
                >
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}