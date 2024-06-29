import React from "react";
import { useSelector } from "react-redux";
import InboxItem from "./InboxItem";
import './Inbox.css';
import { Link, Routes, Route } from "react-router-dom";
import MailDetail from "./MailDetail";
import useFetchEmails from "../hooks/useFetchEmails";

const Sent = () => {
    const email = useSelector(state => state.auth.email);
    const { sent, loading } = useFetchEmails(email);


    return (
        <div className="inbox-container">
            <div className="inbox-header">
                <h2>Sent Items</h2>
                <Link to="/compose">
                    <button className="compose-button">Compose</button>
                </Link>
            </div>
            {loading && <p className="loading-text">Loading...</p>}
            <ul className="mail-list">
                {sent.map((mail, index) => (
                    <InboxItem key={index} mail={mail} folder="sent" />
                ))}
            </ul>

            <Routes>
                <Route path=":mailId" element={<MailDetail />} />
            </Routes>
        </div>
    );
};

export default Sent;
