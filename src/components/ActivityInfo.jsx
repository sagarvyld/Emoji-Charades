import React from 'react'
import './ActivityInfo.css';

const ActivityInfo = (props) => {
    return (
        <div className='Activity-info-box'>
            <div className='close-activityInfo' onClick={props.onClose}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 10 10" fill="none">
                <path d="M1 1L9 9" stroke="#79889D"  stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 1L1 9" stroke="#79889D"  stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
            <div className='acib-topo'>
                <p style={{ textAlign: "left", margin: "0" }}> <b style={{ color: "#FFF", fontWeight: "600" }}>Challenge:</b> Send a string of emojis to represent a movie.</p>
                <p style={{ textAlign: "left", margin: "0" }}><b style={{ color: "#FFF", fontWeight: "600" }}>Guess:</b> The other person guesses the movie name based on your emojis. </p>
                <p style={{ textAlign: "left", margin: "0" }}> <b style={{ color: "#FFF", fontWeight: "600" }}>Connect:</b> Once guessed, chat, add friends, and share your game results!</p>
            </div>
        </div>
    )
}

export default ActivityInfo;