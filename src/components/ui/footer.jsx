 import topWave from '../../assets/top.svg';
 import fundo from '../../assets/footer.jpg';
import { FaBraille } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { HeaderWave } from './header';
 
 export const Footer=()=>{
    return <footer className='h-[80vh] relative bg-top-image bg-cover bg-center '>
         <div className="absolute top-0 left-0 w-full overflow-hidden">
           <HeaderWave scale={false} />
       </div>
      {/* Content */}
      <div className="absolute w-[100vw] bottom-12 z-10 max-w-6xl flex gap-10 px-6 text-white">
        {/* Audio Learn */}
        <div className='w-2/3'>
          <h2 className="text-xl font-bold mb-3">Audio Learn</h2>
          <p className="text-sm max-w-xs mb-4 opacity-80">
            Aprenda rápido com material criado diretamente para os seus próprios
            estudos. Ferramentas para rendimento do dia a dia em oportunidades de
            aprendizado.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaGithub className="fa-brands fa-github text-white text-xl" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaLinkedin className="fa-linkedin text-white text-xl" />
            </button>
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FaTwitter className="fa-brands fa-twitter text-white text-xl" />
            </button>
          </div>
        </div>

        <div className='flex gap-10 w-3/12'>
{/* Links Úteis */}
        <div>
          <h2 className="text-xl font-bold mb-3">Links Úteis</h2>
          <ul className="space-y-2 opacity-90">
            <li>Início</li>
            <li>Audio e Exemplares</li>
            <li>Sobre o Audio Learn</li>
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <h2 className="text-xl font-bold mb-3">Categorias</h2>
          <ul className="space-y-2 opacity-90">
            <li>Aprender</li>
            <li>Design</li>
            <li>Produtividade</li>
            <li>Finanças</li>
            <li>Arte</li>
          </ul>
        </div>
        </div>
      </div>
    </footer>
 }