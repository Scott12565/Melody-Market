import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [musicItems, setMusicItems] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const collectionRef = collection(db, `users/${userId}/songCollection`);
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                const songItems = snapshot.docs.map((songDoc) => {
                    return {
                        id: songDoc.id,
                        ...songDoc.data().song
                    }
                });
                setMusicItems(songItems);
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser?.uid]);

    return (
        <cartContext.Provider value={{ musicItems}}>
            {children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;
