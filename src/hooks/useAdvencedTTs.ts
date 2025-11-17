// hooks/useAdvancedTTS.ts
import { useState, useCallback, useRef } from 'react';
import { TTSService, TTSRequest } from '../services/ttsService';

interface UseTTSReturn {
  // Controles básicos
  generateAudio: (text: string, options?: Partial<TTSRequest>) => Promise<string>;
  isGenerating: boolean;
  
  // Player
  play: (audioUrl: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  
  // Gerenciamento
  audioUrl: string | null;
  error: string | null;
  clearError: () => void;
}

export const useAdvancedTTS = (): UseTTSReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAudio = useCallback(async (text: string, options: Partial<TTSRequest> = {}): Promise<string> => {
    setIsGenerating(true);
    setError(null);

    try {
      const request: TTSRequest = {
        text,
        voice: options.voice || 'pt-BR-Female',
        speed: options.speed || 1.0,
        pitch: options.pitch || 1.0,
        language: options.language || 'pt-BR'
      };

      const result = await TTSService.generateAudio(request);
      setAudioUrl(result.audioUrl);
      return result.audioUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao gerar áudio';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const play = useCallback((url: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }

    audioRef.current.src = url;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(err => setError('Erro ao reproduzir áudio: ' + err.message));
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const resume = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => setError('Erro ao retomar áudio: ' + err.message));
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    generateAudio,
    isGenerating,
    play,
    pause,
    resume,
    stop,
    isPlaying,
    currentTime,
    duration,
    audioUrl,
    error,
    clearError
  };
};