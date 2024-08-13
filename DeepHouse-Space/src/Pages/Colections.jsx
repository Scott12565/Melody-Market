import { Helmet } from "react-helmet-async";
import { cartContext } from "../context/CartContext";
import CartPage from "./cart/CartPage";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
    const { musicItems } = useContext(cartContext);
    return ( 
        <>
            <Helmet >
            <title>DeepHouse Space - Collections</title>
                <meta name="description" content="Explore and manage your music collections with ease. Find your favorite tracks and albums in one place on DeepHouse Space." />
                <meta name="keywords" content="deep house, music collections, manage music, favorite tracks, music albums" />
                <meta property="og:title" content="DeepHouse Space - Collections" />
                <meta property="og:description" content="Explore and manage your music collections with ease. Find your favorite tracks and albums in one place on DeepHouse Space." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deephousespace.web.app/collections" />
                
            </Helmet>
            <div>
                <div className="text-gray-300 text-lg font-medium my-1 mx-4 p-2 md:my-9 flex justify-between items-center md:text-xl lg:my-5 lg:mx-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl">Collction Cart</h3>
                    <Link to="/checkout" className="transition-all duration-300 transform scale-95 text-lg text-gray-900 bg-gray-300 rounded-md py-1.5 px-2 hover:bg-slate-400 hover:scale-100 md:text-[1.4rem]">
                        <button>CheckOut</button>
                    </Link>
                </div>
                <div className="flex flex-col justify-start items-start w-[100%] mx-auto py-1.5 gap-y-5 border-l lg:border-none">
                   {
                musicItems.map((song, index) => (
                    <CartPage key={song.songid} song={song} index={index} />
                ))
            } 
                </div>
                
            </div>
            
        </>
     );
}
 
export default Collections;