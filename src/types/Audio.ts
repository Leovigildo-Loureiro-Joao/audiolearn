// types/Audio.ts
export interface AudioType {
  id: number;
  bilingual: string;
  texto: string;
  titulo: string;
  traducao: string;
  type: string;
  audio: string;
  voice?: string; // Opcional: voz usada na geração
  speed?: number; // Opcional: velocidade do áudio
  pitch?: number; // Opcional: tom do áudio
}

export interface AudioProps {
  audio: AudioType;
  onSelect: (audio: AudioType) => void;
}