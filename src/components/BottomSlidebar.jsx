import React, { useState, useRef, useEffect } from 'react';
import './bottomSlidebar.css';

const BottomSlidebar = ({ isOpen, onClose, onSelectTopic, selectedTopic }) => {
    const topics = ['I don’t want any prompt', 'Inception', 'Can we talk about', 'Rate my fit', 'Reservoir Dogs', 'The Dark Knight', 'A daily essential', 'Interstellar', 'Pulp Fiction', 'Cook with me'];
    const [searchTerm, setSearchTerm] = useState('');
    const [slidebarHeight, setSlidebarHeight] = useState('50vh');
    const slidebarRef = useRef(null);
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTopics = topics.filter(topic =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMove = (e) => {
        e.preventDefault(); // Prevent default behavior for smooth dragging
        const clientY = e.clientY || e.touches[0].clientY;
        const height = window.innerHeight - clientY;
        if (height < 200) {
            setSlidebarHeight('0px');
            setIsDragging(false);
            onClose();
        } else {
            setSlidebarHeight(`${Math.min(Math.max(height, 200), window.innerHeight * 0.8)}px`);
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
    };

    const handleStart = (e) => {
        e.preventDefault(); // Prevent default behavior for smooth dragging
        isDraggingRef.current = true;
        startYRef.current = e.clientY || e.touches[0].clientY;
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    };

    useEffect(() => {
        if (!isOpen) {
            setSlidebarHeight('50vh');
        }
    }, [isOpen]);

    return (
        <div ref={slidebarRef} className={`bottomSlidebar ${isOpen ? 'open' : ''}`} style={{ height: slidebarHeight }}>
            <div className='dragHandle' onMouseDown={handleStart} onTouchStart={handleStart}></div>
            <div className='slidebarHeader'>
                <span className='slidebar_heading'>Movies</span>
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
