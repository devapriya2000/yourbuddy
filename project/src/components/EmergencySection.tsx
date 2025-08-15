import React, { useState } from 'react';
import { ArrowLeft, Phone, MapPin, AlertTriangle, Users, Clock, Shield } from 'lucide-react';

interface EmergencySectionProps {
  onBack: () => void;
}

const EmergencySection: React.FC<EmergencySectionProps> = ({ onBack }) => {
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency', color: 'from-red-500 to-red-600' },
    { name: 'Family Contact', number: '+91 3456782123', type: 'family', color: 'from-blue-500 to-blue-600' },
    { name: 'Close Friend', number: '+91 1234567892', type: 'friend', color: 'from-green-500 to-green-600' },
    { name: 'Medical Emergency', number: '+1 (555) 246-8101', type: 'medical', color: 'from-purple-500 to-purple-600' },
  ];

  const handleEmergencyTrigger = () => {
    setEmergencyTriggered(true);
    let count = 10;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        alert('Emergency alert sent to all contacts!');
        setEmergencyTriggered(false);
        setCountdown(10);
      }
    }, 1000);
  };

  const cancelEmergency = () => {
    setEmergencyTriggered(false);
    setCountdown(10);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-12">
            <button
              onClick={onBack}
              className="flex items-center glass-card px-6 py-3 rounded-2xl text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white flex items-center">
              <AlertTriangle className="w-10 h-10 mr-4 text-red-400 animate-pulse" />
              Emergency SOS
            </h1>
            <div className="w-32"></div>
          </header>

          {!emergencyTriggered ? (
            <div className="space-y-8">
              {/* Main Emergency Button */}
              <div className="glass-card rounded-3xl p-12 text-center shadow-2xl">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
                      <AlertTriangle className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full animate-ping"></div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Emergency Alert System</h2>
                  <p className="text-red-200 text-lg max-w-2xl mx-auto">
                    Press the button below if you're in an emergency situation. 
                    Your location and emergency message will be sent to all your emergency contacts instantly.
                  </p>
                </div>
                
                <button
                  onClick={handleEmergencyTrigger}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-red-500/50"
                >
                  🚨 TRIGGER EMERGENCY ALERT 🚨
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Emergency Contacts */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Phone className="w-6 h-6 mr-3 text-blue-400" />
                    Emergency Contacts
                  </h3>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="glass-card rounded-2xl p-4 hover:bg-white hover:bg-opacity-10 transition-all duration-300 group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                              <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{contact.name}</p>
                              <p className="text-sm text-gray-300">{contact.number}</p>
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105">
                            Call Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Medical Info */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-green-400" />
                    Safety Information
                  </h3>
                  <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                      <div className="flex items-center mb-3">
                        <MapPin className="w-6 h-6 text-green-400 mr-3" />
                        <p className="text-sm text-green-300 font-semibold">LOCATION SERVICES</p>
                      </div>
                      <p className="text-white font-medium mb-2">GPS Location Active</p>
                      <p className="text-sm text-gray-300">Ready to share precise location in emergency situations</p>
                    </div>
                    
                    <div className="glass-card rounded-2xl p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                      <div className="flex items-center mb-3">
                        <Users className="w-6 h-6 text-blue-400 mr-3" />
                        <p className="text-sm text-blue-300 font-semibold">MEDICAL PROFILE</p>
                      </div>
                      <p className="text-white font-medium mb-2">Health Information Configured</p>
                      <p className="text-sm text-gray-300">Medical details and emergency contacts ready to share</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-red-500/30 to-pink-500/30 animate-pulse">
              <AlertTriangle className="w-20 h-20 mx-auto mb-6 text-red-400 animate-bounce" />
              <h2 className="text-4xl font-bold text-white mb-6">🚨 EMERGENCY ALERT ACTIVE 🚨</h2>
              <div className="text-8xl font-bold text-red-400 mb-6 animate-bounce">{countdown}</div>
              <p className="text-2xl text-white mb-8">
                Emergency alert will be sent in {countdown} seconds...
              </p>
              <button
                onClick={cancelEmergency}
                className="bg-white text-red-600 px-12 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                ❌ CANCEL EMERGENCY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;