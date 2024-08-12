import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./firebaseContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const checkPurchaseContext = createContext();

const CheckPurchaseProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    const [purchasedSongs, setPurchasedSongs] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const fetchPurchasedSongs = async () => {
                const userDocRef = doc(db, `users/${currentUser.uid}`);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setPurchasedSongs(userData.purchasedSongs || []);
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                }
            };

            fetchPurchasedSongs();
        }
    }, [currentUser]);

    const checkPurchase = (songid) => {
        return purchasedSongs.includes(songid);
    };

    const purchaseSong = async (songid) => {
            const docRef = doc(db, `users/${currentUser.uid}`);
            try {
                await updateDoc(docRef, {
                    purchasedSongs: arrayUnion(songid)
                });
                setPurchasedSongs(prev => [...prev, songid]);
                alert('Song purchased successfully');
            } catch (err) {
                console.log(err.message);
            }
        }

    return (
        <checkPurchaseContext.Provider value={{ checkPurchase, purchaseSong }}>
            {children}
        </checkPurchaseContext.Provider>
    );
}

export default CheckPurchaseProvider;
