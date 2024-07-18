import React from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic }) => {
    const topics = ['Reservoir Dogs', 'Inception', 'The Dark Knight', 'Interstellar', 'Pulp Fiction'];

    return (
        <div className={`bottomSlidebar ${isOpen ? 'open' : ''}`}>
            <div className='slidebarHeader'>
                <span>Select a Topic</span>
                <button className='closeBtn' onClick={onClose}>X</button>
            </div>
            <div className='slidebarContent'>
                {topics.map((topic, index) => (
                    <div key={index} className='topicItem' onClick={() => onSelectTopic(topic)}>
                        {topic}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomSlidebar;
