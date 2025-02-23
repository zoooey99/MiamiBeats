import axios from 'axios';
import config from '../config';

interface LocationInfo {
  location: {
    lat: number;
    lng: number;
  };
  name: string;
  type: string;
}

export const generateMusicPrompt = async (
  locations: LocationInfo[]
  //culturalData: string
) => {
  const locationList = locations
    .map((loc) => `${loc.name} (${loc.type})`)
    .join(' and ');

  const prompt = `You are an expert in cultural analysis and AI music composition. Given a list of 20 nearby locations in Miami, your task is to:

Identify the Top Three Most Culturally Significant Cultures

Evaluate the cultural significance of each place based on history, art, music, food, and social influence.
Determine which three cultures are most represented among the locations.
Prioritize cultures unique to Miami or essential to its identity.
Assign Percentage Representation

Estimate each cultures influence within the provided locations.
Percentages should reflect cultural prominence rather than just count.
Ensure percentages add up to 100%.
Generate a Dynamic AI Music Generation Prompt

Using the top three cultures and their percentage representation, construct a concise and descriptive prompt for an AI music generation API.
The music description should include key instruments, rhythms, and stylistic elements associated with each culture.
The output must be formatted in JSON for direct API use.

Here are the 20 locations: (${locations.map((loc) => loc.type).join(', ')})
`;

  try {
    const response = await axios.post(config.geminiApiUrl, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });
    console.log(response);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating music prompt:', error);
    return null;
  }
};
