import { useContext } from "react";
import { AuthContext } from "../component/context/autthProvider";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("authCOntext must be in an Auth Provider");
    }
    return context;
};