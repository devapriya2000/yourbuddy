import React, { useState } from 'react';
import AuntieCommentGenerator from './AuntieCommentGenerator';//7.36  pm modified
import Graveyard from "./Graveyard";//8.19
import ChaiGPT from './ChaiGPT';
import MovieRoast from "./MovieRoastGame";
import DeathPredictor from "./DeathPredictor";


import { ArrowLeft, Gamepad2, Lock, Heart, Smile, Frown, RotateCcw } from 'lucide-react';

interface FunGamesSectionProps {
  onBack: () => void;
}

const FunGamesSection: React.FC<FunGamesSectionProps> = ({ onBack }) => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const games = [
    {
      id: 'password-apologizer',
      title: 'Password Apologizer',
      description: 'Forgot your password? Apologize to get it back!',
      icon: '🔐',
      color: 'bg-red-500'
    },
    {
      id: 'mood-detector',
      title: 'AI Mood Detective',
      description: 'Let me guess your mood with silly questions!',
      icon: '🕵️‍♂️',
      color: 'bg-purple-500'
    },
    {
      id: 'compliment-generator',
      title: 'Random Compliment Generator',
      description: 'Get a personalized compliment to brighten your day',
      icon: '🌟',
      color: 'bg-yellow-500'
    },
    {
      id: 'decision-maker',
      title: 'Magic Decision Maker',
      description: 'Can\'t decide? Let the magic 8-ball help you!',
      icon: '🎱',
      color: 'bg-blue-500'
    },
    {
      id: 'coconut-offering',
      title: 'Virtual Coconut Offering',
      description: 'Drop coconuts in the temple for instant karma!',
      icon: '🥥',
      color: 'bg-amber-500'
    },
    
    {
  id: 'auntie-comment',
  title: 'Auntie Comment Generator',
  description: 'Get hilarious life advice from a sassy auntie!',
  icon: '🧓',
  color: 'bg-pink-500'
},
{
  id: 'graveyard',
  title: 'Graveyard',
  description: 'A spooky fun mini-game!',
  icon: '⚰️',
  color: 'bg-purple-600'
},
{
  id: 'chai-gpt',
  title: 'ChaiGPT',
  description: 'Relax with chai and ambient sounds!',
  icon: '☕',
  color: 'bg-green-500'
},
{
      id: 'movie-roast', // <-- NEW
      title: 'Movie Ending Roast',
      description: 'Select a movie & get roasted about its ending!',
      icon: '🎬',
      color: 'bg-orange-500'
    },


{
  id: 'death-predictor',
  title: 'Death Predictor',
  description: 'Find out your hilarious fate!',
  icon: '⚰',
  color: 'bg-gray-800'
}
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'password-apologizer':
        return <PasswordApologizer onBack={() => setCurrentGame(null)} />;
      case 'mood-detector':
        return <MoodDetective onBack={() => setCurrentGame(null)} />;
      case 'compliment-generator':
        return <ComplimentGenerator onBack={() => setCurrentGame(null)} />;
      case 'decision-maker':
        return <DecisionMaker onBack={() => setCurrentGame(null)} />;
      case 'coconut-offering':
        return <CoconutOffering onBack={() => setCurrentGame(null)} />;
            case 'auntie-comment':
      return <AuntieCommentGenerator onBack={() => setCurrentGame(null)} />;//7.42pm
      case 'graveyard':
      return <Graveyard onBack={() => setCurrentGame(null)} />; 
      case 'chai-gpt':
  return <ChaiGPT onBack={() => setCurrentGame(null)} />;
  case 'movie-roast': // <-- NEW
        return <MovieRoast onBack={() => setCurrentGame(null)} />;
        case 'death-predictor':
  return <DeathPredictor onBack={() => setCurrentGame(null)} />;


      default:
        return null;
    }
  };

  if (currentGame) {
    return renderGame();
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-indigo-600 flex items-center">
            <Gamepad2 className="w-8 h-8 mr-3" />
            Fun Games
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${game.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{game.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-gray-600">{game.description}</p>
              </div>
              <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Let's Have Some Fun!</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Take a break from the serious stuff and enjoy these silly, interactive games. 
            They're designed to make you smile, laugh, and maybe even help you make some decisions!
          </p>
        </div>
      </div>
    </div>
  );
};

// Password Apologizer Game Component
const PasswordApologizer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [apologyText, setApologyText] = useState('');
  const [apologyScore, setApologyScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');

  const apologyKeywords = ['sorry', 'apologize', 'forgive', 'mistake', 'wrong', 'please', 'regret', 'fault'];
  const password = 'BuddyIsAwesome2024!';

  const analyzeApology = () => {
    const text = apologyText.toLowerCase();
    let score = 0;
    let foundKeywords: string[] = [];

    apologyKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 10;
        foundKeywords.push(keyword);
      }
    });

    if (text.length > 50) score += 10;
    if (text.includes('!')) score += 5;
    if (text.includes('very') || text.includes('really')) score += 5;

    setApologyScore(score);

    if (score >= 50) {
      setShowPassword(true);
      setFeedback('Perfect! Your sincere apology has been accepted. Here\'s your password!');
    } else if (score >= 30) {
      setFeedback('Getting better... but I need to feel more sincerity. Try adding more heartfelt words!');
    } else if (score >= 15) {
      setFeedback('Hmm, that\'s a start, but I\'m not convinced. Put more emotion into your apology!');
    } else {
      setFeedback('That doesn\'t sound very sorry to me. Try again with more feeling!');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Games
          </button>
          <h1 className="text-3xl font-bold text-red-600 flex items-center">
            <Lock className="w-8 h-8 mr-3" />
            Password Apologizer
          </h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Password Protected</h2>
            <p className="text-gray-600">
              You forgot your password again! But don't worry, if you apologize sincerely enough, 
              I might just give it back to you...
            </p>
          </div>

          {!showPassword ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write your apology here:
                </label>
                <textarea
                  value={apologyText}
                  onChange={(e) => setApologyText(e.target.value)}
                  placeholder="I'm really sorry that I forgot my password again... (be creative and sincere!)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                />
              </div>

              <button
                onClick={analyzeApology}
                disabled={!apologyText.trim()}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Apology
              </button>

              {feedback && (
                <div className={`p-4 rounded-lg ${
                  apologyScore >= 50 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <p className={`font-medium ${
                    apologyScore >= 50 ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {feedback}
                  </p>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600 mb-1">Sincerity Score: {apologyScore}/60</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(apologyScore / 60 * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600">Apology Accepted!</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-sm text-green-600 mb-2">Your Password:</p>
                <p className="text-2xl font-mono font-bold text-green-800">{password}</p>
              </div>
              <p className="text-gray-600">
                Don't forget it again! (But if you do, you know where to find me 😉)
              </p>
              <button
                onClick={() => {
                  setApologyText('');
                  setApologyScore(0);
                  setShowPassword(false);
                  setFeedback('');
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mood Detective Game Component
const MoodDetective: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);

  const questions = [
    {
      question: "What's your ideal Friday night activity?",
      options: [
        { text: "Netflix and snacks on the couch", mood: "chill" },
        { text: "Dancing until 2 AM", mood: "energetic" },
        { text: "Deep conversation with friends", mood: "thoughtful" },
        { text: "Organizing my entire room", mood: "productive" }
      ]
    },
    {
      question: "Pick your spirit animal:",
      options: [
        { text: "Sloth - slow and steady", mood: "chill" },
        { text: "Hummingbird - always buzzing", mood: "energetic" },
        { text: "Owl - wise and observant", mood: "thoughtful" },
        { text: "Ant - hardworking team player", mood: "productive" }
      ]
    },
    {
      question: "Your phone battery is at 5%. You:",
      options: [
        { text: "Eh, whatever happens happens", mood: "chill" },
        { text: "Sprint to find the nearest charger", mood: "energetic" },
        { text: "Wonder why you didn't notice sooner", mood: "thoughtful" },
        { text: "Pull out your backup portable charger", mood: "productive" }
      ]
    }
  ];

  const moodResults = {
    chill: {
      title: "Chill Vibes Detected! 😎",
      description: "You're giving off major relaxed energy today. You're the type who goes with the flow and doesn't stress about the small stuff.",
      color: "bg-blue-500",
      suggestions: ["Take a peaceful walk", "Listen to lo-fi music", "Try some gentle yoga"]
    },
    energetic: {
      title: "High Energy Mode! ⚡",
      description: "You're buzzing with enthusiasm! Your energy could power a small city. You're ready to take on the world!",
      color: "bg-orange-500",
      suggestions: ["Go for a run", "Call a friend", "Start that project you've been putting off"]
    },
    thoughtful: {
      title: "Deep Thinker Alert! 🤔",
      description: "Your mind is in contemplation mode. You're processing life's big questions and seeing things from different angles.",
      color: "bg-purple-500",
      suggestions: ["Journal your thoughts", "Read a good book", "Have a meaningful conversation"]
    },
    productive: {
      title: "Productivity Powerhouse! 📋",
      description: "You're in get-things-done mode! Your organized, efficient energy is inspiring. Nothing can stop you today!",
      color: "bg-green-500",
      suggestions: ["Tackle your to-do list", "Organize your space", "Plan your week ahead"]
    }
  };

  const handleAnswer = (selectedOption: any) => {
    const newAnswers = [...answers, selectedOption.mood];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate dominant mood
      const moodCounts = newAnswers.reduce((acc: any, mood) => {
        acc[mood] = (acc[mood] || 0) + 1;
        return acc;
      }, {});
      
      const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b
      );
      
      setDetectedMood(dominantMood);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setDetectedMood(null);
  };

  if (detectedMood) {
    const result = moodResults[detectedMood as keyof typeof moodResults];
    
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          <header className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Games
            </button>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🕵️‍♂️</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Case Closed!</h2>
            
            <div className={`${result.color} rounded-lg p-6 text-white mb-6`}>
              <h3 className="text-2xl font-bold mb-3">{result.title}</h3>
              <p className="text-lg">{result.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Mood-Boosting Suggestions:</h4>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-600">• {suggestion}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={resetGame}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
            >
              Detect Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Other Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Games
          </button>
          <h1 className="text-3xl font-bold text-purple-600">🕵️‍♂️ AI Mood Detective</h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Compliment Generator Component
const ComplimentGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentCompliment, setCurrentCompliment] = useState('');
  const [userName, setUserName] = useState('');
  const [showCompliment, setShowCompliment] = useState(false);

  const compliments = [
    "Your smile could light up the entire room and probably a few neighboring buildings too!",
    "You have the kind of energy that makes everything better just by being there.",
    "Your creativity is absolutely incredible - you see possibilities where others see problems.",
    "You're the type of person who makes others feel heard and valued.",
    "Your determination is inspiring - you never give up on what matters to you.",
    "You have an amazing ability to find the bright side in any situation.",
    "Your kindness creates ripple effects of positivity wherever you go.",
    "You're incredibly thoughtful - always considering others in everything you do.",
    "Your sense of humor is a gift that makes everyone around you happier.",
    "You have such a unique perspective that adds value to every conversation.",
    "Your resilience is remarkable - you bounce back stronger every time.",
    "You're the friend everyone wishes they had - loyal, caring, and genuine.",
    "Your passion for life is contagious and motivates others to dream bigger.",
    "You have an incredible talent for making people feel comfortable and welcome."
  ];

  const generateCompliment = () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCurrentCompliment(randomCompliment);
    setShowCompliment(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Games
          </button>
          <h1 className="text-3xl font-bold text-yellow-600">🌟 Compliment Generator</h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">✨</div>
          
          {!showCompliment ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ready for Some Positivity?
              </h2>
              <p className="text-gray-600 mb-6">
                Everyone deserves to hear something wonderful about themselves. 
                Let me brighten your day with a personalized compliment!
              </p>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="What's your name? (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                onClick={generateCompliment}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105"
              >
                Generate My Compliment! 🎉
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-yellow-600 mb-4">
                {userName ? `Hey ${userName}!` : 'Here\'s your compliment!'}
              </h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-lg text-yellow-800 leading-relaxed">
                  {currentCompliment}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={generateCompliment}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Another One! 🔄
                </button>
                <button
                  onClick={() => {
                    setShowCompliment(false);
                    setCurrentCompliment('');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Decision Maker Component  
const DecisionMaker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const answers = [
    "Absolutely! Go for it! 🚀",
    "Hmm, maybe wait a little longer... ⏰",
    "Yes, but be prepared for surprises! 🎲",
    "Not today, but keep it in mind for later 📅",
    "Definitely! The stars are aligned for this! ⭐",
    "I have a good feeling about this one! 😊",
    "Proceed with caution, but proceed nonetheless 🚧",
    "Ask me again tomorrow - timing isn't right yet 🌙",
    "100% yes! What are you waiting for? 💯",
    "No way, Jose! Try something else instead 🚫",
    "The answer is within you... but also, yes! 💫",
    "Flip a coin, then do the opposite of what you want! 🪙",
    "Only if you're wearing your lucky socks 🧦",
    "The universe says: Why not? 🌌"
  ];

  const getAnswer = () => {
    if (!question.trim()) return;
    
    setIsShaking(true);
    setTimeout(() => {
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
    }, 2000);
  };

  const reset = () => {
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Games
          </button>
          <h1 className="text-3xl font-bold text-blue-600">🎱 Magic Decision Maker</h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className={`text-8xl mb-6 ${isShaking ? 'animate-bounce' : ''}`}>
            🎱
          </div>
          
          {!answer && !isShaking ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Can't Decide? Let Me Help!
              </h2>
              <p className="text-gray-600 mb-6">
                Ask me any yes/no question or decision you're struggling with. 
                The magic 8-ball knows all! (Disclaimer: Results may vary 😉)
              </p>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Should I order pizza for dinner?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={getAnswer}
                disabled={!question.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105"
              >
                Shake the Magic 8-Ball! 🎯
              </button>
            </div>
          ) : isShaking ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                Consulting the universe...
              </h2>
              <div className="text-lg text-gray-600">
                "{question}"
              </div>
              <div className="animate-pulse text-gray-500">
                🔮 The magic 8-ball is thinking... 🔮
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Your Question:
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 italic">"{question}"</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">The Magic 8-Ball Says:</h3>
                <p className="text-xl text-blue-700">
                  {answer}
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={reset}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Ask Another Question 🔄
                </button>
                <button
                  onClick={onBack}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Try Other Games
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Coconut Offering Game Component
const CoconutOffering: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [karmaPoints, setKarmaPoints] = useState(0);
  const [totalOfferings, setTotalOfferings] = useState(0);
  const [currentBlessing, setCurrentBlessing] = useState('');
  const [showBlessing, setShowBlessing] = useState(false);
  const [coconutPosition, setCoconutPosition] = useState({ x: 50, y: 20 });
  const [isDropping, setIsDropping] = useState(false);
  const [showKarmaAnimation, setShowKarmaAnimation] = useState(false);

  const blessings = [
    "🙏 May peace and prosperity flow into your life",
    "✨ Your kindness will return to you tenfold",
    "🌟 Divine light guides your path forward",
    "💫 Abundance and joy surround you always",
    "🕉️ Inner wisdom awakens within your heart",
    "🌸 Love and compassion bloom in your soul",
    "🙌 Your prayers have been heard and blessed",
    "💖 Positive energy radiates from your being",
    "🌺 Good fortune follows your every step",
    "🕯️ May your spirit shine bright like a flame",
    "🌙 Serenity and calm embrace your mind",
    "⭐ Your devotion brings divine protection",
    "🌈 Happiness colors all your days ahead",
    "🦋 Transformation and growth bless your journey",
    "🌻 Your generous heart attracts miracles"
  ];

  const dropCoconut = () => {
    if (isDropping) return;
    
    setIsDropping(true);
    
    // Animate coconut falling
    setTimeout(() => {
      const points = Math.floor(Math.random() * 50) + 10; // 10-60 points
      const blessing = blessings[Math.floor(Math.random() * blessings.length)];
      
      setKarmaPoints(prev => prev + points);
      setTotalOfferings(prev => prev + 1);
      setCurrentBlessing(blessing);
      setShowBlessing(true);
      setShowKarmaAnimation(true);
      setIsDropping(false);
      
      // Hide blessing after 3 seconds
      setTimeout(() => {
        setShowBlessing(false);
        setShowKarmaAnimation(false);
      }, 3000);
    }, 1000);
  };

  const resetGame = () => {
    setKarmaPoints(0);
    setTotalOfferings(0);
    setCurrentBlessing('');
    setShowBlessing(false);
    setIsDropping(false);
    setShowKarmaAnimation(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Games
          </button>
          <button
            onClick={resetGame}
            className="flex items-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Karma
          </button>
        </header>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-600 mb-2">🏛️ Virtual Temple</h1>
          <p className="text-gray-600">Drop coconuts as offerings and receive divine blessings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">{karmaPoints}</div>
            <div className="text-gray-600">Karma Points</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{totalOfferings}</div>
            <div className="text-gray-600">Total Offerings</div>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 relative overflow-hidden">
          {/* Temple */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🏛️</div>
            <div className="text-2xl mb-2">🕉️ Sacred Temple 🕉️</div>
            <div className="w-32 h-8 bg-amber-200 rounded-full mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full opacity-50"></div>
              <div className="absolute inset-2 bg-amber-100 rounded-full"></div>
            </div>
          </div>

          {/* Coconut */}
          <div className="relative h-40 mb-8">
            <div 
              className={`absolute text-4xl transition-all duration-1000 ${
                isDropping ? 'transform translate-y-32' : ''
              }`}
              style={{ 
                left: '50%', 
                transform: `translateX(-50%) ${isDropping ? 'translateY(128px)' : 'translateY(0px)'}`,
                top: '0px'
              }}
            >
              🥥
            </div>
          </div>

          {/* Drop Button */}
          <div className="text-center mb-6">
            <button
              onClick={dropCoconut}
              disabled={isDropping}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                isDropping 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-amber-500 hover:bg-amber-600 hover:scale-105 active:scale-95'
              } text-white shadow-lg`}
            >
              {isDropping ? 'Offering in Progress...' : 'Drop Coconut Offering 🥥'}
            </button>
          </div>

          {/* Karma Animation */}
          {showKarmaAnimation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce-in">
              <div className="text-6xl text-amber-500">+{karmaPoints - (totalOfferings - 1) * 30}</div>
            </div>
          )}
        </div>

        {/* Blessing Display */}
        {showBlessing && (
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-xl p-6 text-center animate-slide-up">
            <div className="text-2xl mb-3">🙏 Divine Blessing Received 🙏</div>
            <p className="text-lg text-amber-800 font-medium">{currentBlessing}</p>
          </div>
        )}

        {/* Instructions */}
        {!showBlessing && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-3">How to Play</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🥥</span>
                <span>Click to drop coconut offerings</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">⭐</span>
                <span>Earn karma points with each offering</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">🙏</span>
                <span>Receive divine blessings instantly</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunGamesSection;