import React from "react";
import { useSelector } from "react-redux";
import InboxItem from "./InboxItem";
import './Inbox.css'
import { Link, Routes, Route } from "react-router-dom";
import MailDetail from "./MailDetail";
import useFetchEmails from "../hooks/useFetchEmails"


const Inbox = () => {
    const email = useSelector(state => state.auth.email);
    const { inbox, loading } = useFetchEmails(email)


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
            <ul className="mail-list">
                {inbox.map((mail, index) => (
                    <InboxItem key={index} mail={mail} folder="inbox" />
                ))}
            </ul>

            <Routes>
                <Route path=":mailId" element={<MailDetail />} />
            </Routes>
        </div>
    );
};

export default Inbox;