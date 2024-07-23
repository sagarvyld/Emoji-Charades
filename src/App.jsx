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
  const [selectedTopic, setSelectedTopic] = useState('Harry Potter');
  const [selectedTopicArea, setSelectedTopicArea] = useState('Movie');
  const [textareaValueMsg, setTextareaValueMsg] = useState('');

  var TopicAreas = ['Movie', 'Songs', 'TV Shows'];
  const prompts = prompt[selectedTopicArea] || [];


  const changeSelectTopicArea = () => {
    let newTopicArea;
    do {
      const randomIndex = Math.floor(Math.random() * TopicAreas.length);
      newTopicArea = TopicAreas[randomIndex];
    } while (newTopicArea === selectedTopicArea);
    setSelectedTopicArea(newTopicArea);
    setTextAreaValue('');
    setSelectedTopic(prompt[newTopicArea][2]);
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