import { useState, useContext } from "react";
import { useState, useContext } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";
import { cartContext } from "../context/CartContext";

const CartIitem = () => {
    const {addSongToCart, removeSongFromCart } = useContext(cartContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

     const handleCart = () => {
        if(!isInCart){
            addSongToCart(topSong);
            setIsInCart(!isInCart);
        } else {
            removeSongFromCart(topSong.songid);
            setIsInCart(!isInCart);
        };
     };
    return ( 
        <>
        <h1>hellow</h1></>
     );
}
 
export default CartIitem;