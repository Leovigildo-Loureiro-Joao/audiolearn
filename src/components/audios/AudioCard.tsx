import { AudioProps, AudioType } from "../../types/Audio";
import imgBg from "../../assets/Rectangle.png";

import { motion, Variants } from "framer-motion";
import { RxDownload, RxPlay, RxShare2 } from "react-icons/rx";

const item: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const AudioCard = ({ audio, onSelect }: AudioProps) => {
  const handlePlay = () => {
    onSelect(audio);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Lógica para download
    console.log("Download:", audio.titulo);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Lógica para compartilhar
    console.log("Share:", audio.titulo);
  };

  return (
    <motion.div
      variants={item}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        transition: { type: "spring", stiffness: 200 },
      }}
      className="bg-white rounded-md max-w-[300px] w-full flex-col flex shadow-lg text-center p-6 cursor-pointer"
      onClick={handlePlay}
    >
      <h1 className="text-sm text-primary font-medium mb-2">{audio.bilingual}</h1>
      
      <div className="flex justify-center items-center relative mb-4">
        <button 
          onClick={handlePlay}
          className="absolute z-10 bg-primary bg-opacity-80 text-white rounded-full p-3 hover:bg-opacity-100 transition-all hover:scale-110"
        >
          <RxPlay size={20} />
        </button>
        <img 
          src={imgBg} 
          alt={audio.titulo}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      
      <h2 className="font-semibold text-gray-800 mb-4 line-clamp-2">{audio.titulo}</h2>
      
      <div className="flex justify-between mt-auto px-2">
        <button
          onClick={handleDownload}
          className="text-gray-600 hover:text-primary transition-all hover:scale-105 p-2"
        >
          <RxDownload size={20} />
        </button>
        <button
          onClick={handleShare}
          className="text-gray-600 hover:text-primary transition-all hover:scale-105 p-2"
        >
          <RxShare2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};