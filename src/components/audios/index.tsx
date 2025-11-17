import { useState } from "react";
import { AudioType } from "../../types/Audio";
import { AudioCard } from "./AudioCard";
import { AudioFilters } from "./AudioFilters";
import { AudioModal } from "./AudioModal";
import { AudioCarousel } from "./AudioCarrosel";
import { CreateAudioModal, AudioFormData } from "./CreateAudioModal";

export const AudioSection = () => {
  const [filter, setFilter] = useState("Todos");
  const [selectedAudio, setSelectedAudio] = useState<AudioType | null>(null);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

   const sampleAudios: AudioType[] = [
    {
      id: 1,
      bilingual: "Inglês-Português",
      texto: "Hello, how are you today? I hope you're having a wonderful day!",
      titulo: "Cumprimentos Básicos",
      traducao: "Olá, como você está hoje? Espero que você esteja tendo um dia maravilhoso!",
      type: "Diálogos",
      audio: ""
    },
    {
      id: 2,
      bilingual: "Inglês-Português",
      texto: "Could you please tell me where the nearest bank is located?",
      titulo: "Pedindo Informações",
      traducao: "Você poderia me dizer onde fica o banco mais próximo?",
      type: "Diálogos",
      audio: ""
    },
    {
      id: 3,
      bilingual: "Inglês-Português",
      texto: "I would like to order a coffee and a sandwich, please.",
      titulo: "Fazendo Pedidos",
      traducao: "Eu gostaria de pedir um café e um sanduíche, por favor.",
      type: "Diálogos",
      audio: ""
    },
    {
      id: 4,
      bilingual: "Inglês-Português",
      texto: "What are your thoughts on artificial intelligence?",
      titulo: "Discussão sobre IA",
      traducao: "Quais são seus pensamentos sobre inteligência artificial?",
      type: "Debates",
      audio: ""
    },
    {
      id: 5,
      bilingual: "Inglês-Português",
      texto: "Let's schedule a meeting for next Monday at 10 AM.",
      titulo: "Agendando Reuniões",
      traducao: "Vamos marcar uma reunião para próxima segunda-feira às 10h.",
      type: "Apresentações",
      audio: ""
    },
    {
      id: 6,
      bilingual: "Inglês-Português",
      texto: "The weather is beautiful today, perfect for a walk in the park.",
      titulo: "Conversa Casual",
      traducao: "O tempo está lindo hoje, perfeito para um passeio no parque.",
      type: "Podcast",
      audio: ""
    }
  ];
  
 const filteredAudios = filter === "Todos" 
    ? sampleAudios 
    : sampleAudios.filter(audio => audio.type === filter);


  const handleSelectAudio = (audio: AudioType) => {
    setSelectedAudio(audio);
    setIsAudioModalOpen(true);
  };

  const handleCloseAudioModal = () => {
    setIsAudioModalOpen(false);
    setSelectedAudio(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateAudio = async (audioData: AudioFormData) => {
    try {
      // Lógica para criar o áudio
      console.log("Criando áudio:", audioData);
      
      // Simulação de criação bem-sucedida
      const newAudio: AudioType = {
        id: Date.now(), // ID temporário
        bilingual: audioData.bilingual,
        texto: audioData.texto,
        titulo: audioData.titulo,
        traducao: audioData.traducao,
        type: audioData.type,
        audio: "" // Será preenchido após geração
      };

      // Aqui você integraria com sua API TTS
      // const audioUrl = await generateTTS(audioData.texto, audioData.voice, audioData.speed, audioData.pitch);
      
      alert("Áudio criado com sucesso!");
      // Adicionar o novo áudio à lista
      // setAudios(prev => [...prev, { ...newAudio, audio: audioUrl }]);
      
    } catch (error) {
      console.error("Erro ao criar áudio:", error);
      alert("Erro ao criar áudio. Tente novamente.");
    }
  };

  const generateAudio = async (text: string, voice?: string): Promise<string> => {
    // Sua lógica TTS existente
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://example.com/audio/generated-audio.mp3");
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10 relative z-20 py-10">
      <h2 className="text-secondary font-bold text-2xl">Audios Exemplares</h2>
      
      <AudioFilters filter={filter} setFilter={setFilter} />
      
      <div className="w-full flex justify-center">
        <AudioCarousel audios={filteredAudios} onSelect={handleSelectAudio} />
      </div>
      
      <button 
        type="button" 
        className="rounded-md w-[400px] h-10 text-white bg-primary hover:bg-primary-dark transition-colors"
        onClick={handleOpenCreateModal}
      >
        Criar áudio
      </button>

      {/* Modal de Visualização */}
      <AudioModal
        audio={selectedAudio}
        isOpen={isAudioModalOpen}
        onClose={handleCloseAudioModal}
        onGenerateAudio={generateAudio}
      />

      {/* Modal de Criação */}
      <CreateAudioModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateAudio={handleCreateAudio}
      />
    </div>
  );
};