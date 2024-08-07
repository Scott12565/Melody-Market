import { useEffect, useState } from "react";
import loader from "/assets/Loader/loading.gif"
const Loaders = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 80000);
    return () => clearTimeout(timer);
    
  }, [showLoader]);

  return (
    <div className={`loader-container ${showLoader ? 'visible' : 'hidden'} absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300`}>
      <img src={loader} alt="Loading..." className={`${showLoader ? 'visible' : 'hidden'}`} />
    </div>
  );
};

export default Loaders;
