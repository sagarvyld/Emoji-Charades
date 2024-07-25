import React, { useContext, useEffect, useState } from 'react';
import { ECContext } from '../Context/context';
import './SendPage.css';
import AddNote from '../components/AddNote';

const SendPage = (props) => {
    const {selectedTopicArea,
        selectedTopic,
    textAreaValue,
    textareaValueMsg,
    setTextareaValueMsg,} = useContext(ECContext);




    async function handleForwarsActivity() {
        const data = {
          reqD: [
            { topicArea: selectedTopicArea },
            { topic:selectedTopic },
            { Emoji: textAreaValue },
          ],
          message: textareaValueMsg
        };
        console.log("Sending Data",JSON.stringify(data));
        try {
          const response = await fetch('https://vyld-cb-dev-api.vyld.io/api/v1/activity-games/game', {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
          });
          //  console.log("response", response);
          if (response.ok) {
            const responseData = await response.json();
            console.log("data",responseData );
            const activityId = responseData.data.activityId; 
            console.log('Activity ID:', activityId);
            props.setActivityId(activityId);
          } else {
            console.error('Failed to send data', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        props.onforw();
      }


    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.sendPage_EC').classList.add('show-elements');
        }, 100); // Small delay to ensure elements are initially hidden

        return () => clearTimeout(timeout);
    }, []);


    return (
        <div className='sendPage_EC'>
            <svg className='star1_EC' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M4.27854 1.10706C4.21149 0.894575 4.50414 0.76253 4.61909 0.953401L5.58324 2.55472C6.82821 4.62245 9.32787 5.56772 11.6295 4.8412L13.412 4.27855C13.6245 4.2115 13.7565 4.50415 13.5656 4.61911L11.9643 5.58325C9.89661 6.82822 8.95134 9.32788 9.67786 11.6295L10.2405 13.412C10.3076 13.6245 10.0149 13.7565 9.89996 13.5656L8.93581 11.9643C7.69084 9.89662 5.19119 8.95135 2.88953 9.67788L1.10705 10.2405C0.894566 10.3076 0.76252 10.0149 0.953392 9.89997L2.55471 8.93583C4.62244 7.69085 5.56771 5.19119 4.84118 2.88954L4.27854 1.10706Z" stroke="white" />
            </svg>
            <svg className='star2_EC' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4.27854 1.10706C4.21149 0.894575 4.50414 0.76253 4.61909 0.953401L5.58324 2.55472C6.82821 4.62245 9.32787 5.56772 11.6295 4.8412L13.412 4.27856C13.6245 4.2115 13.7565 4.50415 13.5656 4.61911L11.9643 5.58325C9.89661 6.82822 8.95134 9.32787 9.67786 11.6295L10.2405 13.412C10.3076 13.6245 10.0149 13.7565 9.89996 13.5656L8.93581 11.9643C7.69084 9.89662 5.19119 8.95135 2.88953 9.67788L1.10705 10.2405C0.894566 10.3076 0.76252 10.0149 0.953392 9.89997L2.55471 8.93583C4.62244 7.69085 5.56771 5.19119 4.84118 2.88954L4.27854 1.10706Z" fill="#FFE604" />
            </svg>
            <svg className='star3_EC' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M4.27854 1.10706C4.21149 0.894575 4.50414 0.76253 4.61909 0.953401L5.58324 2.55472C6.82821 4.62245 9.32787 5.56772 11.6295 4.8412L13.412 4.27855C13.6245 4.2115 13.7565 4.50415 13.5656 4.61911L11.9643 5.58325C9.89661 6.82822 8.95134 9.32788 9.67786 11.6295L10.2405 13.412C10.3076 13.6245 10.0149 13.7565 9.89996 13.5656L8.93581 11.9643C7.69084 9.89662 5.19119 8.95135 2.88953 9.67788L1.10705 10.2405C0.894566 10.3076 0.76252 10.0149 0.953392 9.89997L2.55471 8.93583C4.62244 7.69085 5.56771 5.19119 4.84118 2.88954L4.27854 1.10706Z" stroke="#BEF229" />
            </svg>
            <svg className='star4_EC' xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                <path d="M6.64259 1.7718C6.53961 1.44547 6.98907 1.24267 7.16561 1.53581L8.64634 3.99511C10.5584 7.17074 14.3974 8.62249 17.9322 7.5067L20.6697 6.64259C20.9961 6.5396 21.1989 6.98905 20.9057 7.16561L18.4464 8.64634C15.2708 10.5584 13.8191 14.3973 14.9349 17.9322L15.799 20.6697C15.902 20.9961 15.4525 21.1989 15.276 20.9057L13.7952 18.4464C11.8832 15.2708 8.04423 13.8191 4.50934 14.9349L1.77181 15.799C1.44548 15.902 1.24268 15.4525 1.53582 15.276L3.99513 13.7952C7.17075 11.8832 8.62251 8.04422 7.5067 4.50933L6.64259 1.7718Z" stroke="white" stroke-width="2" />
            </svg>
            <div className='bkbtn_ec' onClick={props.onBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z" fill="white" />
                </svg>
            </div>
            <div className='msgheading'><span>Add a special message</span></div>
            <div className='msgSubheading'><span>Add your personal touch to the activity
                before you send..</span></div>
            <div className="sendinfoDiv"><span>Guess the {selectedTopicArea}</span><span className='s2'>{textAreaValue}</span></div>
            <AddNote textareaValue={textareaValueMsg} setTextareaValue={setTextareaValueMsg} />
            <button className={`nxtbtntp`} onClick={handleForwarsActivity}><span className={`nxtbtntp-txt`}>Send</span></button>
        </div>
    )
}

export default SendPage
