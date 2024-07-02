import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

const HoverCart = () => {

    const { musicItems } = useContext(cartContext);
    
    return ( 
        <div className="my-1 text-lg flex flex-col">
            <h2 className="text-center py-1.5 text-xl">Cart Summary</h2>
            <div className="p-3 space-y-3">
                <h2 className="flex justify-between items-center">
                    <p>Total Songs</p>
                    <span>{musicItems.length} </span>
                </h2>
                <h2 className="flex justify-between items-center">
                    <p>Total Amount</p>
                    <span>R130.75</span>
                </h2>
                <div className="space-y-3 py-4">
                <Link to="/collection" className="block text-center transition-all duration-500 transform scale-95 text-[1.1rem] w-full text-gray-900 bg-gray-300 rounded-md mx-auto py-1 px-1.5 hover:bg-slate-400 hover:scale-100">
                    Open Cart
                </Link>
                <Link to="/checkout" className="block text-center transition-all duration-500 transform scale-95 text-[1.1rem] w-full text-gray-900 bg-gray-300 rounded-md mx-auto py-1 px-1.5 hover:bg-slate-400 hover:scale-100">
                    <button>CheckOut</button>
                </Link>
                </div>
            </div>
        </div>
     );
}
 
export default HoverCart;