import React, { useEffect, useMemo, useState } from "react";
import * as t from "prop-types";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaginationButton } from ".";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { TextField } from "@/components/form";
import Text from "../Text";
import { Loader } from "..";
import TableCellSearch from "./TableCellSearch";

import clsx from "clsx";

/**
 *
 * @prop {fetchItems} promise function that returns {data, page}
 * @prop {columns} columns that created by createColumnHelper from react-table
 * @prop {limit} limit per page
 * @prop {page} current page
 * @prop {getParams} function that return params from parent component
 */

function BaseTable({ fetchItems, columns, limit, page, refetch, getParams }) {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState({
    totalItems: 0,
    limit,
    page,
  });
  const [loading, setLoading] = useState(false);
  const [columnFilter, setColumnFilter] = useState([]);
  const [columnSorting, setColumnSorting] = useState([]);

  const totalPages = useMemo(
    () => Math.ceil(pageData.totalItems / pageData.limit),
    [pageData.totalItems, pageData.limit]
  );

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          limit: pageData.limit,
          offset: pageData.page,
          ...getParams(),
        };
        if (columnSorting.length) {
          params.sortBy = columnSorting[0].id;
          params.sortDirection = columnSorting[0].desc ? "DESC" : "ASC";
        }
        columnFilter.forEach((cf) => (params[cf.id] = cf.value));
        const response = await fetchItems(params);
        if (!active) return;
        const { data, page } = response;
        setData(data ?? []);
        setPageData(page);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (pageData.page) {
      fetchData();
    }
    return () => {
      active = false;
    };
  }, [
    pageData.limit,
    pageData.page,
    columnFilter,
    refetch,
    getParams,
    columnSorting,
  ]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilter,
    state: {
      sorting: columnSorting,
    },
    onSortingChange: setColumnSorting,
    defaultColumn: {
      enableSorting: false,
    },
  });

  return (
    <>
      <div className="overflow-x-auto mt-4 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <Loader />
          </div>
        )}
        <table className="w-full border">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="border-b" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="p-2" key={header.id}>
                    <div
                      className={clsx("flex flex-wrap text-center", {
                        "cursor-pointer select-none hover:bg-gray-100 p-2":
                          header.column.getCanSort(),
                      })}
                      onClick={() => header.column.toggleSorting()}
                    >
                      <Text className="text-center w-full uppercase text-sm font-medium flex gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUp size={18} />,
                          desc: <ArrowDown size={18} />,
                        }[header.column.getIsSorted()] ?? null}
                      </Text>
                    </div>
                    {header.column.getCanFilter() && (
                      <TableCellSearch column={header.column} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {!table.getRowModel().rows.length && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-2 border-b text-sm text-center"
                >
                  No data available
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="p-2 border-b text-sm" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between flex-wrap">
        <div className="flex gap-2 lg:w-auto w-full">
          <PaginationButton
            disabled={pageData.page === 1}
            onClick={() => {
              setPageData((val) => ({
                ...val,
                page: 1,
              }));
            }}
          >
            <ChevronsLeft />
          </PaginationButton>
          <PaginationButton
            disabled={pageData.page === 1}
            onClick={() =>
              setPageData((val) => ({ ...val, page: val.page - 1 }))
            }
          >
            <ChevronLeft />
          </PaginationButton>
          <PaginationButton
            disabled={
              pageData.page === totalPages || pageData.page > totalPages
            }
            onClick={() =>
              setPageData((val) => ({ ...val, page: val.page + 1 }))
            }
          >
            <ChevronRight />
          </PaginationButton>
          <PaginationButton
            disabled={
              pageData.page === totalPages || pageData.page > totalPages
            }
            onClick={() => setPageData((val) => ({ ...val, page: totalPages }))}
          >
            <ChevronsRight />
          </PaginationButton>
        </div>

        <div className="flex items-center lg:w-auto w-full">
          <Text>
            Page <span style={{ fontWeight: "500" }}>{pageData.page}</span> of{" "}
            <span style={{ fontWeight: "500" }}>
              {new Intl.NumberFormat().format(totalPages)}
            </span>
          </Text>
          <Text className="mx-2">|</Text>
          <Text>
            Go to<span className="mr-2">:</span>
          </Text>
          <TextField
            value={pageData.page}
            onChange={(e) => {
              setPageData((val) => ({
                ...val,
                page: e.target.value,
              }));
            }}
            className="w-auto py-1"
            type="number"
            max={totalPages}
          />
        </div>

        <div className="lg:w-auto w-full">
          <select
            className="border p-1"
            value={pageData.limit}
            onChange={(e) => {
              setPageData((val) => ({
                ...val,
                page: 1,
                limit: e.target.value,
              }));
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

BaseTable.propTypes = {
  columns: t.array,
  // fetchItems: t.func,
  limit: t.number,
  page: t.number,
  refetch: t.bool,
  getParams: t.func,
};

BaseTable.defaultProps = {
  columns: [],
  limit: 10,
  page: 1,
  fetchItems: async () => {},
  refetch: false,
  getParams: () => ({}),
};

export default BaseTable;
