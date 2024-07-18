import React, { useState } from 'react';
import './EmojiKeyboard.css'; // We'll create this CSS file next

const EmojiKeyboard = () => {
    const [emojis] = useState([
        '😀', '😁', '😂', '🤣', '😄', '😅',
        '😆', '😉', '😊', '😋', '😎', '😍',
        '😘', '🙂', '🤗', '🤔', '😐', '😑',
        '😶', '🙄', '😏', '😣', '😥', '😮',
        '🤐', '😯', '😪', '😫', '😴', '😌',
        // '😤', , '😬'
    ]);

    return (
        <div className="emoji-keyboard">
            <div className="emoji-grid">
                {emojis.map((emoji, index) => (
                    <div key={index} className="emoji-item">
                        {emoji}
                    </div>
                ))}
            </div>
            <div className="emoji-grid2">
                <div key={31} className="emoji-item">
                    😤
                </div>
                <div key={32} className="emoji-item">
                    😬
                </div>
                <button className="emoji-space"><span className='emoji-sc-content'>Space</span></button>
                <button className="emoji-clear"><span style={{fontSize:"1.8rem"}} className='emoji-sc-content'>⌫</span></button>
            </div>
        </div>
    );
};

export default EmojiKeyboard;
