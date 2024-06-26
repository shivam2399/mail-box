// InboxItem.js
import React from 'react';

const InboxItem = ({ mail }) => {
    return (
        <div className="mail-item">
            <h3 className="mail-subject">{mail.subject}</h3>
            <p className="mail-content" dangerouslySetInnerHTML={{ __html: mail.content }} />
            <p className="mail-sender"><strong>From:</strong> {mail.sender}</p>
        </div>
    );
};

export default InboxItem;
