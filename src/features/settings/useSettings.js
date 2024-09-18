import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useSettings() {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  if (error) toast.error(error.message);
  return { isPending, settings };
}

export default useSettings;
