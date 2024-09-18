import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSettled: (data) => {
      toast.success(`Booking #${data.id} successfully checked Out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(`There was an error while checking Out`);
      toast.error(error.message);
    },
  });
  return { checkout, isCheckingOut };
}

export default useCheckout;
