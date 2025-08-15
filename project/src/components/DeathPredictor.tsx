import React, { useState } from "react";

interface DeathPredictorProps {
  onBack: () => void;
}

const causes = [
  "Trampled by wild goats",
  "Slipped on a banana peel",
  "Old age while watching TV",
  "Eaten by mutant pigeons",
  "Accidental time travel paradox",
  "Laughing too hard at your own joke",
  "Fell asleep on a roller coaster",
  "Choked on a samosa",
  "Attacked by angry street cows",
  "Mistaken for a mannequin and locked in a mall",
  "Tripped over your own shadow",
  "Swallowed by a giant pothole",
  "Bored to death during a 6-hour wedding speech",
  "Sat on by an overenthusiastic sumo wrestler",
  "Electrocuted by your own headphones",
  "Slapped into another dimension by your mom"
];

const locations = [
  "on a beach in Goa",
  "inside your favorite cafe",
  "in your office chair",
  "at a theme park",
  "while skydiving",
  "at your neighbor’s barbecue",
  "during a Bollywood dance flash mob",
  "in the queue for pani puri",
  "while chasing an ice cream truck",
  "on top of a moving bus",
  "inside a giant washing machine",
  "at a cricket stadium",
  "while hiding from relatives during Diwali",
  "in the middle of a traffic jam",
  "on a film set as an accidental extra"
];

const afterlifeRoles = [
  "a grumpy housecat",
  "a wise old turtle",
  "a street food vendor in another dimension",
  "a ghost haunting elevators",
  "a cloud shaped like a potato",
  "the official chai-maker for the gods",
  "a pigeon with trust issues",
  "a dancing traffic policeman",
  "a talking auto-rickshaw",
  "a Bollywood villain’s sidekick",
  "a fortune-telling parrot",
  "the spirit of an overcooked biryani",
  "a sarcastic street dog",
  "a mischievous temple monkey",
  "a TikTok influencer in the afterlife"
];

export default function DeathPredictor({ onBack }: DeathPredictorProps) {
  const [prediction, setPrediction] = useState<null | string>(null);

  const generatePrediction = () => {
    const age = Math.floor(Math.random() * 60) + 40; // Age 40–100
    const cause = causes[Math.floor(Math.random() * causes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const afterlife = afterlifeRoles[Math.floor(Math.random() * afterlifeRoles.length)];

    setPrediction(
      `💀 You will live until ${age} years old, meeting your end by ${cause} ${location}.
      🪦 In the afterlife, you will be reincarnated as ${afterlife}.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <button
        onClick={onBack}
        className="mb-6 underline text-gray-300 hover:text-white"
      >
        ← Back to Fun Games
      </button>

      <h1 className="text-3xl font-bold mb-4">☠ Death Predictor</h1>
      <p className="mb-6 text-gray-400 text-center max-w-md">
        Enter your name (or don’t) and let fate decide your hilarious end...
      </p>

      <button
        onClick={generatePrediction}
        className="px-6 py-3 bg-red-700 rounded-full text-lg font-semibold hover:bg-red-800"
      >
        🔮 Predict My Death
      </button>

      {prediction && (
        <div className="mt-8 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 max-w-lg text-center">
          <p className="text-xl leading-relaxed">{prediction}</p>
        </div>
      )}
    </div>
  );
}