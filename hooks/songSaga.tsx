import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  getSongsSuccess,
  setSongs,
  addSong,
  updateSong,
  deleteSong,
} from "./songSlice";

const apiUrl = 'https://backend-ipfr.onrender.com/api/';

interface ApiResponse<T> {
  data: T;
}

interface AddSongAction {
  type: string;
  payload: { type: string; payload: any }; // Update this based on your actual action type
}

function* fetchSongsFromApi(): Generator<any, any, AxiosResponse<ApiResponse<any>>> {
  try {
    const response: AxiosResponse<ApiResponse<any>> = yield call(() => axios.get(apiUrl));
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
}

function* addSongToApi(action: AddSongAction): Generator<any, any, AxiosResponse<ApiResponse<any>>> {
  try {
    const response: AxiosResponse<ApiResponse<any>> = yield call(() => axios.post(apiUrl, action.payload.payload));
    return response.data;
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
}

function* updateSongInApi(action: AddSongAction): Generator<any, any, AxiosResponse<ApiResponse<any>>> {
  try {
    const { id, updatedSong } = action.payload.payload;
    const response: AxiosResponse<ApiResponse<any>> = yield call(() => axios.put(`${apiUrl}/${id}`, updatedSong));
    return response.data;
  } catch (error) {
    console.error("Error updating song:", error);
    throw error;
  }
}

function* deleteSongFromApi(action: AddSongAction): Generator<any, any, AxiosResponse<ApiResponse<any>>> {
  try {
    const { id } = action.payload.payload;
    const response: AxiosResponse<ApiResponse<any>> = yield call(() => axios.delete(`${apiUrl}/${id}`));
    return response.data;
  } catch (error) {
    console.error("Error deleting song:", error);
    throw error;
  }
}

function* workGetSongsFetch(): Generator<any, void, any> {
  try {
    const formattedSongsShortened = yield fetchSongsFromApi();
    yield put(getSongsSuccess(formattedSongsShortened));
  } catch (error) {
    console.log(error);
  }
}

function* addSongAsync(action: AddSongAction): Generator<any, void, any> {
  try {
    const addedSong = yield addSongToApi(action);
    yield put(addSong(addedSong));
  } catch (error) {
    console.log(error);
  }
}

function* updateSongAsync(action: AddSongAction): Generator<any, void, any> {
  try {
    const updatedSong = yield updateSongInApi(action);
    yield put(updateSong(updatedSong));
  } catch (error) {
    console.log(error);
  }
}

function* deleteSongAsync(action: AddSongAction): Generator<any, void, any> {
  try {
    yield deleteSongFromApi(action);
    yield put(deleteSong(action.payload.payload));
  } catch (error) {
    console.log(error);
  }
}

function* songSaga() {
  yield takeEvery("songs/getSongsFetch", workGetSongsFetch);
  yield takeLatest("songs/addSong", addSongAsync);
  yield takeLatest("songs/updateSong", updateSongAsync);
  yield takeLatest("songs/deleteSong", deleteSongAsync);
}

export default songSaga;
