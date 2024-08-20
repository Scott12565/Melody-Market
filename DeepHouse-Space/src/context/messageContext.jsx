import { createContext, useState } from "react";

export const messageContext = createContext();

const MessageProvider = ({children}) => {
    const [message, setMessage] = useState({
        type: '',
        text: ''
    });

    const displayMessage = (type, text) => {
        setMessage({type, text});
        console.log('this are the messages', type, text)
        setTimeout(() => {
            setMessage({
                type: '',
                text: ''
            })
        }, 5000);
    }

    return ( 
        <messageContext.Provider value={{ displayMessage, message }} >
            {children}
        </messageContext.Provider>
     );
}
 
export default MessageProvider;