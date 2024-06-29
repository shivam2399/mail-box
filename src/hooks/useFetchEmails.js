import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox, fetchSent } from "../Store/mail";

const useFetchEmails = (email) => {
    const dispatch = useDispatch();
    const inbox = useSelector(state => state.mail.inbox);
    const sent = useSelector(state => state.mail.sent);
    const loading = useSelector(state => state.mail.loading);
    const error = useSelector(state => state.mail.error);

    useEffect(() => {
        if (email) {
            dispatch(fetchInbox(email));
            dispatch(fetchSent(email));

            const intervalId = setInterval(() => {
                dispatch(fetchInbox(email));
            }, 2000);

            return () => clearInterval(intervalId); // Clean up on unmount
        }
    }, [dispatch, email]);

    return { inbox, sent, loading, error };
};

export default useFetchEmails;
