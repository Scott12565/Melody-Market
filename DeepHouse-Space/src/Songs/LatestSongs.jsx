import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SongContext } from "../context/songContext";
import { LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

const LatestSongs = () => {
    const { latestSongs } = useContext(SongContext);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % latestSongs.length);
        }, 70000); // Slide every 10 seconds

        return () => clearInterval(slideInterval); // Clean up on unmount
    }, [latestSongs]);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % latestSongs.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + latestSongs.length) % latestSongs.length);
    };

    return ( 
        <>
            <Helmet>
                <title>DeepHouse Space - Latest Songs</title>
                <meta name="description" content="Get our latest deep house track now. It's simple and fast!" />
                <meta name="keywords" content="latest deep house tracks, new deep house releases, fresh deep house music, deephouse space new music" />
                <meta property="og:title" content="DeepHouse Space - Latest Songs" />
                <meta property="og:description" content="Get our latest deep house track now. It's simple and fast!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deephousespace.web.app/latest" />
            </Helmet>
            <div className="my-1">
                <div className="flex justify-between py-9 px-7">
                    <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                    <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                        see all
                    </Link>
                </div>

                <div className="h-[320px] relative group overflow-hidden">
                    <div className="absolute top-0 left-0 opacity-40 bg-slate-400 h-full w-full flex justify-center items-center space-x-6 text-xl bg-gray-900 text-black z-10 transition-transform ease-in-out duration-500 scale-0 group-hover:scale-100 cursor-pointer">
                        <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                            <LuPlay size={35} />
                        </h3>
                        <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                            <RiPlayListLine size={35} />
                        </h3>
                        <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                            <BsCart3 size={35} />
                        </h3>
                    </div>
                    <div className="buttons absolute bottom-4 z-30 space-y-1.5 mx-2">
                        <button onClick={handlePrev} className="prev-btn p-1 bg-yellow-300 text-gray-900 opacity-80 rounded-full hover:bg-yellow-400 transition-transform duration-1000 delay-100 ease-in-out hover:scale-105">
                            <GrFormPreviousLink size={30} />
                        </button>
                        <button onClick={handleNext} className="next-btn p-1 bg-gray-400 text-gray-300 opacity-80 rounded-fullp-1 bg-yellow-300 text-gray-900 opacity-80 rounded-full hover:bg-yellow-400 transition-transform duration-1000 ease-in-out hover:scale-105">
                            <GrFormNextLink size={30} />
                        </button>
                    </div>
                    {
                        latestSongs?.map((song, index) => (
                            <div key={song.songid} className={`w-full h-full bg-blue-700 absolute transition-all duration-500 ease-in-out transform ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}`}>
                                <div className="text-gray-300 text-xl text-center absolute top-0 left-0 w-full h-full" style={{ 
                                    backgroundImage: `url(${song.ImgUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}>
                                    <p>{song.SongTitle} by {song.Artist}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default LatestSongs;
