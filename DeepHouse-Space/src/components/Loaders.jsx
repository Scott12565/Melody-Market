import { useEffect, useState } from "react";
import loader from "/assets/Loader/loading.gif"
const Loaders = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 600000); // 6000 milliseconds = 6 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-container ${showLoader ? 'visible' : 'hidden'} absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-300`}>
      <img src={loader} alt="Loading..." className="" />
    </div>
  );
};

export default Loaders;
