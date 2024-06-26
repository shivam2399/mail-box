// Inbox.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../Store/mail";
import InboxItem from "./InboxItem";
import './Inbox.css'

const Inbox = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const inbox = useSelector(state => state.mail.inbox);
    const loading = useSelector(state => state.mail.loading);
    const error = useSelector(state => state.mail.error);

    useEffect(() => {
        if (email) {
            dispatch(fetchInbox(email));
        }
    }, [dispatch, email]);

    return (
        <div className="inbox-container">
            <h2>Inbox</h2>
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
            <ul className="mail-list">
                {inbox.map((mail, index) => (
                    <InboxItem key={index} mail={mail} />
                ))}
            </ul>
        </div>
    );
};

export default Inbox;
