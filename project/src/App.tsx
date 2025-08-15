import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import EmergencySection from './components/EmergencySection';
import ChatbotSection from './components/ChatbotSection';
import QuizSection from './components/QuizSection';
import MoodTracker from './components/MoodTracker';
import RecommendationSection from './components/RecommendationSection';
import FunGamesSection from './components/FunGamesSection';
import ChaiGPT from './components/ChaiGPT';

type Section = 'dashboard' | 'emergency' | 'chatbot' | 'quiz' | 'mood' | 'recommendations' | 'games' | 'chaigpt';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');

  const renderSection = () => {
    switch (currentSection) {
      case 'emergency':
        return <EmergencySection onBack={() => setCurrentSection('dashboard')} />;
      case 'chatbot':
        return <ChatbotSection onBack={() => setCurrentSection('dashboard')} />;
      case 'quiz':
        return <QuizSection onBack={() => setCurrentSection('dashboard')} />;
      case 'mood':
        return <MoodTracker onBack={() => setCurrentSection('dashboard')} />;
      case 'recommendations':
        return <RecommendationSection onBack={() => setCurrentSection('dashboard')} />;
      case 'games':
        return <FunGamesSection onBack={() => setCurrentSection('dashboard')} />;
      case 'chaigpt':
        return <ChaiGPT onBack={() => setCurrentSection('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700">
      {renderSection()}
    </div>
  );
}

export default App;
