import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioType } from "../../types/Audio";
import { AudioCard } from "./AudioCard";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

interface AudioCarouselProps {
  audios: AudioType[];
  onSelect: (audio: AudioType) => void;
}

export const AudioCarousel = ({ audios, onSelect }: AudioCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerPage = 3;
  const maxIndex = Math.ceil(audios.length / itemsPerPage) - 1;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return maxIndex;
      if (nextIndex > maxIndex) return 0;
      return nextIndex;
    });
  };

  const currentAudios = audios.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden pb-20 py-5 px-10">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
          >
            {currentAudios.map((audio, index) => (
              <AudioCard
                key={`${audio.id}-${index}`}
                audio={audio}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
      >
        <RxChevronLeft size={24} className="text-gray-600" />
      </button>
      
      <button
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-10"
      >
        <RxChevronRight size={24} className="text-gray-600" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};