import React, { createContext, useState, useRef, useEffect } from "react";
import emojiRegex from 'emoji-regex';

const ECContext = createContext();

const ECProvider = ({ children }) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [textareaValueMsg, setTextareaValueMsg] = useState('');
  const contentEditableRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(null);

  const [TopicAreas, setTopicAreas] = useState([]);
  const [AiOptions, setAiOptions] = useState({});
  const [prompts, setPrompts] = useState([]);
  const [randomAiString, setRandomString] = useState(0);
  const [selectedTopicArea, setSelectedTopicArea] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const sampleEmojie = {
    "MOVIE": [
      '😀', '😁', '🎹', '🎲', '😄', '😅',
      '😆', '😉', '😊', '😋', '😎', '😍',
      '🌠', '🌌', '⭐', '🌈', '🌧️', '⛅',
      '😔', '😓', '😩', '😡', '😠', '😤',
      '😈', '👿', '💀', '☠️', '👻', '💩'
    ],
    "SONGS": [
      '🎉', '🎊', '🎈', '🎂', '🍾', '🥂',
      '🎤', '🎧', '🎵', '🎼', '🎷', '🎺',
      '🎸', '🎻', '♟️', '🧩',
      '🧸', '🧗', '🚴', '🏌️', '🏄', '🏊',
      '😘', '🙂', '🤗', '🤔', '😐', '😑',
      '😶', '🙄', '😏', '😣', '😥', '😮',
      '🏈', '🏀', '⚽', '⚾', '🏐', '🎮'
    ],
    "SERIES": [
      '🌸', '🌼', '🌷', '🌹', '🌺', '🌻',
      '🌞', '🌝', '🌛', '🌜', '🌚', '🌕',
      '🌖', '🌗', '🌘', '🌑', '🌙', '🌟',
      '🤐', '😯', '😪', '😫', '😴', '😌',
      '🤹', '🛹', '🛼', '🏆', '🎯', '🎳',
      '🌪️', '🌫️', '🌊', '🌋', '🏔️', '🏕️',
      '🏜️', '🏝️', '🏞️', '🗻', '🌄', '🌅'
    ]
  };

  const [emojis, setEmojis] = useState([
    '😀', '😁', '🎹', '🎲', '😄', '😅',
    '😆', '😉', '😊', '😋', '😎', '😍',
    '🌠', '🌌', '⭐', '🌈', '🌧️', '⛅',
    '😔', '😓', '😩', '😡', '😠', '😤',
    '😈', '👿', '💀', '☠️', '👻', '💩',
    '😬', '😤',
  ]);

  useEffect(() => {
    const fetchGridLetters = async () => {
      try {
        const response = await fetch("https://vyld-cb-staging-api.vyld.io/api/v1/activity-games?name=emoji_charades");
        const res = await response.json();
        const fetchedTopicAreas = Object.keys(res.data.result);
        const fetchedAiOptions = res.data.result;
        const initialTopicArea = fetchedTopicAreas[Math.floor(Math.random() * fetchedTopicAreas.length)];
        const initialPrompts = fetchedAiOptions[initialTopicArea].map((val) => val.text);
        const initialTopic = initialPrompts[Math.floor(Math.random() * initialPrompts.length)];


        setTopicAreas(fetchedTopicAreas);
        setAiOptions(fetchedAiOptions);
        setSelectedTopicArea(initialTopicArea);
        setPrompts(initialPrompts);
        setSelectedTopic(initialTopic);
      } catch (error) {
        console.error("Error fetching grid letters:", error);
      }
    };
    fetchGridLetters();
  }, []);

  // useEffect(() => {
  //   if (selectedTopicArea && selectedTopic) {
  //     handleChangeEmojie(selectedTopicArea, selectedTopic);
  //   }
  // }, [selectedTopicArea, selectedTopic]);

function handleChangeEmojie(newTopicArea, seltp) {
  const TempEmoji = sampleEmojie[newTopicArea];
  const opt = AiOptions[newTopicArea].find(obj => obj.text === seltp).options;
  const reqEmoji = opt.map((ok, index) => {
    return ok.data;
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const regex = emojiRegex();

  // Extract emojis from each string in reqEmoji
  let emojiis = [];
  reqEmoji.forEach(str => {
    const matches = str.match(regex);
    if (matches) {
      emojiis = emojiis.concat(matches);
    }
  });

  const uniqueReqEmojis = [...new Set(emojiis)];
  const filteredTempEmojis = TempEmoji.filter(emoji => !uniqueReqEmojis.includes(emoji));

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

    const randIdx = Math.floor(Math.random() * AiOptions[newTopicArea].length);
    const tempPrompts = AiOptions[newTopicArea].map((val) => val.text);
    const newTopic = tempPrompts[randIdx];

    setSelectedTopicArea(newTopicArea);
    setTextAreaValue('');
    setSelectedTopic(newTopic);
    setPrompts(AiOptions[newTopicArea].map((val) => val.text));
    contentEditableRef.current.setAttribute('data-placeholder', 'Enter emojis');
    handleChangeEmojie(newTopicArea, newTopic);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    handleChangeEmojie(selectedTopicArea, topic);
    setTextAreaValue('');
    contentEditableRef.current.setAttribute('data-placeholder', 'Enter emojis');
  };

  function handleAskAI() {
    setTextAreaValue('');
    const contentEditableElement = contentEditableRef.current;
    if (contentEditableElement) {
      contentEditableElement.setAttribute('data-placeholder', 'Generating...');
      setRandomString((prev) => (prev === 0 ? 1 : 0));
      const opt = AiOptions[selectedTopicArea].find(obj => obj.text === selectedTopic).options;
    const reqEmoji = opt.map((ok, index) => {
      return ok.data;
    });
      const aiString = reqEmoji[randomAiString];
      setTimeout(() => {
        contentEditableElement.setAttribute('data-placeholder', 'Enter emojis');
        setTextAreaValue(aiString);
        setCursorPosition(null);
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
        handleSelectTopic,
        emojis,
        cursorPosition,
        setCursorPosition,
        handleChangeEmojie,
      }}
    >
      {children}
    </ECContext.Provider>
  );
};

export { ECContext, ECProvider };
