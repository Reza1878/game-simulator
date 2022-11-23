import { BasePage, Button, ConfirmationModal } from "@/components/common";
import { BaseTable, TableControl } from "@/components/common/table";
import { ROUTE_BAN_AMOUNT_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import BanAmountService from "@/service/ban-amount-service";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BanAmountListPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const wrappedFetchItem = useWrap((...args) => BanAmountService.gets(...args));
  const wrappedDeleteItem = useWrap((id) => BanAmountService.delete(id));

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("ban_count", {
      cell: (info) => info.getValue(),
      header: () => <span>Ban Amount</span>,
      enableColumnFilter: false,
    }),
    columnHelper.display({
      id: "action",
      cell: (props) => {
        return (
          <TableControl
            onEditClick={() =>
              navigate(`${ROUTE_BAN_AMOUNT_PAGE}/${props.row.original.id}/edit`)
            }
            onDeleteClick={() => {
              setOpen(true);
              setSelectedItem(props.row.original);
            }}
          />
        );
      },
    }),
  ];
  const handleConfirmDelete = async ({ isConfirmed }) => {
    if (isConfirmed) {
      try {
        const response = await wrappedDeleteItem(selectedItem?.id);

        showToast(response.message);
        setRefetch(!refetch);
      } catch (error) {
        showToast(
          error?.response?.data?.message || "Something went wrong",
          "error"
        );
        console.log(error);
      }
    }

    setSelectedItem(null);
    setOpen(false);
  };
  return (
    <BasePage title="Pricing List">
      <div className="flex justify-end">
        <Button onClick={() => navigate(`${ROUTE_BAN_AMOUNT_PAGE}/create`)}>
          Create
        </Button>
      </div>
      <BaseTable
        columns={columns}
        fetchItems={wrappedFetchItem}
        refetch={refetch}
      />
      <ConfirmationModal
        title={`Delete "${selectedItem?.ban_count}" ban amount?`}
        onClose={handleConfirmDelete}
        open={open}
      />
    </BasePage>
  );
}

export default BanAmountListPage;
