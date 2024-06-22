import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Compose.css';


const Compose = ({ senderEmail }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
  
    useEffect(() => {
      setUsername(senderEmail);
    }, [senderEmail]);

    const firebaseUrl = 'https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app'; // Replace with your Firebase Realtime Database URL
  
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };

    const encodeEmail = (email) => {
      return email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
    };
  
    const handleSendEmail = async () => {
      const emailContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  
      if (!username.trim() || !recipient.trim() || !subject.trim()) {
        alert('All fields are required');
        return;
      }

      const encodedSender = encodeEmail(username);
      const encodedRecipient = encodeEmail(recipient);
  
      const emailData = {
        sender: username,
        recipient: recipient,
        subject: subject,
        content: emailContent,
        timestamp: new Date().toISOString()
      };
  
      try {
        // Store email for sender
        await axios.post(`${firebaseUrl}/emails/sent/${encodedSender}.json`, emailData);
  
        // Store email for recipient
        await axios.post(`${firebaseUrl}/emails/inbox/${encodedRecipient}.json`, emailData);
  
        alert('Email sent successfully');
        setUsername('');
        setRecipient('');
        setSubject('');
        setEditorState(EditorState.createEmpty());
      } catch (error) {
        console.error('Error sending email: ', error);
        alert('Failed to send email');
        console.log(error);
      }
    };
  
    return (
      <div className="send-mail-container">
      <input
        type="text"
        placeholder="Your email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
    );
  };
  
  export default Compose;
  