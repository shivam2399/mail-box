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
        setError(state, action) {
            state.error = action.payload;
        },
        setInbox(state, action) {
            state.inbox = action.payload;
        },
        setSent(state, action) {
            state.sent = action.payload;
        }
    }
})

export const mailActions = mailSlice.actions

export const fetchInbox = (email) => async (dispatch) => {
    dispatch(mailActions.setLoading(true));
    try {
        const encodedEmail = email.replace(/@/g, '_at_').replace(/\./g, '_dot_');
        const response = await axios.get(`https://mail-box-c01ff-default-rtdb.asia-southeast1.firebasedatabase.app/users/${encodedEmail}/inbox.json`);
        const inboxData = response.data ? Object.values(response.data) : [];
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
        const sentData = response.data ? Object.values(response.data) : [];
        dispatch(mailActions.setSent(sentData));
    } catch (error) {
        dispatch(mailActions.setError(error.message));
    } finally {
        dispatch(mailActions.setLoading(false));
    }
};

export default mailSlice.reducer;