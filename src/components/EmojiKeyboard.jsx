import React from 'react';
import './EmojiKeyboard.css';

const EmojiKeyboard = ({ onEmojiClick , removeLast, emojis ,remEmoji}) => {

    return (
        <div className="emoji-keyboard">
            <div className="emoji-grid">
                {emojis.map((emoji, index) => (
                    <div 
                        key={index} 
                        className="emoji-item"
                        onClick={() => onEmojiClick(emoji)}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
            <div className="emoji-grid2">
                <div 
                    key={31} 
                    className="emoji-item"
                    onClick={() => onEmojiClick(remEmoji[0])}
                >
                    {remEmoji[0]}
                </div>
                <div 
                    key={32} 
                    className="emoji-item"
                    onClick={() => onEmojiClick(remEmoji[1])}
                >
                    {remEmoji[1]}
                </div>
                <button 
                    className="emoji-space"
                    onClick={() => onEmojiClick('  ')}
                >
                    <span className='emoji-sc-content'>Space</span>
                </button>
                <button 
                    className="emoji-clear"
                    onClick={removeLast}
                >
                    <span style={{fontSize:"1.8rem"}} className='emoji-sc-content'>⌫</span>
                </button>
            </div>
        </div>
    );
};

export default EmojiKeyboard;
