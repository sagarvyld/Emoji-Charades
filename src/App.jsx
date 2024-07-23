import { useState } from "react";
import './assets/Fonts/fonts.css';
import "./App.css";
import Landing from "./Pages/Landing";
import Dumbcharades from "./Pages/dumbcharades";
import SendPage from "./Pages/SendPage";
import prompt from "./assets/Data";

function App() {
  const [gameIndex, setIndex] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textareaValueMsg, setTextareaValueMsg] = useState('');

  var TopicAreas = ['Movie', 'Songs', 'TV Shows'];
  const [selectedTopicArea, setSelectedTopicArea] = useState(TopicAreas[Math.floor(Math.random()*3)]);
  const prompts = prompt[selectedTopicArea] || [];
  const [selectedTopic, setSelectedTopic] = useState(prompts[Math.floor(Math.random()*40)]);


  const changeSelectTopicArea = () => {
    let newTopicArea;
    do {
      const randomIndex = Math.floor(Math.random() * TopicAreas.length);
      newTopicArea = TopicAreas[randomIndex];
    } while (newTopicArea === selectedTopicArea);
    const randIdx = Math.floor(Math.random()*30);
    setSelectedTopicArea(newTopicArea);
    setTextAreaValue('');
    setSelectedTopic(prompt[newTopicArea][randIdx]);
  };

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
        setSelectedTopicArea={setSelectedTopicArea}
        changeSelectTopicArea={changeSelectTopicArea}
        TopicAreas={TopicAreas}
        prompts={prompts} />;
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