import axios from 'axios';
import config from '../config';

const OPENAI_API_KEY = config.openaiApiKey;
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

interface LocationInfo {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  type: string;
}

export async function useOpenAi(locations: LocationInfo[]) {
  const locationList = locations
    .map((loc) => `${loc.name} (${loc.type})`)
    .join(' and ');

  const prompt = `You are an expert in cultural analysis and AI music composition. Given a list of 20 nearby locations in Miami, your task is to:

  Identify the Top Three Most Culturally Significant Cultures
  
  Evaluate the cultural significance of each place based on history, art, music, food, and social influence.
  Determine which three cultures are most represented among the locations.
  Prioritize cultures unique to Miami or essential to its identity.
  
  Assign Percentage Representation
  
  Estimate each culture's influence within the provided locations.
  Percentages should reflect cultural prominence rather than just count.
  Ensure percentages add up to 100%.
  
  Generate a Dynamic AI Music Generation Prompt
  
  Using the top three cultures and their percentage representation, construct a concise and descriptive prompt for an AI music generation API.
  The music description should include key instruments, rhythms, and stylistic elements associated with each culture.
  The output must be formatted in JSON for direct API use.
  
  Here are the 20 locations: (${locationList})
  `;

  try {
    console.log(OPENAI_API_KEY);
    const response = await axios.post(
      OPENAI_ENDPOINT,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert in cultural analysis and AI music composition.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating music description:', error);
    return null;
  }
}
