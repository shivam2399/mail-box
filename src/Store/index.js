import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './auth'
import mailReducer from './mail'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'mail']
}

const rootReducer = combineReducers({
    auth: authReducer,
    mail: mailReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store)

export { store, persistor };