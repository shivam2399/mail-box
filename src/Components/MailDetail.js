import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInbox, updateMessageStatus } from '../Store/mail';
import './MailDetail.css';

const MailDetail = () => {
    const { mailId } = useParams();
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const inbox = useSelector(state => state.mail.inbox);
    const [mail, setMail] = useState(null, mailId);

    useEffect(() => {
        if(email) {
            dispatch(fetchInbox(email))
        }
    }, [dispatch])

    useEffect(() => {
        const selectedMail = inbox.find(m => m.id === mailId);
        if (selectedMail) {
            setMail(selectedMail);
            if (!selectedMail.isRead) {
                dispatch(updateMessageStatus(email, mailId, true));
            }
        }
    }, [inbox, mailId, dispatch, email]);

    if (!mail) {
        return <p>Loading...</p>;
    }


  return (
    <div className="detailed-mail-container">
            <h2>{mail.subject}</h2>
            <p><strong>From:</strong> {mail.sender}</p>
            <p><strong>To:</strong> {mail.recipient}</p>
            <p><strong>Sent:</strong> {new Date(mail.timestamp).toLocaleString()}</p>
            <div className="mail-content" dangerouslySetInnerHTML={{ __html: mail.content }}></div>
        </div>
  )
}

export default MailDetail