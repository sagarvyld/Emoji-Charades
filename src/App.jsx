import { useState, useRef } from "react";
import './assets/Fonts/fonts.css';
import "./App.css";
import Landing from "./Pages/Landing";
import Dumbcharades from "./Pages/dumbcharades";
import SendPage from "./Pages/SendPage";
import prompt from "./assets/Data";
import AiOptions from "./assets/AiOptions";

function App() {
  const [gameIndex, setIndex] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textareaValueMsg, setTextareaValueMsg] = useState('');
  const contentEditableRef = useRef(null);

  var TopicAreas = ['Movie', 'Songs', 'TV Shows'];
  const [randomAiString, setRandomString] = useState(0);
  const [selectedTopicArea, setSelectedTopicArea] = useState(TopicAreas[Math.floor(Math.random() * 3)]);
  const prompts = prompt[selectedTopicArea] || [];
  const [selectedTopic, setSelectedTopic] = useState(prompts[Math.floor(Math.random() * 40)]);


  const changeSelectTopicArea = () => {
    let newTopicArea;
    do {
      const randomIndex = Math.floor(Math.random() * TopicAreas.length);
      newTopicArea = TopicAreas[randomIndex];
    } while (newTopicArea === selectedTopicArea);
    const randIdx = Math.floor(Math.random() * 30);
    setSelectedTopicArea(newTopicArea);
    setTextAreaValue('');
    setSelectedTopic(prompt[newTopicArea][randIdx]);
  };


  function handleAskAI() {
    setTextAreaValue('');
    const contentEditableElement = contentEditableRef.current;
    if (contentEditableElement) {
      contentEditableElement.setAttribute('data-placeholder', 'Generating...');
      (randomAiString === 0) ? setRandomString(1) : setRandomString(0);
      console.log(randomAiString);
      let aiString = AiOptions[selectedTopicArea][selectedTopic][randomAiString];
      console.log(aiString);
      setTimeout(() => {
        contentEditableElement.setAttribute('data-placeholder', 'Enter emojis');
        setTextAreaValue(aiString);
      }, 1000);
    }

  }

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
        handleAskAI={handleAskAI}
        TopicAreas={TopicAreas}
        prompts={prompts}
        contentEditableRef={contentEditableRef} />;
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