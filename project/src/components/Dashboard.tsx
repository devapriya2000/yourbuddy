import React from 'react';
import { AlertTriangle, MessageCircle, Brain, Heart, Lightbulb, Gamepad2, Sparkles, Star, Shield, Zap, Coffee } from 'lucide-react';

type Section = 'dashboard' | 'emergency' | 'chatbot' | 'quiz' | 'mood' | 'recommendations' | 'games' | 'chaigpt';

interface DashboardProps {
  onNavigate: (section: Section) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'emergency' as Section,
      title: 'SOS Emergency',
      description: 'Quick emergency alerts and contacts',
      icon: AlertTriangle,
      gradient: 'from-red-500 via-pink-500 to-rose-500',
      shadowColor: 'shadow-red-500/25',
      glowColor: 'group-hover:shadow-red-500/50',
    },
    {
      id: 'chatbot' as Section,
      title: 'Chat Buddy',
      description: 'Your personalized AI companion',
      icon: MessageCircle,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      shadowColor: 'shadow-blue-500/25',
      glowColor: 'group-hover:shadow-blue-500/50',
    },
    {
      id: 'quiz' as Section,
      title: 'Fun Quizzes',
      description: 'Test your knowledge and learn',
      icon: Brain,
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      shadowColor: 'shadow-purple-500/25',
      glowColor: 'group-hover:shadow-purple-500/50',
    },
    {
      id: 'mood' as Section,
      title: 'Mood Tracker',
      description: 'Track mood, get movie & song suggestions',
      icon: Heart,
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      shadowColor: 'shadow-pink-500/25',
      glowColor: 'group-hover:shadow-pink-500/50',
    },
    {
      id: 'recommendations' as Section,
      title: 'Wellness Tips',
      description: 'Yoga, food & wellness recommendations',
      icon: Lightbulb,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      shadowColor: 'shadow-green-500/25',
      glowColor: 'group-hover:shadow-green-500/50',
    },
    {
      id: 'games' as Section,
      title: 'Fun Games',
      description: 'Password apologizer & more games',
      icon: Gamepad2,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      shadowColor: 'shadow-orange-500/25',
      glowColor: 'group-hover:shadow-orange-500/50',
    },
    {
      id: 'chaigpt' as Section,
      title: 'ChaiGPT Tea Shop',
      description: 'Relaxing tea shop with ambient sounds',
      icon: Coffee,
      gradient: 'from-amber-600 via-orange-500 to-red-500',
      shadowColor: 'shadow-amber-500/25',
      glowColor: 'group-hover:shadow-amber-500/50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-12 h-12 text-yellow-400 mr-4 floating-animation" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Your Personal Buddy
              </h1>
              <div className="relative">
                <Star className="w-12 h-12 text-pink-400 ml-4 floating-animation" style={{ animationDelay: '2s' }} />
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-pink-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
              Your all-in-one companion for emergency support, wellness, entertainment, and fun! 
              Experience the magic of digital companionship.
            </p>
          </header>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className={`group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${feature.shadowColor} shadow-2xl hover:shadow-3xl ${feature.glowColor}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Background with Glass Effect */}
                  <div className="glass-card rounded-3xl p-8 h-full relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-purple-200 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      {/* Hover Arrow */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Welcome Section */}
          <div className="glass-card rounded-3xl p-12 text-center shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-green-400 mr-3" />
              <h2 className="text-3xl font-bold text-white">Welcome to Your Digital Sanctuary</h2>
              <Shield className="w-8 h-8 text-green-400 ml-3" />
            </div>
            <p className="text-xl text-purple-200 leading-relaxed max-w-4xl mx-auto">
              Whether you need emergency support, want to chat, track your mood, or just have some fun,
              your buddy is here to help. Click on any feature above to begin your wellness journey
              in this beautifully crafted digital space designed just for you.
            </p>
            <div className="mt-8 flex items-center justify-center space-x-4">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;