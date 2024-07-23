import React, { useState, useEffect, useRef } from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic, selectedTopic, selectedTopicArea, prompts }) => {
    const topics = prompts;
    const [searchTerm, setSearchTerm] = useState('');
    const [closing, setClosing] = useState(false);
    const slidebarRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setClosing(true);
            setTimeout(() => {
                setClosing(false);
                onClose();
            }, 500);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (slidebarRef.current && !slidebarRef.current.contains(event.target)) {
                setClosing(true);
                setTimeout(() => {
                    setClosing(false);
                    onClose();
                }, 500);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);




    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTopics = topics.filter(topic =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    function onSelectNewTopic(topic) {
        onSelectTopic(topic);
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 500);
    }

    const handleDragStart = (event) => {
        const slidebar = document.querySelector('.bottomSlidebar');
        const startY = event.clientY || event.touches[0].clientY;
        const startHeight = slidebar.getBoundingClientRect().height;
        const upperLimit = window.innerHeight * 0.95;
        const midLimit = window.innerHeight * 0.78;
        const s1 = window.innerHeight * 0.64;
        const s2 = window.innerHeight * 0.85;
        const lowerLimit = window.innerHeight * 0.5;

        const onDragMove = (moveEvent) => {
            const currentY = moveEvent.clientY || moveEvent.touches[0].clientY;
            const newHeight = startHeight - (currentY - startY);

            if (newHeight >= upperLimit) {
                slidebar.style.height = `${upperLimit}px`;
            } else {
                slidebar.style.height = `${newHeight}px`;
            }
        };

        const onDragEnd = (endEvent) => {
            const endY = endEvent.clientY || endEvent.changedTouches[0].clientY;
            const endHeight = startHeight - (endY - startY);
            slidebar.style.transition = 'height 0.5s ease';

            if (endHeight <= s1) {
                slidebar.style.height = `${lowerLimit}px`;

                setTimeout(() => {
                    slidebar.style.transition = '';
                }, 500);
            }else if((endHeight > s1)&&(endHeight <= midLimit)){
                slidebar.style.height = `${midLimit}px`;
                
                setTimeout(() => {
                    slidebar.style.transition = '';
                }, 500);
            }else if((endHeight > midLimit)&&(endHeight <= s2)){
                slidebar.style.height = `${midLimit}px`;

                setTimeout(() => {
                    slidebar.style.transition = '';
                }, 500);
            }else {
                slidebar.style.height = `${upperLimit}px`;

                setTimeout(() => {
                    slidebar.style.transition = '';
                }, 500);
            }


            if (endHeight <= lowerLimit) {
                setClosing(true);
                setTimeout(() => {
                    setClosing(false);
                    onClose();
                }, 500);
            }

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
        <div ref={slidebarRef} className={`bottomSlidebar ${isOpen && !closing ? 'open' : ''} ${closing ? 'close' : ''}`}>
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
                        onClick={() => onSelectNewTopic(topic)}
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
