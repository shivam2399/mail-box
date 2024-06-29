import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialMailState = {
    inbox: [],
    sent: [],
    loading: false,
    error: null
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setInbox(state, action) {
            state.inbox = action.payload;
        },
        setSent(state, action) {
            state.sent = action.payload;
        },
        updateMessageStatus(state, action) {
            const { messageId, isRead } = action.payload;
            const message = state.inbox.find(mail => mail.id === messageId);
            if(message) {
                message.isRead = isRead;
            }
        },
        deleteMailFromState(state, action) {
            state.inbox = state.inbox.filter(mail => mail.id !== action.payload)
            state.sent = state.sent.filter(mail => mail.id !== action.payload);
        }
    }
})

export const mailActions = mailSlice.actions

export const fetchInbox = (email) => async (dispatch) => {
    dispatch(mailActions.setLoading(true));
    try {
        const encodedEmail = email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
        const response = await axios.get(`https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app/users/${encodedEmail}/inbox.json`);
        const inboxData = response.data ? Object.entries(response.data).map(([id, mail]) => ({ id, ...mail })) : [];
        dispatch(mailActions.setInbox(inboxData));
    } catch (error) {
        dispatch(mailActions.setError(error.message));
    } finally {
        dispatch(mailActions.setLoading(false));
    }
};

export const fetchSent = (email) => async (dispatch) => {
    dispatch(mailActions.setLoading(true));
    try {
        const encodedEmail = email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
        const response = await axios.get(`https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app/users/${encodedEmail}/sent.json`);
        const sentData = response.data ? Object.entries(response.data).map(([id, mail]) => ({ id, ...mail })) : [];
        dispatch(mailActions.setSent(sentData));
    } catch (error) {
        dispatch(mailActions.setError(error.message));
    } finally {
        dispatch(mailActions.setLoading(false));
    }
};

export const deleteMessage = (email, messageId, folder) => async (dispatch) => {
    const encodedEmail = email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
    try {
        await axios.delete(`https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app/users/${encodedEmail}/${folder}/${messageId}.json`);
        dispatch(mailActions.deleteMailFromState(messageId));
    } catch (error) {
        dispatch(mailActions.setError(error.message));
    }
};

export const updateMessageStatus = (email, messageId, isRead) => async (dispatch) => {
    const encodedEmail = email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
    try {
        await axios.patch(`https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app/users/${encodedEmail}/inbox/${messageId}.json`, { isRead });
        dispatch(mailActions.updateMessageStatus({ messageId, isRead }));
    } catch (error) {
        dispatch(mailActions.setError(error.message));
    }
};

export default mailSlice.reducer;