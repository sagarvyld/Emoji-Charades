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
                <p style={{ textAlign: "left", margin: "0" }}> <b style={{ color: "#FFF", fontWeight: "600" }}>Snap:</b> Get a cool prompt and take a photo that matches the theme.</p>
                <p style={{ textAlign: "left", margin: "0" }}><b style={{ color: "#FFF", fontWeight: "600" }}>Match:</b> They See your photo only after they take theirs. </p>
                <p style={{ textAlign: "left", margin: "0" }}> <b style={{ color: "#FFF", fontWeight: "600" }}>Connect:</b> Reveal, react, and start chatting!</p>
            </div>
        </div>
    )
}

export default ActivityInfo;