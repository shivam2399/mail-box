import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../Store/mail";
import InboxItem from "./InboxItem";
import './Inbox.css'
import { Link, Routes, Route } from "react-router-dom";
import MailDetail from "./MailDetail";

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

    const unreadCount = inbox.filter(mail => !mail.isRead).length;

    return (
        <div className="inbox-container">
            <div className="inbox-header">
                <h2>Inbox ({unreadCount} unread)</h2>
                <Link to="/compose">
                    <button className="compose-button">Compose</button>
                </Link>
            </div>
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
            <ul className="mail-list">
                {inbox.map((mail, index) => (
                    <InboxItem key={index} mail={mail} />
                ))}
            </ul>

            <Routes>
                <Route path="/mail/:mailId" element={<MailDetail />} />
            </Routes>
        </div>
    );
};

export default Inbox;