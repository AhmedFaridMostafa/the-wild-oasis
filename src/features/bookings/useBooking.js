import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useBooking() {
  const { bookingId } = useParams();
  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  if (error) toast.error(error.message);
  return { isPending, error, booking };
}

export default useBooking;
