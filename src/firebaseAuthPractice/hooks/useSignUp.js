import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { fireAuth } from "../../firebase";
import React, { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const signUp = async(email, password, username) => {
        setIsPending(true);
        try {
            const res = await createUserWithEmailAndPassword(fireAuth, email, password);
            console.log(res.user);
            if (!res) {
                throw new Error("An erro occurred");
            }
            updateProfile(res.user, { displayName: username });
            dispatch({
                type: "SIGNIN",
                payload: res.user,
            });

            setIsPending(false);
        } catch (error) {
            setIsPending(false);
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
                default:
                    return setError("An error occurred");
            }
        }
    };
    return { signUp, isPending, error };
};