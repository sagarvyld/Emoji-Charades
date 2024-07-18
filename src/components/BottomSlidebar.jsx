import React from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic, selectedTopic }) => {
    const topics = ['I don’t want any prompt', 'Inception', 'Can we talk about', 'Rate my fit', 'Reservoir Dogs', 'The Dark Knight', 'A daily essential', 'Interstellar', 'Pulp Fiction', 'Cook with me'];

    return (
        <div className={`bottomSlidebar ${isOpen ? 'open' : ''}`}>
            <div className='slidebarHeader'>
                <span className='slidebar_heading'>Movies</span>
                <button className='closeBtn' onClick={onClose}>X</button>
            </div>
            <div className='slidebarContent'>
                {topics.map((topic, index) => (
                    <div
                        key={index}
                        className={`topicItem ${selectedTopic === topic ? 'selected' : ''}`}
                        onClick={() => onSelectTopic(topic)}
                    >
                        <span className='topicItemtxt' style={{ color: selectedTopic === topic ? '#C6FF00' : '' }}
                        >{topic}</span>
                        {selectedTopic === topic && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <circle cx="9" cy="9" r="8.5" fill="#C6FF00" stroke="#161716" />
                                <path d="M5.14282 9.00002L7.71425 11.5714L12.8571 6.42859" stroke="#161716" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomSlidebar;
