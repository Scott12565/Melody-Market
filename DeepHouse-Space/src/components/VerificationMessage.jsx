import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Assuming you're importing your auth object here

const VerificationMessage = ({ user }) => {
    const [emailSent, setEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleResendEmail = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                setEmailSent(true); // Set state to show the email was sent successfully
                setErrorMessage('');
            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to send verification email. Please try again.");
            }
        }
    };

    return (
        <div className="verification-message-container text-center text-gray-300">
            <p>Please verify your email address by checking your inbox for the verification email.</p>
            {emailSent && (
                <p className="text-green-500">Verification email has been resent. Please check your inbox.</p>
            )}
            {errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
            )}
            <button 
                className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 mt-2"
                onClick={handleResendEmail}
            >
                Resend Verification Email
            </button>
        </div>
    );
};

export default VerificationMessage;
