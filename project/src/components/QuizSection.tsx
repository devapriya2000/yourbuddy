import React, { useState } from 'react';
import { ArrowLeft, Brain, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

interface QuizSectionProps {
  onBack: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onBack }) => {
  const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizCategories = [
    {
      id: 'general',
      title: 'General Knowledge',
      description: 'Test your knowledge of various topics',
      color: 'bg-blue-500',
      icon: '🌍'
    },
    {
      id: 'science',
      title: 'Science & Nature',
      description: 'Explore the wonders of science',
      color: 'bg-green-500',
      icon: '🔬'
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description: 'Movies, music, and pop culture',
      color: 'bg-purple-500',
      icon: '🎬'
    },
    {
      id: 'wellness',
      title: 'Health & Wellness',
      description: 'Learn about healthy living',
      color: 'bg-pink-500',
      icon: '💖'
    }
  ];

  const quizData: Record<string, Question[]> = {
    general: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        category: "Geography"
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        category: "Astronomy"
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        category: "Art"
      },

      {
     id: 4,
     question: "What color are bananas when they are ripe?",
     options: ["Red", "Yellow", "Green", "Blue"],
     correctAnswer: 1,
     category: "Fruits"
},
{
  id: 5,
  question: "Which planet is known as the blue Planet?",
  options: ["Venus", "neptune", "Jupiter", "Saturn"],
  correctAnswer: 1,
  category: "Astronomy"
},
{
  id: 6,
  question: "What do bees make?",
  options: ["Milk", "Honey", "Bread", "Juice"],
  correctAnswer: 1,
  category: "Nature"
},
{
  id: 7,
  question: "How many legs does a spider have?",
  options: ["6", "8", "10", "12"],
  correctAnswer: 1,
  category: "Animals"
},
{
  id: 8,
  question: "Which animal is known as the King of the Jungle?",
  options: ["Tiger", "Lion", "Elephant", "Giraffe"],
  correctAnswer: 1,
  category: "Animals"
},
{
  id: 9,
  question: "What shape is a stop sign?",
  options: ["Circle", "Square", "Octagon", "Triangle"],
  correctAnswer: 2,
  category: "General Knowledge"
},
{
  id: 10,
  question: "Which gas do humans breathe in to stay alive?",
  options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
  correctAnswer: 0,
  category: "Science"
},
{
  id: 11,
  question: "How many days are there in a week?",
  options: ["5", "6", "7", "8"],
  correctAnswer: 2,
  category: "General Knowledge"
},
{
  id: 12,
  question: "What is the color of the sky on a clear day?",
  options: ["Green", "Yellow", "Blue", "Purple"],
  correctAnswer: 2,
  category: "Nature"
},
{
  id: 13,
  question: "Which bird is known for saying 'Polly wants a cracker'?",
  options: ["Crow", "Parrot", "Eagle", "Sparrow"],
  correctAnswer: 1,
  category: "Animals"
}

    ],
    science: [
      {
        id: 1,
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        category: "Chemistry"
      },
      {
        id: 2,
        question: "How many hearts does an octopus have?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 2,
        category: "Biology"
      },
      {
        id: 3,
        question: "What force keeps us grounded on Earth?",
        options: ["Magnetism", "Gravity", "Friction", "Inertia"],
        correctAnswer: 1,
        category: "Physics"
      },
      {
  id: 4,
  question: "What is the center of an atom called?",
  options: ["Electron", "Proton", "Nucleus", "Neutron"],
  correctAnswer: 2,
  category: "Physics"
},
{
  id: 5,
  question: "Which gas do plants take in from the air?",
  options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
  correctAnswer: 1,
  category: "Biology"
},
{
  id: 6,
  question: "What planet do we live on?",
  options: ["Mars", "Venus", "Earth", "Jupiter"],
  correctAnswer: 2,
  category: "Astronomy"
},
{
  id: 7,
  question: "What part of the body helps you breathe?",
  options: ["Heart", "Lungs", "Brain", "Stomach"],
  correctAnswer: 1,
  category: "Biology"
},
{
  id: 8,
  question: "Which liquid do we need to survive?",
  options: ["Milk", "Juice", "Water", "Oil"],
  correctAnswer: 2,
  category: "General Science"
},
{
  id: 9,
  question: "What is the largest planet in our solar system?",
  options: ["Earth", "Saturn", "Jupiter", "Neptune"],
  correctAnswer: 2,
  category: "Astronomy"
},
{
  id: 10,
  question: "What is H2O commonly known as?",
  options: ["Water", "Oxygen", "Hydrogen", "Salt"],
  correctAnswer: 0,
  category: "Chemistry"
},
{
  id: 11,
  question: "Which part of the plant makes food?",
  options: ["Root", "Stem", "Leaf", "Flower"],
  correctAnswer: 2,
  category: "Biology"
},
{
  id: 12,
  question: "What do we call animals that eat only plants?",
  options: ["Carnivores", "Herbivores", "Omnivores", "Insectivores"],
  correctAnswer: 1,
  category: "Biology"
},
{
  id: 13,
  question: "Which gas do humans need to breathe?",
  options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
  correctAnswer: 1,
  category: "Biology"
}

    ],
    entertainment: [
      {
        id: 1,
        question: "Which movie won the Academy Award for Best Picture in 2020?",
        options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
        correctAnswer: 2,
        category: "Movies"
      },
      {
        id: 2,
        question: "Who wrote the song 'Bohemian Rhapsody'?",
        options: ["John Lennon", "Freddie Mercury", "David Bowie", "Elton John"],
        correctAnswer: 1,
        category: "Music"
      },
      {
        id: 3,
        question: "Which TV series is set in the fictional town of Hawkins?",
        options: ["Breaking Bad", "Stranger Things", "The Walking Dead", "Game of Thrones"],
        correctAnswer: 1,
        category: "TV Shows"
      },

      {
  id: 4,
  question: "In the movie 'Frozen', what is the name of Elsa’s sister?",
  options: ["Anna", "Olivia", "Sophie", "Bella"],
  correctAnswer: 0,
  category: "Movies"
},
{
  id: 5,
  question: "Which superhero can climb walls and shoot webs?",
  options: ["Batman", "Superman", "Spider-Man", "Iron Man"],
  correctAnswer: 2,
  category: "Superheroes"
},
{
  id: 6,
  question: "In 'Toy Story', what is the name of the cowboy doll?",
  options: ["Woody", "Buzz", "Jessie", "Andy"],
  correctAnswer: 0,
  category: "Movies"
},
{
  id: 7,
  question: "Which movie features a talking snowman named Olaf?",
  options: ["Shrek", "Frozen", "Moana", "Tangled"],
  correctAnswer: 1,
  category: "Movies"
},
{
  id: 8,
  question: "In 'Finding Nemo', what type of fish is Nemo?",
  options: ["Clownfish", "Goldfish", "Tuna", "Shark"],
  correctAnswer: 0,
  category: "Movies"
},
{
  id: 9,
  question: "In the 'Harry Potter' movies, what house does Harry belong to?",
  options: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"],
  correctAnswer: 1,
  category: "Movies"
},
{
  id: 10,
  question: "Which animated movie is about a young lion named Simba?",
  options: ["The Lion King", "Madagascar", "Zootopia", "Bambi"],
  correctAnswer: 0,
  category: "Movies"
},
{
  id: 11,
  question: "In 'Moana', who helps Moana restore the heart of Te Fiti?",
  options: ["Maui", "Olaf", "Stitch", "Buzz Lightyear"],
  correctAnswer: 0,
  category: "Movies"
},
{
  id: 12,
  question: "Which blue character lives in a pineapple under the sea?",
  options: ["Dory", "SpongeBob SquarePants", "Nemo", "Squirt"],
  correctAnswer: 1,
  category: "Cartoons"
},
{
  id: 13,
  question: "In 'The Incredibles', what is the baby’s name?",
  options: ["Dash", "Jack-Jack", "Bob", "Tony"],
  correctAnswer: 1,
  category: "Movies"
}

    ],
    wellness: [
      {
        id: 1,
        question: "How many hours of sleep do adults typically need per night?",
        options: ["5-6 hours", "7-9 hours", "10-12 hours", "4-5 hours"],
        correctAnswer: 1,
        category: "Sleep Health"
      },
      {
        id: 2,
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correctAnswer: 3,
        category: "Nutrition"
      },
      {
        id: 3,
        question: "What is a good way to manage stress?",
        options: ["Avoiding all challenges", "Deep breathing exercises", "Skipping meals", "Staying indoors"],
        correctAnswer: 1,
        category: "Mental Health"
      },
      {
  id: 4,
  question: "How many minutes should kids play or exercise each day?",
  options: ["10 minutes", "30 minutes", "60 minutes", "2 hours"],
  correctAnswer: 2,
  category: "Health"
},
{
  id: 5,
  question: "Which drink is the healthiest choice?",
  options: ["Water", "Soda", "Energy drink", "Milkshake"],
  correctAnswer: 0,
  category: "Health"
},
{
  id: 6,
  question: "Why is it important to wash your hands?",
  options: ["To smell nice", "To get rid of germs", "To play better", "To make bubbles"],
  correctAnswer: 1,
  category: "Wellness"
},
{
  id: 7,
  question: "Which food is a healthy snack?",
  options: ["Chips", "Chocolate", "Apple", "Candy"],
  correctAnswer: 2,
  category: "Nutrition"
},
{
  id: 8,
  question: "Why should kids get enough sleep?",
  options: ["To grow and stay healthy", "To watch more TV", "To play games", "To skip school"],
  correctAnswer: 0,
  category: "Health"
},
{
  id: 9,
  question: "What should you do before eating?",
  options: ["Wash your hands", "Run outside", "Brush your teeth", "Take a nap"],
  correctAnswer: 0,
  category: "Wellness"
},
{
  id: 10,
  question: "Which of these is a type of exercise?",
  options: ["Jumping rope", "Eating cake", "Sleeping", "Watching cartoons"],
  correctAnswer: 0,
  category: "Fitness"
},
{
  id: 11,
  question: "Why should we eat fruits and vegetables?",
  options: ["They are colorful", "They have vitamins", "They are fun to eat", "They taste like candy"],
  correctAnswer: 1,
  category: "Nutrition"
},
{
  id: 12,
  question: "Which habit helps keep your teeth healthy?",
  options: ["Brushing twice a day", "Eating lots of sweets", "Skipping brushing", "Drinking soda"],
  correctAnswer: 0,
  category: "Health"
},
{
  id: 13,
  question: "Why is drinking water important?",
  options: ["It keeps us hydrated", "It makes food taste better", "It’s fun", "It helps us sleep"],
  correctAnswer: 0,
  category: "Health"
}

    ]
  };

  const startQuiz = (category: string) => {
    setCurrentQuiz(category);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizData[currentQuiz!][currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData[currentQuiz!].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const totalQuestions = quizData[currentQuiz!].length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <div className="mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">{score}/{totalQuestions}</div>
              <div className="text-2xl text-gray-600">{percentage}% Score</div>
            </div>
            
            <div className="mb-6">
              {percentage >= 80 && (
                <p className="text-green-600 font-semibold">Excellent! You're a quiz master! 🎉</p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-blue-600 font-semibold">Great job! Well done! 👏</p>
              )}
              {percentage >= 40 && percentage < 60 && (
                <p className="text-yellow-600 font-semibold">Good effort! Keep learning! 📚</p>
              )}
              {percentage < 40 && (
                <p className="text-red-600 font-semibold">Keep practicing! You'll get better! 💪</p>
              )}
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => startQuiz(currentQuiz!)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={resetQuiz}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Choose New Quiz
              </button>
              <button
                onClick={onBack}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuiz) {
    const question = quizData[currentQuiz][currentQuestion];
    const progress = ((currentQuestion + 1) / quizData[currentQuiz].length) * 100;
    
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-3xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <button
              onClick={resetQuiz}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Quizzes
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizData[currentQuiz].length}</div>
              <div className="text-lg font-semibold text-purple-600">Score: {score}</div>
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
              <div className="flex items-center justify-between text-white mb-2">
                <h2 className="text-xl font-bold">{question.category}</h2>
                <span className="text-sm opacity-90">Question {currentQuestion + 1}</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === null
                        ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        : selectedAnswer === index
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-red-500 bg-red-50 text-red-800'
                          : index === question.correctAnswer && showResult
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-200 bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && selectedAnswer === index && (
                        index === question.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )
                      )}
                      {showResult && index === question.correctAnswer && selectedAnswer !== index && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 text-center">
                  <button
                    onClick={nextQuestion}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {currentQuestion < quizData[currentQuiz].length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-purple-600 flex items-center">
            <Brain className="w-8 h-8 mr-3" />
            Fun Quizzes
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => startQuiz(category.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-purple-600 font-semibold">
                  <Brain className="w-4 h-4 mr-2" />
                  {quizData[category.id].length} Questions
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Challenge Your Mind!</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Test your knowledge across various categories and learn something new! 
            Each quiz is designed to be fun, educational, and engaging. 
            Track your progress and see how much you know!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;