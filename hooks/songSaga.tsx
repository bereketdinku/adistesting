import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getSongsSuccess,
  setSongs,
  addSong,
  updateSong,
  deleteSong,
} from "./songSlice";

function* workGetSongsFetch(): Generator<any, void, any> {
  try {
    const songs = yield call(() => fetch("")); // Replace with your actual API call
    const formattedSongs = yield songs.json();
    const formattedSongsShortened = formattedSongs.slice(0, 10);
    yield put(getSongsSuccess(formattedSongsShortened));
  } catch (error) {
    //   yield put(getSongsFailure(error));
  }
}
function* fetchSongsAsync(): Generator<any, void, any> {
  try {
    const response = yield call(() => fetch(""));
    yield put(setSongs(response.data));
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

function* addSongAsync(action: { payload: any }): Generator<any, void, any> {
  try {
    const response = yield call(() => fetch(""));
    yield put(addSong(response.data));
  } catch (error) {
    console.error("Error adding song:", error);
  }
}

function* updateSongAsync(action: { payload: any }): Generator<any, void, any> {
  try {
    const response = yield call(() => fetch(""));
    yield put(updateSong(response.data));
  } catch (error) {
    console.error("Error updating song:", error);
  }
}

function* deleteSongAsync(action: { payload: any }): Generator<any, void, any> {
  try {
    yield call(() => fetch(""));
    yield put(deleteSong(action.payload));
  } catch (error) {
    console.error("Error deleting song:", error);
  }
}

function* songSaga() {
  yield takeEvery("songs/getSongsFetch", workGetSongsFetch);
  yield takeLatest("song/fetchSongs", fetchSongsAsync);
  //   yield takeLatest("song/addSong", addSongAsync);
  //   yield takeLatest("song/updateSong", updateSongAsync);
  //   yield takeLatest("song/deleteSong", deleteSongAsync);
}
export default songSaga;
