import React, { useState } from 'react';
import { ArrowLeft, Heart, Smile, Meh, Frown, Music, Film, TrendingUp } from 'lucide-react';

interface MoodEntry {
  mood: string;
  intensity: number;
  date: Date;
  note?: string;
}

interface MoodTrackerProps {
  onBack: () => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onBack }) => {
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodIntensity, setMoodIntensity] = useState<number>(5);
  const [moodNote, setMoodNote] = useState<string>('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const moods = [
    { name: 'happy', label: 'Happy', icon: '😊', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { name: 'excited', label: 'Excited', icon: '🤩', color: 'bg-orange-500', textColor: 'text-orange-600' },
    { name: 'calm', label: 'Calm', icon: '😌', color: 'bg-blue-500', textColor: 'text-blue-600' },
    { name: 'sad', label: 'Sad', icon: '😢', color: 'bg-blue-700', textColor: 'text-blue-700' },
    { name: 'anxious', label: 'Anxious', icon: '😰', color: 'bg-red-500', textColor: 'text-red-600' },
    { name: 'angry', label: 'Angry', icon: '😠', color: 'bg-red-600', textColor: 'text-red-700' },
    { name: 'tired', label: 'Tired', icon: '😴', color: 'bg-purple-500', textColor: 'text-purple-600' },
    { name: 'neutral', label: 'Neutral', icon: '😐', color: 'bg-gray-500', textColor: 'text-gray-600' },
  ];

  const getRecommendations = (mood: string) => {
    const recommendations: Record<string, { movies: string[], songs: string[], activities: string[] }> = {
      happy: {
        movies: ['The Grand Budapest Hotel', 'Paddington', 'La La Land', 'The Princess Bride'],
        songs: ['Happy - Pharrell Williams', 'Good as Hell - Lizzo', 'Can\'t Stop the Feeling - Justin Timberlake', 'Walking on Sunshine - Katrina and the Waves'],
        activities: ['Dance party', 'Call a friend', 'Go for a walk', 'Try a new recipe']
      },
      sad: {
        movies: ['Inside Out', 'A Monster Calls', 'Her', 'The Pursuit of Happyness'],
        songs: ['Hurt - Johnny Cash', 'Mad World - Gary Jules', 'The Night We Met - Lord Huron', 'Skinny Love - Bon Iver'],
        activities: ['Journal writing', 'Take a warm bath', 'Listen to music', 'Watch comfort shows']
      },
      anxious: {
        movies: ['Studio Ghibli films', 'The Secret Garden', 'Finding Nemo', 'WALL-E'],
        songs: ['Weightless - Marconi Union', 'Claire de Lune - Debussy', 'River - Joni Mitchell', 'Mad About You - Sting'],
        activities: ['Deep breathing', 'Meditation', 'Progressive muscle relaxation', 'Go for a nature walk']
      },
      excited: {
        movies: ['The Avengers', 'Baby Driver', 'Mad Max: Fury Road', 'Spider-Man: Into the Spider-Verse'],
        songs: ['Uptown Funk - Bruno Mars', 'I Gotta Feeling - Black Eyed Peas', 'Shake It Off - Taylor Swift', 'Thunder - Imagine Dragons'],
        activities: ['Plan something fun', 'Share your excitement', 'Start a new project', 'Exercise or dance']
      },
      calm: {
        movies: ['My Neighbor Totoro', 'The Grand Budapest Hotel', 'Lost in Translation', 'Midnight in Paris'],
        songs: ['Clair de Lune - Debussy', 'Gymnopédie No. 1 - Erik Satie', 'The Four Seasons - Vivaldi', 'Aqueous Transmission - Incubus'],
        activities: ['Read a book', 'Practice yoga', 'Garden or tend plants', 'Enjoy a cup of tea']
      },
      angry: {
        movies: ['Anger Management', 'The Karate Kid', 'Rocky', 'Good Will Hunting'],
        songs: ['Lose Yourself - Eminem', 'Eye of the Tiger - Survivor', 'Stronger - Kelly Clarkson', 'Fight Song - Rachel Platten'],
        activities: ['Physical exercise', 'Punch a pillow', 'Write angry thoughts', 'Practice breathing exercises']
      },
      tired: {
        movies: ['Sleepy Hollow', 'The Sandman', 'Inception', 'Eternal Sunshine of the Spotless Mind'],
        songs: ['Sleepy Time Down South - Dean Martin', 'Dream a Little Dream - Ella Fitzgerald', 'Moon River - Audrey Hepburn', 'La Vie En Rose - Édith Piaf'],
        activities: ['Take a nap', 'Practice gentle yoga', 'Have a warm drink', 'Listen to calming music']
      },
      neutral: {
        movies: ['The Secret Life of Walter Mitty', 'Yes Man', 'Chef', 'Julie & Julia'],
        songs: ['Three Little Birds - Bob Marley', 'Here Comes the Sun - The Beatles', 'Lovely Day - Bill Withers', 'Don\'t Worry Be Happy - Bobby McFerrin'],
        activities: ['Try something new', 'Organize your space', 'Cook a favorite meal', 'Connect with nature']
      }
    };

    return recommendations[mood] || recommendations.neutral;
  };

  const handleMoodSubmit = () => {
    if (!currentMood) return;

    const newEntry: MoodEntry = {
      mood: currentMood,
      intensity: moodIntensity,
      date: new Date(),
      note: moodNote
    };

    setMoodHistory([newEntry, ...moodHistory]);
    setShowRecommendations(true);
  };

  const resetMoodTracker = () => {
    setCurrentMood('');
    setMoodIntensity(5);
    setMoodNote('');
    setShowRecommendations(false);
  };

  if (showRecommendations) {
    const recommendations = getRecommendations(currentMood);
    const selectedMood = moods.find(m => m.name === currentMood);

    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <button
              onClick={resetMoodTracker}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Track Another Mood
            </button>
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedMood?.icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Feeling {selectedMood?.label}
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-600">Intensity:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-6 rounded ${
                        level <= moodIntensity ? 'bg-pink-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-pink-600 font-semibold">{moodIntensity}/10</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Film className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Movie Recommendations</h3>
              </div>
              <div className="space-y-3">
                {recommendations.movies.map((movie, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">{movie}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Song Recommendations</h3>
              </div>
              <div className="space-y-3">
                {recommendations.songs.map((song, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">{song}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Activities</h3>
              </div>
              <div className="space-y-3">
                {recommendations.activities.map((activity, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-pink-600 flex items-center">
            <Heart className="w-8 h-8 mr-3" />
            Mood Tracker
          </h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How are you feeling today?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setCurrentMood(mood.name)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  currentMood === mood.name
                    ? `border-pink-500 ${mood.color} text-white scale-105`
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <div className="text-3xl mb-2">{mood.icon}</div>
                <div className={`font-semibold ${
                  currentMood === mood.name ? 'text-white' : mood.textColor
                }`}>
                  {mood.label}
                </div>
              </button>
            ))}
          </div>

          {currentMood && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood Intensity (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span className="font-semibold text-pink-600">{moodIntensity}</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                />
              </div>

              <button
                onClick={handleMoodSubmit}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Get Personalized Recommendations
              </button>
            </div>
          )}
        </div>

        {moodHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Recent Mood History</h3>
            </div>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {moodHistory.slice(0, 5).map((entry, index) => {
                const moodData = moods.find(m => m.name === entry.mood);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{moodData?.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">{moodData?.label}</p>
                        <p className="text-sm text-gray-600">
                          {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Intensity</p>
                      <p className="font-semibold text-pink-600">{entry.intensity}/10</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;