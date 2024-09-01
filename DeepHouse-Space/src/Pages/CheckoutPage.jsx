import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { IoCloseOutline } from "react-icons/io5";
import { cartContext } from "../context/CartContext";
import { formatCurrency } from "../utils/currencyformater";
import Loader from "../components/Loaders";
import { auth } from "../firebase/firebase";

const Checkout = () => {
    const { selectedSong, musicItems, setSelectedSong } = useContext(cartContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (!selectedSong && musicItems.length === 0) {
            history.push('/');
        }
    }, [selectedSong, musicItems, history]);

    const handleProceedToPay = () => {
        setLoading(true);
        try {
            const amount = selectedSong ? selectedSong.Price : musicItems.reduce((acc, item) => acc + item.Price, 0);
            const reference = `REF-${Date.now()}`;
            const userEmail = auth.currentUser.email;

            const merchantId = '10000100'; // Provided Merchant ID
            const merchantKey = '46f0cd694581a'; // Provided Merchant Key

            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://sandbox.payfast.co.za/eng/process'; // Sandbox URL

            const fields = [
                { name: 'merchant_id', value: merchantId },
                { name: 'merchant_key', value: merchantKey },
                { name: 'amount', value: amount.toFixed(2) },
                { name: 'reference', value: reference },
                { name: 'email', value: userEmail },
                { name: 'item_name', value: selectedSong ? selectedSong.SongTitle : 'Music Purchase' },
                { name: 'return_url', value: 'http://localhost:3000/return' }, // Redirect after payment
                { name: 'cancel_url', value: 'http://localhost:3000/cancel' }, // Redirect after cancellation
            ];

            fields.forEach(field => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = field.name;
                input.value = field.value;
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            console.error("Error initiating payment:", error);
            setErrorMessage("Failed to proceed with payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (selectedSong) {
            setSelectedSong(null);
        }
        history.push('/');
    };

    return (
        <>
            <Helmet>
                <title>DeepHouse Space - Confirm Purchase</title>
                <meta name="description" content="Review your selected songs before proceeding to payment." />
            </Helmet>

            <div className="fixed top-20 left-0 z-[110] bg-gray-800 opacity-95 w-full h-screen overflow-y-hidden overscroll-y-none">
                <div className="w-[95%] mt-12 mx-auto md:w-[80%] lg:w-[60%] bg-black shadow-lg rounded-lg p-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-300">Confirm Your Purchase</h1>
                        <IoCloseOutline size={30} onClick={handleCancel} className="text-white cursor-pointer" />
                    </div>

                    {errorMessage && (
                        <div className="text-red-400 text-sm py-2">
                            {errorMessage}
                        </div>
                    )}

                    <h2 className="text-lg font-semibold text-gray-300 mt-4">Selected Songs</h2>
                    <ul className="space-y-4 my-4">
                        {selectedSong ? (
                            <div className="flex justify-between items-center bg-blue-20 p-4 text-gray-300 border-b transition-all transform hover:scale-100">
                                <img src={selectedSong?.ImgUrl} alt={`Cover of ${selectedSong?.SongTitle}`} className="w-[80px] h-[80px] rounded-sm" />
                                <div className="flex-1 ml-4">
                                    <h3 className="text-lg">{selectedSong?.SongTitle}</h3>
                                    <p className="text-sm text-gray-400">{selectedSong?.Artist}</p>
                                </div>
                                <div className="text-lg">
                                    {formatCurrency(selectedSong?.Price)}
                                </div>
                            </div>
                        ) : (
                            musicItems.map((song) => (
                                <div key={song.id} className="flex justify-between items-center bg-blue-20 p-4 text-gray-300 border-b transition-all transform hover:scale-100">
                                    <img src={song?.ImgUrl} alt={`Cover of ${song?.SongTitle}`} className="w-[80px] h-[80px] rounded-sm" />
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg">{song?.SongTitle}</h3>
                                        <p className="text-sm text-gray-400">{song?.Artist}</p>
                                    </div>
                                    <div className="text-lg">
                                        {formatCurrency(song?.Price)}
                                    </div>
                                </div>
                            ))
                        )}
                    </ul>

                    <button 
                        onClick={handleProceedToPay}
                        className="w-full bg-yellow-500 text-black p-3 rounded-md font-semibold mt-4 hover:bg-yellow-600"
                    >
                        {loading ? <Loader /> : "Proceed to Pay"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Checkout;
