"use client";
import { useState } from "react";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";

const AddSongForm = () => {
  const router = useRouter();
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
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });
  return (
    <>
      <Heading title="Add a Song" />
      <Input
        label="Title"
        id="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Artist"
        id="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Album"
        id="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        label="Generes"
        id="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Add Song"}
        onClick={() => {}}
      />
    </>
  );
};

export default AddSongForm;
