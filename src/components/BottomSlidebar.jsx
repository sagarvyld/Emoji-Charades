import React, { useState, useEffect } from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic, selectedTopic, selectedTopicArea }) => {
    const topics = ['I don’t want any prompt', 'Inception', 'Can we talk about', 'Rate my fit', 'Reservoir Dogs', 'The Dark Knight', 'A daily essential', 'Interstellar', 'Pulp Fiction', 'Cook with me'];
    const [searchTerm, setSearchTerm] = useState('');
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setClosing(true);
            setTimeout(() => {
                setClosing(false);
                onClose();
            }, 500); // Match the duration of the slide-out animation
        }
    }, [isOpen, onClose]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTopics = topics.filter(topic =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDragStart = (event) => {
        const slidebar = document.querySelector('.bottomSlidebar');
        const startY = event.clientY || event.touches[0].clientY;
        const startHeight = slidebar.getBoundingClientRect().height;
        const upperLimit = window.innerHeight * 0.95;
        const lowerLimit = window.innerHeight * 0.5;

        const onDragMove = (moveEvent) => {
            const currentY = moveEvent.clientY || moveEvent.touches[0].clientY;
            const newHeight = startHeight - (currentY - startY);

            if (newHeight >= upperLimit) {
                slidebar.style.height = `${upperLimit}px`;
            } else if (newHeight <= lowerLimit) {
                setClosing(true);
                setTimeout(() => {
                    setClosing(false);
                    onClose();
                }, 500);
            } else {
                slidebar.style.height = `${newHeight}px`;
            }
        };

        const onDragEnd = () => {
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
            document.removeEventListener('touchmove', onDragMove);
            document.removeEventListener('touchend', onDragEnd);
        };

        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', onDragMove);
        document.addEventListener('touchend', onDragEnd);
    };

    return (
        <div className={`bottomSlidebar ${isOpen && !closing ? 'open' : ''} ${closing ? 'close' : ''}`}>
            <div className='slidebarHeader' onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
                <span className='slidebar_heading'>{selectedTopicArea}</span>
                <div className='dragHandle'></div>
            </div>
            <div className='searchBarContainer'>
                <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10.6402 10.9125L12.6958 12.9628M12.2367 6.99333C12.2367 9.88913 9.88913 12.2367 6.99333 12.2367C4.09752 12.2367 1.75 9.88913 1.75 6.99333C1.75 4.09752 4.09752 1.75 6.99333 1.75C9.88913 1.75 12.2367 4.09752 12.2367 6.99333Z" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input
                    type='text'
                    className='searchBar'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className='slidebarContent'>
                {filteredTopics.map((topic, index) => (
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
