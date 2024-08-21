import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, applyActionCode } from "firebase/auth";
import Loader from "../components/Loaders";

const EmailVerification = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyEmail = async () => {
            const auth = getAuth();
            const urlParams = new URLSearchParams(window.location.search);
            const oobCode = urlParams.get('oobCode');

            if (oobCode) {
                try {
                    await applyActionCode(auth, oobCode);
                    setLoading(false);
                    // Optionally, redirect to sign-in page
                    history.push('/signin');
                } catch (error) {
                    console.error("Error verifying email:", error);
                    setLoading(false);
                    // Handle errors or redirect to an error page
                }
            }
        };

        verifyEmail();
    }, [history]);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? <Loader /> : <p className="text-gray-300">Your email has been verified. Redirecting...</p>}
        </div>
    );
};

export default EmailVerification;
