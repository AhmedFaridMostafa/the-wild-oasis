import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { SignUp, isPending } = useSignup();
  function onSubmit({ fullName, email, password }) {
    SignUp({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName}>
        <Input
          disabled={isPending}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This flied is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email}>
        <Input
          disabled={isPending}
          type="email"
          id="email"
          {...register("email", {
            required: "This flied is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password}>
        <Input
          disabled={isPending}
          type="password"
          autocomplete="on"
          id="password"
          {...register("password", {
            required: "This flied is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm}>
        <Input
          disabled={isPending}
          type="password"
          autocomplete="on"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This flied is required",
            validate: (value) =>
              value === getValues()?.password || "Password need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isPending} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
