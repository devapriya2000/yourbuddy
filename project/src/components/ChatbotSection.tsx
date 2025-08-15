import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Bot, User, Heart, Smile } from 'lucide-react';
import { getGeminiResponse } from './chatbot'; // adjust if in a different folder

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotSectionProps {
  onBack: () => void;
}

const ChatbotSection: React.FC<ChatbotSectionProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! I'm your personal buddy. I'm here to chat, listen, and help you feel better. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botText = await getGeminiResponse(inputText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Sorry, I couldn't process that.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickReplies = [
    "I'm feeling good!",
    "I need someone to talk to",
    "I'm stressed",
    "Tell me a joke",
    "I'm feeling lonely",
    "How can I feel better?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-blue-600 flex items-center">
            <Bot className="w-8 h-8 mr-3" />
            Chat Buddy
          </h1>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="flex items-center text-white">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Buddy</h3>
                <p className="text-sm opacity-90">Always here to listen</p>
              </div>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-500 ml-2' : 'bg-purple-500 mr-2'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm italic">
                  Buddy is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-gray-50">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputText(reply);
                    setTimeout(() => handleSendMessage(), 0);
                  }}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                disabled={inputText.trim() === ''}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Emotional Support</h4>
            <p className="text-sm text-gray-600">I'm here to listen and provide comfort</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Smile className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Mood Booster</h4>
            <p className="text-sm text-gray-600">Let me help brighten your day</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Bot className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">24/7 Available</h4>
            <p className="text-sm text-gray-600">Always here when you need to talk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSection;
