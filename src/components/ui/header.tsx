import React, { useState } from "react";
import topWave from '../../assets/bottom.svg';
import { Typewriter } from "react-simple-typewriter";

export interface Svg{
    scale:boolean
}

export const HeaderWave=(svg:Svg)=> {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Wave SVG totalmente responsiva */}
<svg 
  className="w-full h-[180px] md:h-[240px] lg:h-[270px]" 
  viewBox="0 0 918.002 304.598" 
  preserveAspectRatio="none"
  style={svg.scale?{ transform: 'scaleY(-1)' }:{}}
>
  <path
    fill="#ffffff"
    d="M0 253.831C0 253.831 21.8663 228.448 21.8663 228.448C43.7325 203.065 87.3375 152.299 131.325 135.324C174.866 118.983 218.663 134.848 262.013 160.707C306 185.614 349.988 220.516 393.338 203.065C437.134 185.614 480.675 118.983 524.663 101.533C568.268 84.0816 612 118.983 655.988 160.707C699.401 203.065 743.325 253.831 786.675 279.214C830.599 304.598 874.013 304.598 896.325 304.598C896.325 304.598 918 304.598 918 304.598L918 0C918 0 896.134 0 896.134 0C874.268 0 830.663 0 786.675 0C743.134 0 699.338 0 655.988 0C612 0 568.013 0 524.663 0C480.866 0 437.325 0 393.338 0C349.733 0 306 0 262.013 0C218.599 0 174.675 0 131.325 0C87.4012 0 43.9875 0 21.675 0C21.675 0 0 0 0 0L0 253.831Z" 
  />
</svg>
    </div>
  );
}

export const Header = () => {
  const [links, setLinks] = useState([
    { href: "#home", data: "Inicio", check: "select" },
    { href: "#projecto", data: "Audios Examplares", check: "" },
    { href: "#quemSou", data: "Sobre a aplicacao", check: "" },
    { href: "#habilidades", data: "Contactos", check: "" },
  ]);

  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function Select(key: number) {
    setLinks(links =>
      links.map((element, idx) => ({
        ...element,
        check: idx === key ? "select" : "",
      }))
    );
    // Fecha menu mobile após clique
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className="bg-top-image relative w-[100vw] h-[90vh] max-h-[600px] bg-center bg-no-repeat bg-cover">
        {/* Backdrop Blur */}
        <div className="fixed z-30"> 
          <div className="absolute inset-0 backdrop-blur-md bg-black/30 w-[100vw] z-10"></div>

        <nav className="relative px-20  z-30 max-w-7xl mx-auto">
          {/* Menu Mobile Button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 ml-auto z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            <div className={`w-6 h-0.5 bg-primary transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-primary transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-primary transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>

          {/* Menu Desktop & Mobile */}
          <ul className={`
           
            flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-10 
            absolute md:static top-full left-0 w-full md:w-auto
            bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none
            p-6 md:p-0 shadow-lg md:shadow-none
            transition-all duration-300
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 md:opacity-100 translate-y-4 md:translate-y-0 pointer-events-none md:pointer-events-auto'}
          `}>
            {links.map((item, key) => (
              <li 
                onClick={() => Select(key)} 
                className="h-min cursor-pointer group flex p-2 pt-4 flex-col items-center" 
                key={key}
              >
                <a 
                  href={item.href} 
                  className={`
                    hover:text-secondry transition-all text-lg md:text-base text-white
                    ${item.check === "select" ? "text-white font-semibold" : "text-white md:text-white font-medium"}
                    px-4 py-2 md:px-0 md:py-0 rounded-lg md:rounded-none
                    hover:bg-gray-100 md:hover:bg-transparent
                  `}
                >
                  {item.data}
                </a>
                <span
                  className={`
                    h-[3px] md:h-[5px] rounded-boder_radius bg-primary transition-all
                    group-hover:w-full group-hover:bg-secondry mt-1
                    ${item.check === "select" ? "opacity-100 w-full bg-primary" : "w-0"}
                  `}
                />
              </li>
            ))}
          </ul>
        </nav>
        </div>
        <div className="text-center gap-5 -top-20 absolute inset-0 flex flex-col justify-center items-center h- ">
            <h1 className=" text-6xl font-bold text-white">Audio Learn</h1>
            <span className="text-white text-4xl font-semibold">
              <Typewriter
                words={[
                  "Aprenda inglês ouvindo a vida real.",
                  "Transforme podcasts em material de estudo.",
                  "Gere vocabulários com seus próprios áudios.",
                  "Melhore compreensão e pronúncia em menos tempo.",
                  "Tenha o inglês que se adapta à sua rotina.",
                  "Transforme o cotidiano em aprendizado."
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />

            </span>
        </div>
       <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <HeaderWave scale={true} />
</div>

      </div>
    </>
  );
}
 