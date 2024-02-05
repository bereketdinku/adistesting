"use client";

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActionBtn from "../components/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/hooks/rootReducer";
import { useCallback, useEffect } from "react";
import { getSongsFetch } from "@/hooks/songSlice";
import toast from "react-hot-toast";
import axios from "axios";

const ManageSongClient = () => {
  const songsState = useSelector((state: RootState) => state.songs);
  const dispatch=useDispatch()
  const songsArray = songsState.songs || [];
  console.log(songsState)
  
  useEffect(()=>{
dispatch(getSongsFetch())
  },[dispatch])
  let rows: any = [];
  const router = useRouter();
  if(songsArray ){
    rows=songsArray.map((product: { _id: any; title: any; artist: any; album: any; generes: any; })=>{
        return {
            id:product._id,
            title:product.title,
            artist:product.artist,
            album:product.album,
            generes:product.generes,
            
        }
    });
 }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "artist",
      headerName: "Artist",
      width: 220,
    },
    { field: "album", headerName: "Album", width: 150 },
    { field: "generes", headerName: "Generes", width: 150 },

    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn icon={MdCached} onClick={() => {}} />
            <ActionBtn icon={MdDelete} onClick={() => {
                 handleDelete(params.row.id)
            }} />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`edit/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete=useCallback(async(id:string)=>{
    toast('Deleting product,please wait')
   
    axios.delete(`https://backend-ipfr.onrender.com/api/${id}`).then((res)=>{
        toast.success("product deleted")
        router.refresh()
    }).catch((err)=>{
        toast.error("Failed to delete product")
        console.log(err);
    })
 },[router])

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Songs" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ManageSongClient;
