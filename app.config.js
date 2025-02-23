import 'dotenv-safe/config';

export default {
  expo: {
    name: "CultureBeats",
    slug: "culturebeats",
    version: "1.0.0",
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      geminiApiUrl: process.env.GEMINI_API_URL,
      openaikey: process.env.openaiApikey,
      //audioCraftApiUrl: process.env.AUDIOCRAFT_API_URL,
    },
  },
};
