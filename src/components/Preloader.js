import React, { useEffect, useState } from 'react';
import '../App.css'; 

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [displayedText, setDisplayedText] = useState('');
    
    const text = `
    Launch Sequence Initiated...
    Systems Check:
    - Communication: OK
    - Navigation: OK
    - Propulsion: OK
    - Fuel Levels: Full
    ---
    Preparing Ignition...
    Countdown: 10... 9... 8... 7...
    ---
    Ignition Sequence Start
    Launch in Progress
    Finalizing Coordinates
    Engaging Thrusters
    ---

    🚀 Rocket Launched Successfully
    `;

    useEffect(() => {
        const totalDuration = 3500; // 3.5 seconds
        const typingSpeed = text.length / totalDuration; // Characters per millisecond
        let index = 0;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(prevText => prevText + text[index]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setLoading(false);
                }, 1500); // Additional 1-second delay
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    return (
        loading ? (
            <div className="preloader">
                <div className="logo-container">
                    <img src="/icons/nazarx-transformed.png" alt="Logo" className="pulsing-logo"/>
                </div>
                <div className="console">
                    <div className="console-text">
                        {displayedText}
                    </div>
                </div>
            </div>
        ) : (
            <div>Main content goes here...</div>
        )
    );
};

export default Preloader;
