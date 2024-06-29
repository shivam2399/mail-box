import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Components/Auth';
import Compose from './Components/Compose';
import Inbox from './Components/Inbox';
import Welcome from './Components/Welcome';
import MailDetail from './Components/MailDetail';
import Sent from './Components/Sent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/compose" element={<Compose />} />
                <Route path="/inbox/*" element={<Inbox />} />
                <Route path="/sent/*" element={<Sent />} />
                <Route path="/inbox/:mailId" element={<MailDetail />} />
                <Route path="/sent/:mailId" element={<MailDetail />} />
            </Routes>
        </Router>
    );
}

export default App;