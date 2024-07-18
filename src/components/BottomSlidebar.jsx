import React from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic }) => {
    const topics = ['I don’t want any prompt', 'Inception', 'Can we talk about', 'Rate my fit', 'Reservoir Dogs', 'The Dark Knight', 'A daily essential', 'Interstellar', 'Pulp Fiction', 'Cook with me',];


    return (
        <div className={`bottomSlidebar ${isOpen ? 'open' : ''}`}>
            <div className='slidebarHeader'>
                <span className='slidebar_heading'>Movies</span>
                <button className='closeBtn' onClick={onClose}>X</button>
            </div>
            <div className='slidebarContent'>
                {topics.map((topic, index) => (
                    <div key={index} className='topicItem' onClick={() => onSelectTopic(topic)}>
                        <span className='topicItemtxt'>{topic}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomSlidebar;
