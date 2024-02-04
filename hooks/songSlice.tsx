import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SongType = {
  id: string;
  title: string;
  artist: string;
  album: string;
  generes: string;
  // ... other properties
};

type SongState = {
  songs: SongType[];
  isLoading: boolean;
};

const initialState: SongState = {
  songs: [],
  isLoading: false,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action: PayloadAction<SongType[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    addSong: (state, action: PayloadAction<SongType>) => {
      state.songs.push(action.payload);
    },
    setSongs: (state, action: PayloadAction<SongType[]>) => {
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
    deleteSong: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.songs = state.songs.filter((song) => song.id !== id);
    },
  },
});

export const {
  getSongsFetch,
  getSongsSuccess,
  addSong,
  setSongs,
  updateSong,
  deleteSong,
} = songSlice.actions;

export default songSlice.reducer;
