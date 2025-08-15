import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, RotateCcw } from 'lucide-react';

interface RecommendationCard {
  id: number;
  category: string;
  title: string;
  description: string;
  tip: string;
  icon: string;
  color: string;
}

interface RecommendationSectionProps {
  onBack: () => void;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ onBack }) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const recommendations: RecommendationCard[] = [
    {
      id: 1,
      category: 'Yoga',
      title: 'Morning Sun Salutation',
      description: 'Start your day with energy and mindfulness',
      tip: 'Begin with 5-10 rounds of Sun Salutation A. Focus on your breath and move slowly. This sequence wakes up your entire body and improves circulation.',
      icon: '🧘‍♀️',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      category: 'Nutrition',
      title: 'Rainbow Bowl',
      description: 'Colorful, nutrient-dense meal ideas',
      tip: 'Create a bowl with foods of different colors: red tomatoes, orange carrots, yellow peppers, green spinach, blue berries, purple cabbage. Each color provides unique nutrients!',
      icon: '🌈',
      color: 'bg-green-500'
    },
    {
      id: 3,
      category: 'Mindfulness',
      title: '5-4-3-2-1 Grounding',
      description: 'Quick technique to reduce anxiety',
      tip: 'Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you into the present moment.',
      icon: '🌸',
      color: 'bg-pink-500'
    },
    {
      id: 4,
      category: 'Exercise',
      title: 'Desk Stretches',
      description: 'Combat sitting all day with these moves',
      tip: 'Every hour, do neck rolls, shoulder shrugs, spinal twists, and calf raises. Set a reminder! Your body will thank you for the movement breaks.',
      icon: '💪',
      color: 'bg-blue-500'
    },
    {
      id: 5,
      category: 'Sleep',
      title: 'Perfect Sleep Environment',
      description: 'Optimize your bedroom for quality rest',
      tip: 'Keep your room cool (65-68°F), dark (blackout curtains), and quiet. Put devices away 1 hour before bed and try reading or gentle stretching instead.',
      icon: '😴',
      color: 'bg-indigo-500'
    },
    {
      id: 6,
      category: 'Hydration',
      title: 'Flavor Your Water',
      description: 'Make drinking water more enjoyable',
      tip: 'Add cucumber slices, lemon, mint, or berries to your water. Aim for half your body weight in ounces daily. Start your day with a full glass!',
      icon: '💧',
      color: 'bg-cyan-500'
    },
    {
      id: 7,
      category: 'Mental Health',
      title: 'Gratitude Practice',
      description: 'Shift your mindset with appreciation',
      tip: 'Write down 3 things you\'re grateful for each morning. They can be tiny (good coffee) or huge (loving family). This rewires your brain for positivity!',
      icon: '🙏',
      color: 'bg-yellow-500'
    },
    {
      id: 8,
      category: 'Productivity',
      title: 'Pomodoro Technique',
      description: 'Work smarter, not harder',
      tip: 'Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break. This maintains focus and prevents burnout.',
      icon: '⏰',
      color: 'bg-red-500'
    },
    {
      id: 9,
      category: 'Nature',
      title: 'Forest Bathing',
      description: 'Heal with the power of trees',
      tip: 'Spend 15-20 minutes mindfully in nature. Breathe deeply, touch tree bark, listen to birds. Studies show this reduces cortisol and boosts immunity!',
      icon: '🌲',
      color: 'bg-green-600'
    }
  ];

  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const flipAllCards = () => {
    if (flippedCards.size === recommendations.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(recommendations.map(card => card.id)));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-green-600 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3" />
              Wellness Recommendations
            </h1>
          </div>
          
          <button
            onClick={flipAllCards}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {flippedCards.size === recommendations.length ? 'Hide All Tips' : 'Show All Tips'}
          </button>
        </header>

        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any card to reveal wellness tips and recommendations. 
            Each card contains practical advice to improve your daily well-being!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((card) => (
            <div
              key={card.id}
              className="relative h-64 cursor-pointer"
              onClick={() => handleCardFlip(card.id)}
              style={{ perspective: '1000px' }}
            >
              <div className={`relative w-full h-full transition-transform duration-600 ${
                flippedCards.has(card.id) ? 'transform-gpu' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards.has(card.id) ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}>
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                     style={{ backfaceVisibility: 'hidden' }}>
                  <div className={`${card.color} h-full rounded-xl p-6 flex flex-col justify-center items-center text-white transform hover:scale-105 transition-transform`}>
                    <div className="text-5xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-bold text-center mb-2">{card.title}</h3>
                    <p className="text-center text-white text-opacity-90 mb-4">{card.description}</p>
                    <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {card.category}
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg"
                     style={{ 
                       backfaceVisibility: 'hidden',
                       transform: 'rotateY(180deg)'
                     }}>
                  <div className="bg-white h-full rounded-xl p-6 flex flex-col justify-center border border-gray-200">
                    <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 text-center mb-3">{card.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed text-center">{card.tip}</p>
                    <div className={`mt-4 text-center text-xs font-semibold px-3 py-1 rounded-full mx-auto ${
                      card.color.replace('bg-', 'bg-opacity-10 bg-') + ' ' + card.color.replace('bg-', 'text-')
                    }`}>
                      {card.category}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Wellness Journey</h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Small, consistent changes make the biggest impact on your well-being. 
            Try incorporating one tip at a time into your routine. Remember, wellness is a journey, 
            not a destination. Be patient and kind to yourself as you build healthier habits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationSection;