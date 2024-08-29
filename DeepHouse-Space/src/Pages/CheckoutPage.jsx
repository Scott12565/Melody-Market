import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loaders";
import { Helmet } from "react-helmet-async";
import { IoCloseOutline } from "react-icons/io5";
import { cartContext } from "../context/CartContext";

const Checkout = () => {
    const { selectedSong } = useContext(cartContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    console.log(selectedSong)
    useEffect(() => {
        if (!selectedSong || selectedSong.length === 0) {
            console.log(selectedSong)
            // history.push('/'); // Redirect if no songs are selected
        }
    }, [selectedSong, history]);

    const handleProceedToPay = async () => {
        // setLoading(true);
        try {
            // Implement logic to redirect to PayGate checkout form here.
            // Example: Redirect to PayGate with necessary parameters.
            const redirectUrl = `https://google.com`;
            window.location.href = redirectUrl;
            // Redirect to PayGate checkout page or open it in a new tab
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to proceed with payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        history.push('/'); // Redirect to home page
    };

    return (
        <>
            <Helmet>
                <title>DeepHouse Space - Confirm Purchase</title>
                <meta name="description" content="Review your selected songs before proceeding to payment." />
            </Helmet>
    
            <div className="flex flex-col fixed top-20 left-0 z-[110] bg-gray-800 opacity-95 w-full h-screen overflow-y-hidden overscroll-y-none">
                <div className="form-group bg-black shadow-lg rounded-2xl w-[95%] mt-12 mx-auto md:w-[65%] lg:w-[35%] md:mt-14 lg:mt-24">
                    <div className="flex justify-between items-center px-6 py-3">
                        <h1 className="text-2xl font-semibold text-gray-300">Confirm Your Purchase</h1>
                        <IoCloseOutline size={30} onClick={handleCancel} className="text-white cursor-pointer" />
                    </div>
                    <div className="form-control w-[90%] mx-auto my-3 mb-0 px-4 py-3 pb-1">
                        {errorMessage && (
                            <div className="text-red-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">
                                {errorMessage}
                            </div>
                        )}

                        <h2 className="text-lg font-semibold text-gray-300 mb-4">Selected Songs</h2>
                        <ul className="list-disc pl-5 mb-4">
                            
                                <li className="text-gray-300 mb-2">
                                    {selectedSong?.SongTitle} - ${selectedSong?.Price}
                                </li>
                        </ul>

                        <button 
                            onClick={handleProceedToPay}
                            className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 font-semibold mt-4"
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
