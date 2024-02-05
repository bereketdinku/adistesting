"use client";
import { useCallback, useState } from "react";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addSong } from "@/hooks/songSlice";

const AddSongForm = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      generes: "",
      
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        // Make the API call using axios
        const response = await axios.post('https://backend-ipfr.onrender.com/api/', data);

        // Assuming your API response structure contains the added song data
        const addedSong = response.data;

        // Dispatch the addSong action with the added song data
        // router.push('/manage-songs');
        dispatch(addSong(addedSong));
        
        // Display success toast and refresh page
        toast.success('Song added successfully');
        router.refresh();
      } catch (error) {
        console.error('Error adding song:', error);

        // Display error toast
        toast.error('Something went wrong when adding the song');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, router]
  );


  return (
    <>
      <Heading title="Add a Song" />
      <Input
        label="Title"
        id="title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Artist"
        id="artist"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Album"
        id="album"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Generes"
        id="generes"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Add Song"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddSongForm;
