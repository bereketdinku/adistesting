"use client";

import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActionBtn from "../components/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";

const ManageSongClient = () => {
  let rows: any = [];
  const router = useRouter();
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
            <ActionBtn icon={MdDelete} onClick={() => {}} />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];
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
