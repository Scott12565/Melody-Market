import { useContext } from "react";
import { SongContext } from "../../context/songContext";
import { cartContext } from "../../context/CartContext"; // Change to CartContext

const CartPage = () => {
    const { allSongs } = useContext(SongContext);
    const { addSongToCart } = useContext(cartContext); // Change to CartContext

    return ( 
        <div>
            <h3>this is a cart page... coming soon.</h3>
            <button onClick={() => addSongToCart(allSongs) } className="bg-blue-200">add to cart</button>
        </div>
     );
}
 
export default CartPage;
