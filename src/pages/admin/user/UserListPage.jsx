import { BasePage } from "@/components/common";
import { BaseTable } from "@/components/common/table";
import { useWrap } from "@/hooks/useWrap";
import UserService from "@/service/user-service";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

function UserListPage() {
  const wrappedFetchItem = useWrap((...args) => UserService.gets(...args));
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.getValue(),
      header: () => <span>Role</span>,
    }),
  ];
  return (
    <BasePage title="User List">
      <BaseTable columns={columns} fetchItems={wrappedFetchItem} />
    </BasePage>
  );
}

export default UserListPage;
