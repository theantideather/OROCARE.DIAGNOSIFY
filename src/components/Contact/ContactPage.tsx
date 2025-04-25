import React from 'react';
import { Instagram, Twitter, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/prebullsxyz?igsh=bmt4OXlvdnpsOTNm',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/prebullsxyz?s=21',
      color: 'hover:text-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/HgLf514w0lJ93cyu0zHRRt',
      color: 'hover:text-green-500'
    }
  ];

  return (
    <div className="bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
      
      <div className="grid gap-6">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 border-2 border-black rounded-lg
                       hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       transition-all ${link.color}`}
          >
            <link.icon className="w-6 h-6" />
            <div>
              <p className="font-bold text-gray-900">{link.name}</p>
              <p className="text-sm text-gray-600">Follow us on {link.name}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 border-2 border-black rounded-lg">
        <p className="text-gray-700 text-center">
          Join our community to get real-time trading insights and connect with fellow traders!
        </p>
      </div>
    </div>
  );
}