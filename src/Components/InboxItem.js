import React from 'react';
import { Link } from 'react-router-dom';
import './InboxItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessageStatus } from '../Store/mail';

const InboxItem = ({ mail }) => {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);

    const handleItemClick = () => {
        if (!mail.isRead) {
            dispatch(updateMessageStatus(email, mail.id, true));
        }
    };

    return (
        <li className={`mail-item ${mail.isRead ? '' : 'unread'}`} onClick={handleItemClick}>
            <Link to={`/mail/${mail.id}`} className="mail-link">
                {!mail.isRead && <span className="unread-dot"></span>}
                <div className="mail-details">
                    <p className="mail-subject">{mail.subject}</p>
                    <p className="mail-sender">{mail.sender}</p>
                </div>
            </Link>
        </li>
    );
};

export default InboxItem;