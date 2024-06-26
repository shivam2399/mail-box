import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Compose.css';
import { useSelector } from 'react-redux';


const Compose = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const email = useSelector(state => state.auth.email)
  
    

    const firebaseUrl = 'https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app';
  
    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    };

    const encodeEmail = (email) => {
      return email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
    };
  
    const handleSendEmail = async () => {
      const emailContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  
      if ( !recipient.trim() || !subject.trim()) {
        alert('All fields are required');
        return;
      }

      const encodedSender = encodeEmail(email);
      const encodedRecipient = encodeEmail(recipient);
  
      const emailData = {
        sender: email,
        recipient: recipient,
        subject: subject,
        content: emailContent,
        timestamp: new Date().toISOString()
      };
  
      try {
        
        await axios.post(`${firebaseUrl}/users/${encodedSender}/sent.json`, emailData);
        await axios.post(`${firebaseUrl}/users/${encodedRecipient}/inbox.json`, emailData);
  
        alert('Email sent successfully');
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
          value={email}
          disabled
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
  