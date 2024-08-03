// import { useContext, useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebase";
// import { AuthContext } from "../context/firebaseContext";
// import { doc, getDoc } from "firebase/firestore";

// const UserPurchase = () => {
//     const { currentUser } = useContext(AuthContext);
//     const [hasPurchased, setHasPurchased] = useState(false);

    
//        const hasPurchased = async (songId) => {
//         if(!currentUser) return false;

//         const userId = currentUser?.uid;
//         const userDocRef = doc(db, `users/${userId}`);

//         try {
//             const userDoc = await getDoc(userDocRef);
//             if(userDoc.exists()){
//                 const userData = userDoc.data();
//                 const purchasedSong = userData.PurchasedSongs || [];
//                 setHasPurchased(purchasedSong.includes(songId));
//             }
//         } catch (err) {
//             console.log('error fetching document', err.message);
//         }
//        }
//        hasPurchased('KFmvhtZP3vaNACWNuUm8')
       

//     return (
//         <div>
//             {hasPurchased ? (
//                 <p>You have purchased this song!</p>
//             ) : (
//                 <p>You have not purchased this song.</p>
//             )}
//         </div>
//     );
// }

// export default UserPurchase;
