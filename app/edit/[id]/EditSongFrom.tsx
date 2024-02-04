"use client"
import { useCallback, useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../components/inputs/Input';
import Button from '../../components/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateSong } from '@/hooks/songSlice';

const EditSongForm = ({ songId }: { songId: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-ipfr.onrender.com/api/${songId}`);
        const songDetails = response.data?.song;
       console.log(songDetails?.song)
        // Assuming the song details structure is similar to the form data
        setValue('title', songDetails.title);
        setValue('artist', songDetails.artist);
        setValue('album', songDetails.album);
        setValue('generes', songDetails.generes);
      } catch (error) {
        console.error('Error fetching song details:', error);
        // Handle error as needed
      }
    };
  
    fetchData();
  }, [songId, setValue]);
  

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        // Make the API call using axios to update the song
        await axios.put(`https://backend-ipfr.onrender.com/api/${songId}`, data);

        // Dispatch the updateSong action with the updated song data
        // dispatch(updateSong({ id: songId, updatedSong: data }));

        // Display success toast and navigate back to manage songs
        toast.success('Song updated successfully');
        router.push('/manage-songs');
      } catch (error) {
        console.error('Error updating song:', error);

        // Display error toast
        toast.error('Something went wrong when updating the song');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, router, songId]
  );

  return (
    <>
      <Heading title="Edit Song" />
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
        label={isLoading ? 'Loading...' : 'Update Song'}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default EditSongForm;
