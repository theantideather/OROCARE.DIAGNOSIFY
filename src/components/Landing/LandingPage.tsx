import React from 'react';
import { Tooth, Zap, Shield, Clock, Star, Microscope, HeartPulse } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-black text-white 
                     drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Dental Diagnosis For The Digital Age
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 font-bold
                    drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
          Transforming dental X-rays into comprehensive insights with AI.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Microscope,
            title: 'Precise Analysis',
            description: 'Advanced AI vision models analyze X-rays with high accuracy'
          },
          {
            icon: Zap,
            title: 'Instant Results',
            description: 'Get comprehensive dental assessments in seconds'
          },
          {
            icon: HeartPulse,
            title: 'Patient-Centered',
            description: 'Detailed explanations patients can understand'
          },
          {
            icon: Shield,
            title: 'HIPAA Compliant',
            description: 'Secure, private handling of all patient data'
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white border-4 border-black rounded-xl p-6
                                  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                                  transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
            <p className="text-gray-700 text-sm text-center">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-4 border-black rounded-xl p-8
                       shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Upload X-Ray",
              description: "Simply upload your dental X-ray image in any common format"
            },
            {
              step: 2,
              title: "AI Analysis",
              description: "Our advanced models analyze every aspect of the dental image"
            },
            {
              step: 3,
              title: "Detailed Report",
              description: "Receive a comprehensive breakdown with targeted recommendations"
            }
          ].map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold
                           flex items-center justify-center mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            quote: "OrocareAI has transformed our practice's efficiency.",
            author: "Dr. Sarah K., DDS"
          },
          {
            quote: "I can now understand my dental health better than ever.",
            author: "Mike R., Patient"
          },
          {
            quote: "A game-changer for remote consultations and second opinions.",
            author: "Dr. Alex T., Endodontist"
          }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white border-4 border-black rounded-xl p-6
                                  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
            </div>
            <blockquote className="text-gray-700 text-center mb-4">
              "{testimonial.quote}"
            </blockquote>
            <p className="text-gray-900 font-bold text-center">- {testimonial.author}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6
                     drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          Ready for Modern Dental Diagnostics?
        </h2>
        <p className="text-xl text-gray-300 mb-8
                    drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
          Try OrocareAI today and experience the future of dental care.
        </p>
      </section>
    </div>
  );
}