import React, { useMemo, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

type Buried = { idea: string; quote: string; date: string };

interface GraveyardProps {
  onBack: () => void;
}

type QuoteCategories = {
  general: string[];
  business: string[];
  tech: string[];
  creative: string[];
  personal: string[];
  funny: string[];
};

const graveyardQuoteCategories: QuoteCategories = {
  general: [
    "Not all ideas are meant to see the light of day... and that's perfectly okay! 🌙",
    "Sometimes the best ideas are the ones we let go of. Rest in peace, dear thought. 💭",
    "This idea served its purpose - it led you to better ones. Thank you for your service! 🙏",
    "Not every seed grows into a tree, but every seed teaches us about soil. 🌱",
    "Here rests an idea that was brave enough to be born, even if it couldn't survive. 💪",
    "Some ideas are like shooting stars - beautiful, brief, and gone too soon. ⭐",
  ],
  business: [
    "Here lies proof that you're creative enough to have bad ideas. That's actually good! 🎨",
    "This idea has joined the ranks of flying cars and hoverboards. Maybe someday... 🚗",
    "Here rests an idea that was killed by the harsh reality of 'how would this actually work?' ⚰️",
    "Not all heroes wear capes. Some are just terrible business ideas that taught us lessons. 🦸",
    "This idea lived fast, died young, and left a beautiful 'what were you thinking?' legacy. 💨",
  ],
  tech: [
    "This app idea has joined the graveyard of 'revolutionary' solutions nobody asked for. 📱",
    "Here lies another social media platform that was going to 'change everything.' 💻",
    "This startup idea died peacefully in its sleep, surrounded by market research. 📊",
    "May this blockchain idea rest in distributed peace. ⛓️",
    "This AI solution has achieved consciousness... the consciousness to know it won't work. 🤖",
  ],
  creative: [
    "This artistic vision has transcended to a realm where it doesn't need to make sense. 🎨",
    "Here lies a creative project that was too avant-garde for this world. 🎭",
    "This story idea has joined the great unwritten novels of history. 📚",
    "May this musical concept find harmony in the afterlife. 🎵",
    "This design idea has minimalized itself out of existence. ✨",
  ],
  personal: [
    "This life plan has been peacefully retired. Time for Plan B! 🌟",
    "Here rests a dream that taught you what you really want. 💫",
    "This goal has evolved into something better. Thanks for the stepping stone! 🪜",
    "May this aspiration rest knowing it sparked better ones. 🔥",
    "This plan has joined the noble ranks of 'seemed good at the time.' 🤷‍♂️",
  ],
  funny: [
    "In loving memory of an idea that made perfect sense at 3 AM. 🌃",
    "This idea may be dead, but it died doing what it loved - being completely impractical! 😂",
    "Here lies an idea that was ahead of its time... by about 200 years. ⏰",
    "This concept has achieved what it always wanted - to be truly unique and utterly useless. 🦄",
    "May this idea rest knowing it provided excellent entertainment value. 🎪",
  ],
};

// Simple heuristic to choose a category and return 5 mixed quotes
function analyzeIdeaAndSuggestQuotes(input: string): string[] {
  const t = input.toLowerCase();
  const scores: Record<keyof QuoteCategories, number> = {
    general: 0,
    business: 0,
    tech: 0,
    creative: 0,
    personal: 0,
    funny: 0,
  };

  // keywords
  const bump = (cat: keyof QuoteCategories, n = 1) => (scores[cat] += n);

  if (/(revenue|market|startup|pitch|roi|invest|client|sales|business|company)/.test(t)) bump('business', 3);
  if (/(app|api|platform|ai|ml|blockchain|crypto|saas|cloud|database|server|tech|website)/.test(t)) bump('tech', 3);
  if (/(novel|story|art|design|song|music|paint|illustration|film|script|creative)/.test(t)) bump('creative', 3);
  if (/(diet|plan|habit|relationship|routine|goal|career|life|personal)/.test(t)) bump('personal', 3);
  if (/(meme|funny|joke|prank|silly|ridiculous)/.test(t)) bump('funny', 2);

  // catch-all
  if (t.length < 20) bump('general', 1);

  const bestCategory = (Object.keys(scores) as (keyof QuoteCategories)[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );

  const categoryQuotes = graveyardQuoteCategories[bestCategory] || graveyardQuoteCategories.general;
  const generalQuotes = graveyardQuoteCategories.general;
  const funnyQuotes = graveyardQuoteCategories.funny;

  const allQuotes = [...categoryQuotes, ...generalQuotes.slice(0, 2), ...funnyQuotes.slice(0, 2)];
  const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

const GraveyardGame: React.FC<GraveyardProps> = ({ onBack }) => {
  // Core state (kept to your original spirit)
  const [brokenIdea, setBrokenIdea] = useState('');
  const [suggestedQuotes, setSuggestedQuotes] = useState<string[]>([]);
  const [selectedQuote, setSelectedQuote] = useState('');
  const [showBurial, setShowBurial] = useState(false);
  const [buriedIdeas, setBuriedIdeas] = useState<Buried[]>([]);
  const [isBurying, setIsBurying] = useState(false);
  const [isGeneratingQuotes, setIsGeneratingQuotes] = useState(false);
  const [showQuoteSelection, setShowQuoteSelection] = useState(false);

  // New: choose quote mode (auto vs manual)
  const [autoMode, setAutoMode] = useState<"auto" | "manual">("manual");

  // Animation helpers
  const [animIdea, setAnimIdea] = useState('');      // the floating idea text during animation
  const [animPhase, setAnimPhase] = useState<'idle' | 'fall' | 'cover' | 'done'>('idle');

  const canBuryManual = brokenIdea.trim() && selectedQuote && !isBurying;
  const canBuryAuto = brokenIdea.trim() && !isBurying;

  const generateQuoteSuggestions = () => {
    if (!brokenIdea.trim()) return;
    setIsGeneratingQuotes(true);
    setShowQuoteSelection(false);

    setTimeout(() => {
      const suggestions = analyzeIdeaAndSuggestQuotes(brokenIdea);
      setSuggestedQuotes(suggestions);
      setIsGeneratingQuotes(false);
      setShowQuoteSelection(true);
    }, 1200);
  };

  const bury = (quoteToUse: string) => {
    if (!brokenIdea.trim()) return;

    // Start animation
    setIsBurying(true);
    setShowBurial(false);
    setAnimIdea(brokenIdea);
    setAnimPhase('fall');

    // Phase timings: fall (1.2s) -> cover (0.9s) -> done (insert to history)
    setTimeout(() => setAnimPhase('cover'), 1200);
    setTimeout(() => {
      setAnimPhase('done');
      const entry: Buried = {
        idea: brokenIdea,
        quote: quoteToUse,
        date: new Date().toLocaleDateString(),
      };
      setBuriedIdeas((prev) => [entry, ...prev]);
      setShowBurial(true);

      // Reset inputs after a brief moment
      setTimeout(() => {
        setBrokenIdea('');
        setSelectedQuote('');
        setSuggestedQuotes([]);
        setShowQuoteSelection(false);
        setIsBurying(false);
        setAnimIdea('');
        setAnimPhase('idle');

        // hide success banner
        setTimeout(() => setShowBurial(false), 2200);
      }, 400);
    }, 2100);
  };

  // ACTIONS
  const onBuryManual = () => {
    if (!selectedQuote) return;
    bury(selectedQuote);
  };

  const onBuryAuto = () => {
    // If we don't have suggestions yet, create them on the fly
    const pool = suggestedQuotes.length ? suggestedQuotes : analyzeIdeaAndSuggestQuotes(brokenIdea);
    const autoPick = pool[Math.floor(Math.random() * pool.length)] || "Here lies a brave idea that taught us well. 🌙";
    bury(autoPick);
  };

  const resetSection = () => {
    setBrokenIdea('');
    setSelectedQuote('');
    setSuggestedQuotes([]);
    setShowQuoteSelection(false);
    setIsBurying(false);
    setAnimIdea('');
    setAnimPhase('idle');
    setShowBurial(false);
  };

  // Small derived UI bits
  const hasHistory = buriedIdeas.length > 0;

  // Decorative shimmer for buttons
  const ButtonShimmer = useMemo(
    () =>
      "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent hover:before:animate-[shimmer_1.2s_linear_infinite]",
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900 relative overflow-hidden">
      {/* soft blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center glass-card px-6 py-3 rounded-2xl text-white hover:bg-white hover:bg-opacity-20 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Games
            </button>

            <h1 className="text-4xl font-bold text-white flex items-center">
              🪦 Graveyard for Broken Ideas <span className="ml-2 text-purple-300">🌙</span>
            </h1>

            <div className="w-32" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Main Burial Section */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-bounce">🪦</div>
                <h2 className="text-3xl font-bold text-white mb-2">Bury Your Broken Idea</h2>
                <p className="text-gray-300">
                  Share your idea that didn't work out, then pick a farewell quote—or let AI choose one—and give it a peaceful rest.
                </p>
              </div>

              {/* Step 1: Enter idea */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    What was your broken idea?
                  </label>
                  <textarea
                    value={brokenIdea}
                    onChange={(e) => setBrokenIdea(e.target.value)}
                    placeholder="Describe your idea that didn't work out... (e.g., 'A social media platform for pets only')"
                    rows={4}
                    className="w-full px-4 py-3 glass-card text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Mode Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAutoMode('manual')}
                    className={`rounded-xl px-4 py-3 font-semibold transition-all ${
                      autoMode === 'manual'
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'glass-card text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    I’ll choose the quote
                  </button>
                  <button
                    onClick={() => setAutoMode('auto')}
                    className={`rounded-xl px-4 py-3 font-semibold transition-all ${
                      autoMode === 'auto'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'glass-card text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    AI chooses for me
                  </button>
                </div>

                {/* Step 2A: Manual – fetch suggestions & pick */}
                {autoMode === 'manual' && (
                  <>
                    {!showQuoteSelection && (
                      <button
                        onClick={generateQuoteSuggestions}
                        disabled={!brokenIdea.trim() || isGeneratingQuotes}
                        className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${ButtonShimmer}`}
                      >
                        {isGeneratingQuotes ? (
                          <div className="flex items-center justify-center">
                            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                            AI is crafting quotes...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Sparkles className="w-5 h-5 mr-2" />
                            Get AI-Suggested Quotes
                          </div>
                        )}
                      </button>
                    )}

                    {showQuoteSelection && (
                      <div className="animate-slide-up">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                          Choose Your Farewell Quote
                        </h3>
                        <div className="space-y-3">
                          {suggestedQuotes.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedQuote(q)}
                              className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.01] ${
                                selectedQuote === q
                                  ? 'bg-gradient-to-r from-purple-500/30 to-blue-500/30 border-2 border-purple-400'
                                  : 'glass-card hover:bg-white hover:bg-opacity-10'
                              }`}
                            >
                              <p className="text-white">{q}</p>
                            </button>
                          ))}
                        </div>

                        {selectedQuote && (
                          <div className="mt-4 space-y-4">
                            <div className="glass-card rounded-xl p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30">
                              <h4 className="text-lg font-bold text-purple-300 mb-2">Selected Quote:</h4>
                              <p className="text-white italic">"{selectedQuote}"</p>
                            </div>

                            <button
                              onClick={onBuryManual}
                              disabled={!canBuryManual}
                              className={`w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${ButtonShimmer}`}
                            >
                              ⚰️ Bury This Idea with Honor
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Step 2B: Auto – bury now */}
                {autoMode === 'auto' && (
                  <button
                    onClick={onBuryAuto}
                    disabled={!canBuryAuto}
                    className={`w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${ButtonShimmer}`}
                  >
                    ⚰️ Bury with an AI-Chosen Quote
                  </button>
                )}

                {/* Reset */}
                <button
                  onClick={resetSection}
                  className="w-full glass-card hover:bg-white hover:bg-opacity-10 text-gray-300 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Start Over
                </button>
              </div>

              {/* Burial feedback */}
              {showBurial && (
                <div className="mt-8 glass-card rounded-xl p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 animate-bounce-in">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🕊️</div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Idea Buried Successfully</h3>
                    <p className="text-white">
                      Your idea has found peace. May it rest knowing it contributed to your growth.
                    </p>
                  </div>
                </div>
              )}

              {/* Grave Animation Area */}
              <div className="mt-8">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900/60">
                  {/* Ground */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-700 to-stone-600"></div>

                  {/* Tombstone */}
                  <div className="absolute left-10 bottom-16 w-16 h-20 bg-stone-400/80 rounded-t-2xl border border-stone-300 shadow-lg">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-stone-300 rounded"></div>
                    <div className={`absolute inset-0 rounded-t-2xl ${animPhase !== 'idle' ? 'animate-glow' : ''}`} />
                    <div className="absolute inset-0 flex items-center justify-center text-stone-700 text-xs font-bold">
                      R.I.P.
                    </div>
                  </div>

                  {/* Falling idea note */}
                  {isBurying && animIdea && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 bg-white/90 text-stone-800 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm ${
                        animPhase === 'fall' ? 'animate-fall' : animPhase === 'cover' ? 'opacity-0' : 'hidden'
                      }`}
                      style={{ maxWidth: '70%' }}
                    >
                      {animIdea}
                    </div>
                  )}

                  {/* Dirt slide cover */}
                  {isBurying && (
                    <div
                      className={`absolute inset-x-0 bottom-0 h-0 bg-amber-800/70 ${
                        animPhase === 'cover' ? 'animate-cover' : ''
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: History */}
            <div className="glass-card rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 animate-pulse">🌙</div>
                <h2 className="text-2xl font-bold text-white mb-2">Memorial Garden</h2>
                <p className="text-gray-300">Your buried ideas rest here in peace</p>
              </div>

              <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-1">
                {!hasHistory ? (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-4">🌸</div>
                    <p>No ideas buried yet. When you're ready to let go of something, I'll be here to help.</p>
                  </div>
                ) : (
                  buriedIdeas.map((burial, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-xl p-4 border-l-4 border-purple-400 animate-slide-up"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-white text-sm">💭 {burial.idea}</h4>
                        <span className="text-xs text-gray-400">{burial.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm italic">"{burial.quote}"</p>
                      <div className="mt-2 text-right">
                        <span className="text-xs text-purple-400">⚰️ R.I.P.</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* local keyframes so you don't need framer-motion */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(8px); opacity: 0 }
          to   { transform: translateY(0); opacity: 1 }
        }
        .animate-slide-up { animation: slideUp .35s ease-out both }

        @keyframes bounceIn {
          0% { transform: scale(.95); opacity: 0 }
          60% { transform: scale(1.02); opacity: 1 }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounceIn .5s ease-out both }

        @keyframes fall {
          0%   { top: -36px; opacity: 0 }
          10%  { opacity: 1 }
          80%  { top: 90px; opacity: 1 }
          100% { top: 110px; opacity: 0 }
        }
        .animate-fall { animation: fall 1.2s ease-in forwards }

        @keyframes cover {
          from { height: 0 }
          to   { height: 64px }
        }
        .animate-cover { animation: cover .9s ease-in forwards }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(168,85,247,0) }
          50% { box-shadow: 0 0 24px rgba(168,85,247,.35) }
        }
        .animate-glow { animation: glowPulse 2s ease-in-out 2 }

        @keyframes shimmer {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>
    </div>
  );
};

export default GraveyardGame;

