import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSent } from "../Store/mail";
import InboxItem from "./InboxItem";
import './Inbox.css';
import { Link, Routes, Route } from "react-router-dom";
import MailDetail from "./MailDetail";

const Sent = () => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const sent = useSelector(state => state.mail.sent);
    const loading = useSelector(state => state.mail.loading);

    useEffect(() => {
        if (email) {
            dispatch(fetchSent(email));
        }
    }, [dispatch, email]);

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
