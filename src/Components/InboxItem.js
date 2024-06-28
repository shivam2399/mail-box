import React from 'react';
import { Link } from 'react-router-dom';
import './InboxItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessageStatus, deleteMessage } from '../Store/mail';

const InboxItem = ({ mail }) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);

    const handleItemClick = () => {
        if (!mail.isRead) {
            dispatch(updateMessageStatus(email, mail.id, true));
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteMessage(email, mail.id));
    }

    return (
        <li className={`mail-item ${mail.isRead ? '' : 'unread'}`} onClick={handleItemClick}>
            <Link to={`/mail/${mail.id}`} className="mail-link">
                {!mail.isRead && <span className="unread-dot"></span>}
                <div className="mail-details">
                    <p className="mail-subject">{mail.subject}</p>
                    <p className="mail-sender">{mail.sender}</p>
                </div>
            </Link>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default InboxItem;