"use client";
import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import { formatNumber } from "@/utils/formatNumber";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/hooks/rootReducer";
import { getSongsFetch, getSongsSuccess } from "@/hooks/songSlice";
type SongType = {
  id: string;
  title: string;
  artist: string;
  album: string;
  generes: string;
  // ... other properties
};
type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Summary = () => {
  const songsState = useSelector((state: RootState) => state.songs);
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(getSongsFetch())
  },[dispatch])
  console.log(songsState.songs)
  
  
  useEffect(() => {
    const calculateSummary = () => {
      const songsArray = songsState.songs?.songs|| []; // Access the songs array within the object
    
      let totalSongs = songsArray.length;
      let uniqueAlbums = new Set<string>();
      let uniqueArtists = new Set<string>();
      let uniqueGenres = new Set<string>();
      let artistSongCount: { [artist: string]: number } = {};
      let albumSongCount: { [album: string]: number } = {};
  let artistAlbumCount: { [artist: string]: number } = {};
      songsArray.map((song: { album: string; artist: string; generes: any; }) => {
        uniqueAlbums.add(song.album);
        uniqueArtists.add(song.artist);
        uniqueGenres.add(song.generes);
        if (artistSongCount[song.artist]) {
          artistSongCount[song.artist]++;
        } else {
          artistSongCount[song.artist] = 1;
        }
  
        // Count albums per artist
        if (artistAlbumCount[song.artist]) {
          artistAlbumCount[song.artist]++;
        } else {
          artistAlbumCount[song.artist] = 1;
        }
  
        // Count songs per album
        if (albumSongCount[song.album]) {
          albumSongCount[song.album]++;
        } else {
          albumSongCount[song.album] = 1;
        }
    

      });
    
      const totalAlbums = uniqueAlbums.size;
      const totalArtists = uniqueArtists.size;
      const totalGenres = uniqueGenres.size;
      
    
      return {
        songs: totalSongs,
        albums: totalAlbums,
        artists: totalArtists,
        genres: totalGenres,
        artistSummary: { ...artistSongCount, ...artistAlbumCount },
      albumSongCount: albumSongCount,
      };
    };
    
      
      const summary = calculateSummary();
      setSummaryData({
        songs: { label: "Total Songs", digit: summary.songs },
        albums: { label: "Total Albums", digit: summary.albums },
        artists: { label: "Total Artists", digit: summary.artists },
        genres: { label: "Total Genres", digit: summary.genres },
       
      });
    
  }, [songsState.songs]);
  


  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Product",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 20,
    },
    users: {
      label: "Total Users",
      digit: 10,
    },
  });
  const SummaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="m-4 mt-8">
        <Heading title="Statistics" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {SummaryKeys &&
          SummaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {formatNumber(summaryData[key].digit)}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
