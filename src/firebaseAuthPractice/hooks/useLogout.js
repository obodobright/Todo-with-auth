import { fireAuth } from "../../firebase";
import { useAuthContext } from "./useAuthContext";
export const useSignOut = () => {
    const { dispatch } = useAuthContext();
    const signOut = async() => {
        await fireAuth.signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
    };
    return { signOut };
};