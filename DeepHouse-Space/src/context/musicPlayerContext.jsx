import { createContext, useState, useContext } from "react";

export const musicPlayerContext = createContext();

const MusicPlayerContextProvider = ({ children }) => {
  const [playingSongId, setPlayingSongId] = useState(false);

  const playPause = (songId) => {
    if(playingSongId === songId){
      setPlayingSongId(null);
    } else {
      setPlayingSongId(songId);
    }
  };

  return (
    <musicPlayerContext.Provider value={{ playingSongId, playPause }}>
      {children}
    </musicPlayerContext.Provider>
  );
};

export default MusicPlayerContextProvider;
