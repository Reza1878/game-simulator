import React from "react";
import { TextField } from "@/components/form";

/**
 *
 * @param {column} column instance from createColumnHelper react table
 * @returns
 */
function TableCellSearch({ column }) {
  const columnFilterValue = column.getFilterValue();
  return (
    <TextField
      type="text"
      defaultValue={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="font-normal py-1"
    />
  );
}

export default TableCellSearch;
