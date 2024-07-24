import './assets/Fonts/fonts.css';
import "./App.css";
import Landing from "./Pages/Landing";
import Dumbcharades from "./Pages/dumbcharades";
import SendPage from "./Pages/SendPage";
import { useState } from 'react';
import { ECProvider } from './Context/context';


function App() {
  const [gameIndex, setIndex] = useState(null);

  let content;
  switch (gameIndex) {
    case 0:
      content = <Dumbcharades
        onClose={() => { setIndex(null); }}
        onforw={() => { setIndex(1) }} />;
      break;
    case 1:
      content = <SendPage
        onBack={() => { setIndex(0); }} />;
      break;
    default:
      content = <Landing onNext={() => { setIndex(0); }} />;
  }
  return (
    <ECProvider>
      {content}
    </ECProvider>
  );
}

export default App;