import { signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { fireAuth } from "../../firebase";
import { useAuthContext } from "./useAuthContext";

export const useSignIn = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signIn = async(email, password) => {
        setIsPending(true);
        try {
            const res = await signInWithEmailAndPassword(fireAuth, email, password);
            dispatch({
                type: "LOGIN",
                payload: res.user,
            });

            if (!res) {
                throw new Error("An error occured");
            }
            setIsPending(false);
        } catch (error) {
            setIsPending(false);
            console.log(error.message);
            switch (error.message) {
                case "Firebase: Error (auth/network-request-failed).":
                    return setError("Connection failure");
                case "Firebase: Error (auth/email-already-in-use).":
                    return setError("Email already in use");
                case "Firebase: Error (auth/wrong-password).":
                    return setError("wrong email/password");
                case "Firebase: Error (auth/invalid-email).":
                    return setError("wrong email/password");
                case "Firebase: Password should be at least 6 characters (auth/weak-password)":
                    return setError("Password should be at least 6 characters");
                case "Firebase: Error (auth/user-not-found).":
                    return setError("User not found, please input a correct Email/password");
                default:
                    return setError("An error occurred");
            }
        }
    };
    return { signIn, isPending, error };
};