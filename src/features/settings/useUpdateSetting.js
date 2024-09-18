import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useEditSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdate, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err?.message),
  });
  return { isUpdate, updateSettings };
}

export default useEditSetting;
