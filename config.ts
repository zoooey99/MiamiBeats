import Constants from 'expo-constants';

const config = Constants.expoConfig?.extra || {};

export default {
  googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  geminiApiUrl: process.env.EXPO_PUBLIC_GEMINI_API_URL,
  //audioCraftApiUrl: process.env.EXPO_PUBLIC_AUDIOCRAFT_API_URL,
  openaiApiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
};
