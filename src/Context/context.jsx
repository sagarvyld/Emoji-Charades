import React, { createContext, useState, useRef} from "react";
import prompt from "../assets/Data";
import AiOptions from "../assets/AiOptions";

const ECContext = createContext();

const ECProvider = ({ children }) => {

    const [textAreaValue, setTextAreaValue] = useState('');
    const [textareaValueMsg, setTextareaValueMsg] = useState('');
    const contentEditableRef = useRef(null);
  
    var TopicAreas = Object.keys(prompt);
    const [randomAiString, setRandomString] = useState(0);
    const [selectedTopicArea, setSelectedTopicArea] = useState(TopicAreas[Math.floor(Math.random() * 3)]);
    const prompts = prompt[selectedTopicArea] || [];
    const [selectedTopic, setSelectedTopic] = useState(prompts[Math.floor(Math.random() * 40)]);


    const [emojis] = useState([
      '😀', '😁', '😂', '🤣', '😄', '😅',
      '😆', '😉', '😊', '😋', '😎', '😍',
      '😘', '🙂', '🤗', '🤔', '😐', '😑',
      '😶', '🙄', '😏', '😣', '😥', '😮',
      '🤐', '😯', '😪', '😫', '😴', '😌',
      '😬', '😤',
  ]);
  
  
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


  return (
    <ECContext.Provider
      value={{
        textAreaValue,
        setTextAreaValue,
        selectedTopic,
        setSelectedTopic,
        selectedTopicArea,
        setSelectedTopicArea,
        changeSelectTopicArea,
        handleAskAI,
        TopicAreas,
        prompts,
        contentEditableRef,
        textareaValueMsg,
        setTextareaValueMsg,
        emojis,
      }}
    >
      {children}
    </ECContext.Provider>
  );
};

export { ECContext, ECProvider };