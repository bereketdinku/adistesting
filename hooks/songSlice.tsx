import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

// Your Song type (replace with your actual type)
type SongType = {
  id: string;
  title: string;
  artist: string;
  album: string;
  generes: string;
  // ... other properties
};
export const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [] as SongType[],
    isLoading: false,
  },
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    addSong: (state, action) => {
      state.songs = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    updateSong: (
      state,
      action: PayloadAction<{ id: string; updatedSong: SongType }>
    ) => {
      const { id, updatedSong } = action.payload;
      const index = state.songs.findIndex((song) => song.id === id);
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
    },
    deleteSong: (state, action) => {
      const { id } = action.payload;
      state.songs = state.songs.filter((song) => song.id !== id);
    },
  },
});
export const {
  getSongsFetch,
  addSong,
  getSongsSuccess,
  setSongs,
  updateSong,
  deleteSong,
} = songSlice.actions;
export default songSlice.reducer;
