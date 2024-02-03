// store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import rootReducer from './reducers'; // Import your combined reducers
import songSaga from "../hooks/songSaga"; // Import your saga
import songReducer from "../hooks/songSlice";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { songs: songReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songSaga);

export default store;
