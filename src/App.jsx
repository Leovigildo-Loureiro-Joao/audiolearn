import { useState } from 'react';
import { useTTS } from './hooks/useTTS';
import { Play, Save, StopCircle, Volume2 } from 'lucide-react';
import './index.css';
import { Header } from './components/ui/header.tsx';
import { AudioSection } from './components/audios';
import { About } from './components/ui/about.tsx';
import { Footer } from './components/ui/footer.jsx';

function App() {
  const [portuguese, setPortuguese] = useState('');
  const [english, setEnglish] = useState('');
  const [savedItems, setSavedItems] = useState([]);
  const [speechRate, setSpeechRate] = useState(1.0);
  
  const { speak, stop, isSpeaking } = useTTS();

  const handleSave = () => {
    if (!portuguese.trim() || !english.trim()) return;
    
    const newItem = {
      id: Date.now(),
      portuguese,
      english,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    setSavedItems(prev => [newItem, ...prev]);
    setPortuguese('');
    setEnglish('');
  };

  const handlePlay = async (text, lang = 'en-US') => {
    await speak(text, speechRate, lang);
  };

  return (
    <div className="">
        {/* Header */}
       <Header/>
       {/* AudioSection*/}
       <AudioSection/>
       {/* About */}
       <About/>
        {/* Footer */}
        <Footer/>
      </div>
  );
}

export default App;