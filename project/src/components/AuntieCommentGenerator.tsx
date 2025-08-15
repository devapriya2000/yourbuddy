import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, RefreshCw, Heart } from 'lucide-react';

interface AuntieCommentGeneratorProps {
  onBack: () => void;
}

const AuntieCommentGenerator: React.FC<AuntieCommentGeneratorProps> = ({ onBack }) => {
  const [currentComment, setCurrentComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

const auntieComments = [
  "Wow, still wearing that outfit? Bold choice.",
  "Are you trying to set a world record for laziness?",
  "I see you\’ve mastered the art of doing nothing.",
  "Your browser history is more organized than your life.",
  "You call that cooking? Even the smoke alarm laughed.",
  "Is that hairstyle or a bird's nest? Hard to tell.",
  "You spend more time on TikTok than sleeping, huh?",
  "I\’ve seen toddlers with better time management.",
  "Do you even remember what a gym looks like?",
  "Your email inbox is a crime scene.",
  "Wow, you\’re late again. Punctuality called, it misses you.",
  "Your playlist is a crime against music.",
  "Even Google asks you for directions now, don\’t it?",
  "Your room looks like a tornado hit a thrift shop.",
  "Did you think \‘fashion disaster\’ was a style choice?",
  "Your cooking smells like an experiment gone wrong.",
  "I\’d say 'try harder,' but let\’s be honest, it\’s hopeless.",
  "You spend hours online and still know nothing.",
  "That haircut screams \‘regret in progress.\’",
  "Even your plants are plotting to run away from you.",
  "Your WiFi deserves an award for patience with you.",
  "Is that a skill or are you just winging it forever?",
  "You have the attention span of a goldfish, congrats!",
  "You call binge-watching a hobby? Admirable laziness.",
  "Your selfies could be used as cautionary tales.",
  "The dog is judging your life choices. So am I.",
  "You say you\’re productive. Lies, all lies.",
  "Your fashion sense belongs in a meme compilation.",
  "I checked your search history. Truly… remarkable.",
  "You might be online, but are you actually living?",
  "Your typing speed screams \‘why bother?\’",
  "Even autocorrect is embarrassed by your messages.",
  "You have a PhD in procrastination, congratulations!",
  "Your desktop is so cluttered, it needs a search party.",
  "The mirror called, it wants a break from your face.",
  "You binge snacks like an Olympic sport.",
  "Your jokes are so dry, I need water to survive them.",
  "You call this haircare? Even tumbleweeds look better.",
  "Your coffee intake is scary, your productivity isn\’t.",
  "Your room décor is a crime against interior design.",
  "You\’re like a browser tab—open everywhere, focused nowhere.",
  "Even autocorrect gave up on helping you.",
  "You scroll like it\’s cardio. Spoiler: it\’s not.",
  "Your cooking could be classified as biohazard.",
  "The universe sighed when you picked that outfit.",
  "You call that multitasking? I call it chaos.",
  "You spend hours online and forget what sunlight is.",
  "Even Google can\’t fix the mess that is your life.",
  "You have more browser tabs than life goals."
];



  const generateRandomComment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * auntieComments.length);
      setCurrentComment(auntieComments[randomIndex]);
      setIsLoading(false);
    }, 1000);
  };

  const speakComment = () => {
    if ('speechSynthesis' in window && currentComment) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(currentComment);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    generateRandomComment();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Games</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Auntie Comment Generator
            </h1>
            <p className="text-lg text-gray-600">
              Get authentic aunt wisdom and loving questions!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Aunt Image */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="https://st4.depositphotos.com/8322640/25671/v/450/depositphotos_256711610-stock-illustration-vector-cartoon-illustration-gossip-lady.jpg"
                    alt="Loving Aunt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Aunt Dorothy says:
                  </h3>
                  <div className="min-h-[100px] flex items-center">
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
                        <span className="text-gray-500 italic">Thinking of something to say...</span>
                      </div>
                    ) : (
                      <p className="text-lg text-gray-700 leading-relaxed italic">
                        "{currentComment}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={generateRandomComment}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>New Comment</span>
                  </button>
                  
                  <button
                    onClick={speakComment}
                    disabled={!currentComment || isPlaying}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                    <span>{isPlaying ? 'Speaking...' : 'Listen'}</span>
                  </button>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-gray-800 mb-3">Did you know?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Aunts play a special role in families - they comming for the functions only are for roasting and gossipping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuntieCommentGenerator;