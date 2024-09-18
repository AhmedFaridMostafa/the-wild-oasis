import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
function useSignup() {
  const { mutate: SignUp, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! please verify the new account form user's email address."
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.message);
    },
  });
  return { SignUp, isPending };
}

export default useSignup;
