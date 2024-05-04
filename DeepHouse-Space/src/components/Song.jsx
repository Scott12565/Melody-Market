const Song = ({ song }) => {
    console.log(song)
    return ( 
        <div className="song-card flex flex-col w-52 mx-auto my-5 shadow-2xl shadow-transparent rounded-lg bg-gray-700 pt-3 ">

            <div className="song-img w-[95%] mx-auto rounded-lg">
                <img src={song?.ImgUrl} alt={`song ${song?.songid}`} className="h-fullbg-orange-400 rounded-lg" />
            </div>

            <div className="card-body w-[95%] my-2 py-1.5 px-1.5 text-lg mx-auto">
                <h1 className="text-lg px-1 text-gray-300 font-200">
                    {song?.SongTitle}
                </h1>
                <h2 className="text-lg px-1 text-gray-300 font-200">By: {song?.Artist}</h2>
                <h3 className="text-lg px-1.5 text-gray-300 font-200">
                    {song?.Genre}
                </h3>
                <span className="text-sm px-1 text-gray-300 font-200">
                    {song?.releaseDate}
                </span>
            </div>
        </div>
     );
}
 
export default Song;