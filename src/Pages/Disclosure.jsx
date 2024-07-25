import React, { useEffect, useState } from 'react';
import './Disclosure.css'; // Importing the CSS for styling
import imag from '../assets/img/Boxes-3.png';

const Disclosure = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 4000); 

    return () => clearTimeout(timer); 
  }, []);

  const handleCopy = () => {
    const url = `https://2t1lactivitywybtestingrec.netlify.app?activityId=${props.activityId}`;
    navigator.clipboard.writeText(url)
      .then(() => setCopyFeedback('Copied!'))
      .catch(() => setCopyFeedback('Copy failed. Please try again.'));
  };

  return (
    <div className="container">
      <div className="copy-box">
        <div className="copy-text">
          {`https://emojichactivitywybtestingv2rec.netlify.app/?activityId=${props.activityId}`}
        </div>
        <button className="copy-button" onClick={handleCopy}>
          Copy
        </button>
        {copyFeedback && <div className="copy-feedback">{copyFeedback}</div>}
      </div>
      {!showMessage ? (
        <div className="oscillate">
          <img src={imag} alt="Oscillating" className="image" />
        </div>
      ) : (
        <>
          <div className="message-container">
            <div className="main-message">Nailed It!😍</div>
            <div className="sub-message">Activity sent to Rahul</div>
          </div>
          <button className={`nxtbtntp`} onClick={()=>console.log(9)} ><span className={`nxtbtntp-txt`}>Continue</span></button>
        </>
      )}
    </div>
  );
};

export default Disclosure;