import React, { useState } from 'react';
import './dumbcharades.css';
import EmojiKeyboard from '../components/EmojiKeyboard';
import BottomSlidebar from '../components/BottomSlidebar';

const Dumbcharades = (props) => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('Reservoir Dogs');
    const [selectedTopicArea, setSelectedTopicArea] = useState('Movie');

    const TopicAreas = ['Movie','Music','Sports','Literature','Books','Drama', 'Story', 'Poetry']

    const handleEmojiClick = (emoji) => {
        setTextAreaValue(prevValue => prevValue + emoji);
    };
    const removeLast = () => {
        setTextAreaValue(prevValue => {
            if (prevValue.length === 0) return '';
            const codePoint = prevValue.codePointAt(prevValue.length - 1);
            return codePoint !== 32
                ? prevValue.slice(0, -2)
                : prevValue.slice(0, -1);
        });
    };

    const handleNewSelectClick = () => {
        setIsSlidebarOpen(true);
    };

    const handleCloseSlidebar = () => {
        setIsSlidebarOpen(false);
    };

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        setIsSlidebarOpen(false);
    };
    const changeSelectTopicArea = () => {
        // const randomIndex = Math.floor(Math.random() * TopicAreas.length);
        // setSelectedTopicArea(TopicAreas[randomIndex]);
        let newTopicArea;
        do {
            const randomIndex = Math.floor(Math.random() * TopicAreas.length);
            newTopicArea = TopicAreas[randomIndex];
        } while (newTopicArea === selectedTopicArea);
        setSelectedTopicArea(newTopicArea);
    };

    return (
        <div className='dcPage'>
            <div className='bkbtn_ec' onClick={props.onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z" fill="white" />
                </svg>
            </div>
            <div className='movieHeading'>{selectedTopicArea}</div>
            <div className='newSelectbtn' onClick={changeSelectTopicArea}>
                <svg className='newSelectIcon' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                    <path d="M14.7926 10.9428C14.6684 10.8788 14.5256 10.8608 14.3893 10.8917C14.2531 10.9227 14.1321 11.0007 14.0477 11.1121C13.9633 11.2234 13.9209 11.361 13.9279 11.5005C13.9349 11.64 13.9909 11.7726 14.086 11.875L14.9529 12.5221H12.7798C12.1799 12.5163 11.5889 12.3768 11.0497 12.1139C10.5105 11.851 10.0366 11.4712 9.66259 11.0021C9.60918 10.9448 9.54501 10.8986 9.47373 10.8661C9.40245 10.8336 9.32547 10.8154 9.24718 10.8127C9.08906 10.8071 8.93521 10.8646 8.81947 10.9725C8.70373 11.0803 8.63558 11.2298 8.63001 11.3879C8.62444 11.546 8.68191 11.6998 8.78978 11.8156C9.27447 12.4187 9.88961 12.9041 10.5889 13.2353C11.2883 13.5664 12.0536 13.7347 12.8273 13.7275H14.9529L14.086 14.3746C13.9733 14.4729 13.9018 14.61 13.8858 14.7587C13.8698 14.9074 13.9105 15.0566 13.9997 15.1766C14.089 15.2966 14.2202 15.3785 14.3672 15.4059C14.5141 15.4334 14.6661 15.4043 14.7926 15.3246L17.1023 13.6087C17.176 13.5534 17.2359 13.4817 17.2771 13.3992C17.3183 13.3168 17.3398 13.2259 17.3398 13.1337C17.3398 13.0415 17.3183 12.9506 17.2771 12.8682C17.2359 12.7857 17.176 12.714 17.1023 12.6587L14.7926 10.9428Z" fill="white" />
                    <path d="M12.7307 6.57347C12.7617 6.56456 12.7947 6.56456 12.8257 6.57347H15.0404L14.0666 7.34534C13.943 7.44298 13.8633 7.58572 13.8449 7.74216C13.8265 7.89861 13.871 8.05595 13.9687 8.17956C14.0663 8.30318 14.2091 8.38295 14.3655 8.40132C14.5219 8.41969 14.6793 8.37516 14.8029 8.27753L17.1126 6.44284C17.1819 6.38721 17.2379 6.31671 17.2764 6.23655C17.3148 6.15639 17.3348 6.06862 17.3348 5.97972C17.3348 5.89081 17.3148 5.80304 17.2764 5.72288C17.2379 5.64273 17.1819 5.57223 17.1126 5.51659L14.8029 3.68191C14.6793 3.58427 14.5219 3.53975 14.3655 3.55812C14.2091 3.57649 14.0663 3.65626 13.9687 3.77987C13.871 3.90349 13.8265 4.06083 13.8449 4.21727C13.8633 4.37372 13.943 4.51646 14.0666 4.61409L15.0404 5.38597H12.8257C10.5279 5.33847 9.06133 6.84066 7.93321 8.56253C6.63883 6.53191 5.15446 4.22816 2.25696 4.22816C2.09949 4.22816 1.94846 4.29071 1.83711 4.40206C1.72576 4.51341 1.66321 4.66443 1.66321 4.82191C1.66321 4.97938 1.72576 5.1304 1.83711 5.24175C1.94846 5.3531 2.09949 5.41566 2.25696 5.41566C4.69133 5.41566 5.93821 7.63628 7.23852 9.68472C5.93821 11.8757 4.6854 14.2863 2.25696 14.2507C2.09949 14.2507 1.94846 14.3132 1.83711 14.4246C1.72576 14.5359 1.66321 14.6869 1.66321 14.8444C1.66321 15.0019 1.72576 15.1529 1.83711 15.2643C1.94846 15.3756 2.09949 15.4382 2.25696 15.4382C7.87383 15.4916 7.79071 6.77534 12.7307 6.57347Z" fill="white" />
                </svg>
                <span className="newSelectText">Get a new topic</span>
            </div>
            <div className='topicName'>
                <span className="topicText">{selectedTopic}</span>
                <div className="topicNavIcon_container" onClick={handleNewSelectClick}>
                    <svg className='topicNavIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 7" fill="none">
                        <path d="M9.875 1.3125L5.5 5.6875L1.125 1.3125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className='emojiArea'>
                <textarea className='emojiTextArea' placeholder='Enter emojis'
                    style={{ resize: "none", whiteSpace: 'pre-wrap' }} value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}>
                </textarea>
                <div className='emojiAi'>
                    <svg className="emojiAiIcon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.375 4.37503L10.5059 5.2442L8.75586 3.4942L9.62503 2.62503C9.87003 2.38003 10.185 2.26337 10.5 2.26337C10.815 2.26337 11.13 2.38003 11.375 2.62503C11.8592 3.1092 11.8592 3.89087 11.375 4.37503Z" fill="#161716" />
                        <path d="M10.0974 5.65829L3.79159 11.9583C3.30743 12.4425 2.52576 12.4425 2.04159 11.9583C1.55743 11.4741 1.55743 10.6925 2.04159 10.2083L8.34743 3.90829L10.0974 5.65829Z" fill="#161716" />
                        <path d="M5.80426 2.04168L6.04342 1.23084C6.06676 1.15501 6.04342 1.07334 5.99092 1.01501C5.93842 0.956677 5.84509 0.933343 5.76926 0.956677L4.95842 1.19584L4.14759 0.956677C4.07176 0.933343 3.99009 0.956677 3.93176 1.00918C3.87342 1.06751 3.85592 1.14918 3.87926 1.22501L4.11259 2.04168L3.87342 2.85251C3.85009 2.92834 3.87342 3.01001 3.92592 3.06834C3.98426 3.12668 4.06592 3.14418 4.14176 3.12084L4.95842 2.88751L5.76926 3.12668C5.79259 3.13251 5.81009 3.13834 5.83342 3.13834C5.89176 3.13834 5.94426 3.11501 5.99092 3.07418C6.04926 3.01584 6.06676 2.93418 6.04342 2.85834L5.80426 2.04168Z" fill="#161716" />
                        <path d="M3.47101 5.54174L3.71017 4.7309C3.73351 4.65507 3.71017 4.5734 3.65767 4.51507C3.59934 4.45674 3.51767 4.43924 3.44184 4.46257L2.62517 4.6959L1.81434 4.45674C1.73851 4.4334 1.65684 4.45674 1.59851 4.50924C1.54017 4.56757 1.52267 4.64924 1.54601 4.72507L1.77934 5.54174L1.54017 6.35257C1.51684 6.4284 1.54017 6.51007 1.59267 6.5684C1.65101 6.62674 1.73267 6.64424 1.80851 6.6209L2.61934 6.38174L3.43017 6.6209C3.44767 6.62674 3.47101 6.62674 3.49434 6.62674C3.55267 6.62674 3.60517 6.6034 3.65184 6.56257C3.71017 6.50424 3.72767 6.42257 3.70434 6.34674L3.47101 5.54174Z" fill="#161716" />
                        <path d="M12.2208 8.45837L12.46 7.64753C12.4833 7.5717 12.46 7.49004 12.4075 7.4317C12.3491 7.37337 12.2675 7.35587 12.1916 7.3792L11.3808 7.61837L10.57 7.3792C10.4941 7.35587 10.4125 7.3792 10.3541 7.4317C10.2958 7.49004 10.2783 7.5717 10.3016 7.64753L10.5408 8.45837L10.3016 9.2692C10.2783 9.34504 10.3016 9.4267 10.3541 9.48504C10.4125 9.54337 10.4941 9.56087 10.57 9.53754L11.3808 9.29837L12.1916 9.53754C12.2091 9.54337 12.2325 9.54337 12.2558 9.54337C12.3141 9.54337 12.3666 9.52004 12.4133 9.4792C12.4716 9.42087 12.4891 9.3392 12.4658 9.26337L12.2208 8.45837Z" fill="#161716" />
                    </svg>
                    <span className='emojiAiText'>Ask AI</span>
                </div>
            </div>
            <EmojiKeyboard onEmojiClick={handleEmojiClick} removeLast={removeLast} />
            <button className='nextForEmoji'>Next</button>
            {isSlidebarOpen && <BottomSlidebar
                isOpen={isSlidebarOpen} 
                onClose={handleCloseSlidebar} 
                onSelectTopic={handleSelectTopic} 
                selectedTopic={selectedTopic}
            /> }
        </div>
    )
}

export default Dumbcharades;
