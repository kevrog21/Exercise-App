import { useNavigate } from "react-router-dom";

export function useNavigateToLink() {
    const navigate = useNavigate()

    const sendToCustomLink = (path) => {
        navigate(path)
    }

    return sendToCustomLink
}