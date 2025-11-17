// services/ttsService.ts
const TTS_API_URL = process.env.REACT_APP_TTS_API_URL || 'https://api.example.com/tts';

export interface TTSRequest {
  text: string;
  voice?: string;
  speed?: number;
  pitch?: number;
  language?: string;
}

export class TTSService {
  static async generateAudio(request: TTSRequest): Promise<{ audioUrl: string; duration: number }> {
    try {
      const response = await fetch(`${TTS_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar áudio');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('TTS Service Error:', error);
      throw error;
    }
  }

  static async getAvailableVoices(): Promise<Array<{ id: string; name: string; language: string }>> {
    try {
      const response = await fetch(`${TTS_API_URL}/voices`);
      if (!response.ok) {
        throw new Error('Falha ao carregar vozes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching voices:', error);
      return [];
    }
  }
}