import { createContext, useContext, useState } from "react";
import { AuthContext } from "./firebaseContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const checkPurchaseContext = createContext();

const CheckPurchaseProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    const [hasPurchased, setHasPurchased] = useState(false);

    const checkPurchase = async (songid) => {

        if (currentUser) {
            const userDocRef = doc(db, `users/${currentUser.uid}`);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log(userData)
                    const purchasedSongs = userData.purchasedSongs || [];
                    setHasPurchased(purchasedSongs.includes(songid)); // Check purchase or if song is free
                }
            } catch (error) {
                console.error("Error fetching user document:", error);
            }
        }
    };

    return ( 
        <checkPurchaseContext.Provider value={{ hasPurchased, checkPurchase }}>
            {children}
        </checkPurchaseContext.Provider>
     );
}
 
export default CheckPurchaseProvider;