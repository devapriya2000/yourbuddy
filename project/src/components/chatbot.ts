import axios from 'axios';

const API_KEY = 'AIzaSyD4-QT3bPY30SexzmGf9ovIcFb-UISmw6MI'; // Replace with your Gemini API key
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await axios.post(
      '${GEMINI_URL}?key=${API_KEY}',
      {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
     ],
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Gemini API error:', error);
    return "Oops! Something went wrong while fetching my response.";
  }
};
