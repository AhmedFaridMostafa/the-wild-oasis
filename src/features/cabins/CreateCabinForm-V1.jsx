import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { description, discount, maxCapacity, name, regularPrice, image } =
    formState.errors;
  const queryClient = useQueryClient();
  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err?.message),
  });
  function onSubmit(data) {
    const image = data.image[0];
    mutate({ ...data, image });
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={name}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This filed is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This filed is required",
            min: {
              value: 1,
              message: "Capacity should be at lest 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={regularPrice}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This filed is required",
            min: {
              value: 1,
              message: "Capacity should be at lest 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={discount}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This filed is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={description}>
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "This filed is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={image}>
        <FileInput
          id="image"
          disabled={isCreating}
          accept="image/*"
          {...register("image", { required: "This filed is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
