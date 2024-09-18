import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCabin() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (error) toast.error(error.message);
  return { isLoading, cabins };
}

export default useCabin;
