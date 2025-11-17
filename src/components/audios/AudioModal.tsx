import { motion } from "framer-motion";
import { AudioType } from "../../types/Audio";
import { RxDownload, RxShare2, RxCross2, RxPlay, RxPause } from "react-icons/rx";
import { useState, useRef, useEffect } from "react";

interface AudioModalProps {
  audio: AudioType | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerateAudio: (text: string, voice?: string) => Promise<string>;
}

export const AudioModal = ({ audio, isOpen, onClose, onGenerateAudio }: AudioModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio && isOpen) {
      loadAudio();
    }
  }, [audio, isOpen]);

  const loadAudio = async () => {
    if (!audio) return;

    setIsGenerating(true);
    try {
      // Gerar áudio usando TTS
      const url = await onGenerateAudio(audio.texto, "pt-BR");
      setAudioUrl(url);
    } catch (error) {
      console.error("Erro ao gerar áudio:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${audio?.titulo || 'audio'}.mp3`;
    link.click();
  };

  if (!isOpen || !audio) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">{audio.titulo}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Informações do áudio */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-primary font-medium">{audio.bilingual}</span>
              <span className="text-sm text-gray-500">{audio.type}</span>
            </div>

            {/* Player de Áudio */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              {isGenerating ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-600 mt-2">Gerando áudio...</p>
                </div>
              ) : audioUrl ? (
                <>
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                    onEnded={() => setIsPlaying(false)}
                  />
                  
                  {/* Controles */}
                  <div className="flex items-center justify-center mb-4">
                    <button
                      onClick={togglePlay}
                      className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark transition-colors"
                    >
                      {isPlaying ? <RxPause size={24} /> : <RxPlay size={24} />}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  Áudio não disponível
                </div>
              )}
            </div>

            {/* Texto e Tradução */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Texto Original</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed">{audio.texto}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Tradução</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <p className="text-gray-700 text-sm leading-relaxed">{audio.traducao}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={downloadAudio}
            disabled={!audioUrl}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RxDownload size={18} />
            Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <RxShare2 size={18} />
            Compartilhar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};