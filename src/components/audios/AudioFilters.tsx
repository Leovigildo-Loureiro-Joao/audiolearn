import { motion } from "framer-motion";

interface AudioFilters {
  filter: string;
  setFilter: (filter: string) => void;
}

const FILTERS = ["Todos", "Dialogos", "Podcast", "Entrevistas", "Vocabularios"];

export const AudioFilters = ({ filter, setFilter }: AudioFilters) => {
  return (
    <div className="m-10 flex justify-center items-center lg:gap-10 md:gap-5 flex-wrap">
      {FILTERS.map((value) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            filter === value
              ? "bg-primary text-white shadow-md"
              : "text-dark hover:text-primary hover:border-primary border"
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
};