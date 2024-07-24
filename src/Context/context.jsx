import React, { createContext, useState, useRef, useEffect } from "react";
import prompt from "../assets/Data";
import AiOptions from "../assets/AiOptions";
import emojiRegex from 'emoji-regex';

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
  const sampleEmojie = {
    "Movie": [
      '😀', '😁', '🎹', '🎲', '😄', '😅',
      '😆', '😉', '😊', '😋', '😎', '😍',
      '🌠', '🌌', '⭐', '🌈', '🌧️', '⛅',
      '😔', '😓', '😩', '😡', '😠', '😤',
      '😈', '👿', '💀', '☠️', '👻', '💩'
    ],
    "Songs": [
      '🎉', '🎊', '🎈', '🎂', '🍾', '🥂',
      '🎤', '🎧', '🎵', '🎼', '🎷', '🎺',
      '🎸', '🎻', '♟️', '🧩',
      '🧸', '🧗', '🚴', '🏌️', '🏄', '🏊',
      '😘', '🙂', '🤗', '🤔', '😐', '😑',
      '😶', '🙄', '😏', '😣', '😥', '😮',
      '🏈', '🏀', '⚽', '⚾', '🏐', '🎮'
    ],
    "TV Shows": [
      '🌸', '🌼', '🌷', '🌹', '🌺', '🌻',
      '🌞', '🌝', '🌛', '🌜', '🌚', '🌕',
      '🌖', '🌗', '🌘', '🌑', '🌙', '🌟',
      '🤐', '😯', '😪', '😫', '😴', '😌',
      '🤹', '🛹', '🛼', '🏆', '🎯', '🎳',
      '🌪️', '🌫️', '🌊', '🌋', '🏔️', '🏕️',
      '🏜️', '🏝️', '🏞️', '🗻', '🌄', '🌅'
    ]
  }



  const [emojis, setEmojis] = useState([
    '😀', '😁', '🎹', '🎲', '😄', '😅',
    '😆', '😉', '😊', '😋', '😎', '😍',
    '🌠', '🌌', '⭐', '🌈', '🌧️', '⛅',
    '😔', '😓', '😩', '😡', '😠', '😤',
    '😈', '👿', '💀', '☠️', '👻', '💩',
    '😬', '😤',
  ]);


  function handleChangeEmojie(newTopicArea, seltp) {
    const TempEmoji = sampleEmojie[newTopicArea];
    const reqEmoji = AiOptions[newTopicArea][seltp].join('');
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    // const uniqueReqEmojis = [...new Set(reqEmoji.match(/[\p{Emoji}]/gu))];
    const regex = emojiRegex();
    const emojiis = reqEmoji.match(regex);

    const uniqueReqEmojis = [...new Set(emojiis)];
    const filteredTempEmojis = TempEmoji.filter(emoji => !uniqueReqEmojis.includes(emoji));
    console.log("req", uniqueReqEmojis);
    shuffleArray(filteredTempEmojis);
    const newemojie = [...uniqueReqEmojis, ...filteredTempEmojis.slice(0, 32 - uniqueReqEmojis.length)];
    shuffleArray(newemojie);
    setEmojis(newemojie);
  }

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

    handleChangeEmojie(newTopicArea, prompt[newTopicArea][randIdx]);
  };


  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    handleChangeEmojie(selectedTopicArea, topic);
    setTextAreaValue('');
  };


  function handleAskAI() {
    setTextAreaValue('');
    const contentEditableElement = contentEditableRef.current;
    if (contentEditableElement) {
      contentEditableElement.setAttribute('data-placeholder', 'Generating...');
      (randomAiString === 0) ? setRandomString(1) : setRandomString(0);
      console.log(randomAiString);
      let aiString = AiOptions[selectedTopicArea][selectedTopic][randomAiString];
      console.log(AiOptions[selectedTopicArea][selectedTopic]);
      setTimeout(() => {
        contentEditableElement.setAttribute('data-placeholder', 'Enter emojis');
        setTextAreaValue(aiString);
      }, 1000);
    }

  }


  useEffect(() => {
    handleChangeEmojie(selectedTopicArea, selectedTopic);
  }, []);

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
        handleSelectTopic,
        emojis,
      }}
    >
      {children}
    </ECContext.Provider>
  );
};

export { ECContext, ECProvider };