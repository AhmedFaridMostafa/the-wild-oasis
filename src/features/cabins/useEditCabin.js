import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id, oldImage }) =>
      createEditCabin(newCabinData, id, oldImage),
    onSuccess: () => {
      toast.success("cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err?.message),
  });
  return { isEditing, editCabin };
}

export default useEditCabin;
