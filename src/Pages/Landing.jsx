import React from 'react'
import emoji from "../../public/Emoji-text.png";
import ActivityInfo from '../components/ActivityInfo';
import { useState } from "react";
const Landing = () => {
    const [isShowActivityInfo, setISShowActivityInfo] = useState(false);
  return (
    <div className="app-container">
      <div className="background_speheres">
        <svg width="360" height="628" viewBox="0 0 360 628" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="180" cy="314" r="32.5" stroke="white" strokeOpacity="0.1"/>
          <circle cx="180" cy="314" r="64.5" stroke="white" strokeOpacity="0.1"/>
          <circle cx="180" cy="314" r="100.5" stroke="white" strokeOpacity="0.1"/>
          <circle cx="180" cy="314" r="147.5" stroke="white" strokeOpacity="0.1"/>
          <circle cx="180" cy="314" r="215.5" stroke="white" strokeOpacity="0.1"/>
          <circle cx="180" cy="314" r="313.5" stroke="white" strokeOpacity="0.1"/>
        </svg>
      </div>
      <div className="background_moons">
        <svg
          width="360"
          height="781"
          viewBox="0 0 360 725"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="158.417"
            cy="184.358"
            rx="2.96409"
            ry="2.66344"
            transform="rotate(48.2745 158.417 184.358)"
            fill="white"
            fillOpacity="0.5"
          />
          <ellipse
            cx="291.643"
            cy="229.706"
            rx="2.96409"
            ry="2.66344"
            transform="rotate(48.2745 291.643 229.706)"
            fill="white"
          />
          <ellipse
            cx="334.191"
            cy="504.187"
            rx="2.96409"
            ry="2.66344"
            transform="rotate(48.2745 334.191 504.187)"
            fill="white"
          />
          <ellipse
            cx="280.876"
            cy="632.485"
            rx="1.97606"
            ry="1.77563"
            transform="rotate(48.2745 280.876 632.485)"
            fill="white"
          />
          <ellipse
            cx="142.64"
            cy="165.331"
            rx="1.97606"
            ry="1.77563"
            transform="rotate(48.2745 142.64 165.331)"
            fill="white"
          />
          <ellipse
            cx="280.212"
            cy="108.841"
            rx="1.97606"
            ry="1.77563"
            transform="rotate(48.2745 280.212 108.841)"
            fill="white"
          />
          <ellipse
            cx="183.706"
            cy="132.681"
            rx="0.988031"
            ry="0.887814"
            transform="rotate(48.2745 183.706 132.681)"
            fill="white"
          />
          <ellipse
            cx="342.002"
            cy="534.289"
            rx="0.988031"
            ry="0.887814"
            transform="rotate(48.2745 342.002 534.289)"
            fill="white"
            fillOpacity="0.5"
          />
          <ellipse
            cx="271.354"
            cy="705.845"
            rx="0.988031"
            ry="0.887814"
            transform="rotate(48.2745 271.354 705.845)"
            fill="white"
            fillOpacity="0.5"
          />
          <ellipse
            cx="17.6632"
            cy="733.503"
            rx="0.988031"
            ry="0.887814"
            transform="rotate(48.2745 17.6632 733.503)"
            fill="white"
          />
          <ellipse
            cx="155.656"
            cy="215.944"
            rx="0.988031"
            ry="0.887814"
            transform="rotate(48.2745 155.656 215.944)"
            fill="white"
          />
          <ellipse
            cx="290.603"
            cy="155.175"
            rx="5.92818"
            ry="5.32688"
            transform="rotate(48.2745 290.603 155.175)"
            fill="white"
          />
          <ellipse
            cx="27.3149"
            cy="276.117"
            rx="5.92818"
            ry="5.32688"
            transform="rotate(48.2745 27.3149 276.117)"
            fill="white"
          />
        </svg>
      </div>
      <div className="Emoji_above_text">
        <p>You found</p>
      </div>
      <div className="Emoji_text">
        <img src={emoji}/>
      </div>
      <div className="Our_activity_info">
      {isShowActivityInfo && <ActivityInfo onClose={() => { setISShowActivityInfo(false);}}/>}
      {!isShowActivityInfo && <div className="activity_info">
        <p className='Landing_activity_info' onClick={() => { setISShowActivityInfo(true); }}>Activity info</p>
      </div>}
      </div>
      <div className={`Landing_buttons ${isShowActivityInfo?'lbmargintop':''}`}>
        <button className='Landing_start' >Start</button>
        <button className='Landing_activity'>choose another activity</button>
      </div>
    </div>
  )
}

export default Landing
