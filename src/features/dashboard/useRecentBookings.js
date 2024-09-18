import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
function useRecentBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["booking", `${numDays}`],
  });

  return { bookings, isPending };
}

export default useRecentBookings;
