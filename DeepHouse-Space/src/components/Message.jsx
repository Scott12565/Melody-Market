import { useContext, useEffect, useState } from "react";
import { messageContext } from "../context/messageContext";

const Messages = () => {
    const { message } = useContext(messageContext);
    const [isVisible, setIsVisible] = useState(false);

    // Show message when it updates and hide after a delay
    useEffect(() => {
        if (message.text) {
            setIsVisible(true);
            // Hide the message after 5 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message.text) return null;

    return (
        <div
            style={{
                position: "sticky",
                top: "0px", // Sticks to the top of the page
                zIndex: 1000,
                backgroundColor: message.type === 'error' ? "red" : "green",
                width: "95%",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
                margin: "0 auto",
                transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out", // Smooth transition
                transform: isVisible ? "translateY(0)" : "translateY(-100%)", // Slide in/out vertically
                opacity: isVisible ? 1 : 0, // Fade in/out effect
            }}
        >
            <p>{message.text}</p>
        </div>
    );
};

export default Messages;
