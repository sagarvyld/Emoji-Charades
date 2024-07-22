import { useState } from "react";
import './assets/Fonts/fonts.css';
import "./App.css";
import Landing from "./Pages/Landing";
import Dumbcharades from "./Pages/dumbcharades";
import SendPage from "./Pages/SendPage";
function App() {
  const [gameIndex, setIndex] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Reservoir Dogs');
  const [selectedTopicArea, setSelectedTopicArea] = useState('Movie');
  const [textareaValueMsg, setTextareaValueMsg] = useState('');

  let content;
  switch (gameIndex) {
    case 0:
      content = <Dumbcharades 
      onClose={() => { setIndex(null); }} 
      onforw={() => { setIndex(1) }} 
      textAreaValue={textAreaValue} 
      setTextAreaValue={setTextAreaValue} 
      selectedTopic={selectedTopic} 
      setSelectedTopic={setSelectedTopic} 
      selectedTopicArea={selectedTopicArea} 
      setSelectedTopicArea={setSelectedTopicArea} />;
      break;
    case 1:
      content = <SendPage selectedTopicArea={selectedTopicArea}  
                          textAreaValue={textAreaValue} 
                          textareaValueMsg={textareaValueMsg}
                          setTextareaValueMsg={setTextareaValueMsg}
                          onBack={() => { setIndex(0); }} />;
      break;
    default:
      content = <Landing onNext={() => { setIndex(0); }} />;
  }
  return (
    <div>
      {content}
    </div>
  );
}

export default App;