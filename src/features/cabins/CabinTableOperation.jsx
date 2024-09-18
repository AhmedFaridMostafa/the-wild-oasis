import TableOperation from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperation() {
  return (
    <TableOperation>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No-discount", value: "no-discount" },
          { label: "With-discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (Low First)" },
          { value: "regularPrice-desc", label: "Sort by Price (high First)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low First)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high First)" },
        ]}
      />
    </TableOperation>
  );
}

export default CabinTableOperation;
