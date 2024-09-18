import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName={"cabins"} />;
  // 1) FilterValue
  const filterValue = searchParams.get("discount") || "all";
  let filterCabins;
  if (filterValue == "all") {
    filterCabins = cabins;
  } else if (filterValue === "no-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filterCabins = cabins.filter((cabin) => cabin.discount !== 0);
  }
  // 2) SortBy
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [filed, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[filed] - b[filed]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div>#</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
