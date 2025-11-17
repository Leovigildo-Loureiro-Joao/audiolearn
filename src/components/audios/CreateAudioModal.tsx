import { motion } from "framer-motion";
import { useState } from "react";
import { RxCross2, RxUpload, RxPlay, RxStop } from "react-icons/rx";

interface CreateAudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAudio: (audioData: AudioFormData) => void;
}

export interface AudioFormData {
  titulo: string;
  bilingual: string;
  type: string;
  texto: string;
  traducao: string;
  voice: string;
  speed: number;
  pitch: number;
}

const LANGUAGE_PAIRS = [
  "Inglês-Português",
  "Português-Inglês", 
  "Espanhol-Português",
  "Francês-Português",
  "Alemão-Português"
];

const AUDIO_TYPES = [
  "Diálogos",
  "Entrevistas/Podcast",
  "Apresentações",
  "Vocabulários",
  "Debates",
  "Notícias",
  "Literatura"
];

const VOICE_OPTIONS = [
  { value: "pt-BR-Female", label: "Português BR - Feminina" },
  { value: "pt-BR-Male", label: "Português BR - Masculina" },
  { value: "en-US-Female", label: "Inglês EUA - Feminina" },
  { value: "en-US-Male", label: "Inglês EUA - Masculina" },
  { value: "es-ES-Female", label: "Espanhol - Feminina" },
];

export const CreateAudioModal = ({ isOpen, onClose, onCreateAudio }: CreateAudioModalProps) => {
  const [formData, setFormData] = useState<AudioFormData>({
    titulo: "",
    bilingual: "Inglês-Português",
    type: "Diálogos",
    texto: "",
    traducao: "",
    voice: "pt-BR-Female",
    speed: 1.0,
    pitch: 1.0
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (name: keyof AudioFormData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneratePreview = async () => {
    if (!formData.texto.trim()) {
      alert("Por favor, insira o texto para gerar o áudio");
      return;
    }

    setIsGenerating(true);
    try {
      // Simulação de geração de áudio preview
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simulatedAudioUrl = "https://example.com/audio/preview.mp3";
      setPreviewAudio(simulatedAudioUrl);
    } catch (error) {
      console.error("Erro ao gerar preview:", error);
      alert("Erro ao gerar preview do áudio");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPreview = () => {
    if (previewAudio) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.texto.trim()) {
      alert("Por favor, preencha pelo menos o título e o texto");
      return;
    }

    onCreateAudio(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      titulo: "",
      bilingual: "Inglês-Português",
      type: "Diálogos",
      texto: "",
      traducao: "",
      voice: "pt-BR-Female",
      speed: 1.0,
      pitch: 1.0
    });
    setPreviewAudio(null);
    setIsPlaying(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Criar Novo Áudio</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Áudio *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ex: Diálogo em restaurante"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Par de Idiomas *
              </label>
              <select
                name="bilingual"
                value={formData.bilingual}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {LANGUAGE_PAIRS.map(pair => (
                  <option key={pair} value={pair}>{pair}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {AUDIO_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voz TTS *
              </label>
              <select
                name="voice"
                value={formData.voice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {VOICE_OPTIONS.map(voice => (
                  <option key={voice.value} value={voice.value}>
                    {voice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Configurações de Voz */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Configurações de Voz</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Velocidade: {formData.speed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={formData.speed}
                  onChange={(e) => handleNumberChange("speed", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mais lento</span>
                  <span>Mais rápido</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom: {formData.pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={formData.pitch}
                  onChange={(e) => handleNumberChange("pitch", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mais grave</span>
                  <span>Mais agudo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Texto e Tradução */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto Original *
              </label>
              <textarea
                name="texto"
                value={formData.texto}
                onChange={handleInputChange}
                placeholder="Digite o texto que será convertido em áudio..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {formData.texto.length} caracteres
                </span>
                <button
                  type="button"
                  onClick={handleGeneratePreview}
                  disabled={!formData.texto.trim() || isGenerating}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Gerando...
                    </>
                  ) : (
                    <>
                      <RxPlay size={16} />
                      Preview
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tradução
              </label>
              <textarea
                name="traducao"
                value={formData.traducao}
                onChange={handleInputChange}
                placeholder="Digite a tradução do texto (opcional)..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {formData.traducao.length} caracteres
                </span>
                {previewAudio && (
                  <button
                    type="button"
                    onClick={handlePlayPreview}
                    disabled={isPlaying}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <RxStop size={16} />
                        Parar
                      </>
                    ) : (
                      <>
                        <RxPlay size={16} />
                        Ouvir
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Dicas para um bom áudio:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use frases completas e pontuação adequada</li>
              <li>• Evite textos muito longos (máximo recomendado: 500 caracteres)</li>
              <li>• Verifique a pronúncia de palavras estrangeiras</li>
              <li>• Use o preview para testar antes de criar</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
              <RxUpload size={18} />
              Criar Áudio
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};