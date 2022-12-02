import { BasePage, Button, ConfirmationModal } from "@/components/common";
import { BaseTable, TableControl } from "@/components/common/table";
import { ROUTE_PRICING_PAGE } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import PricingService from "@/service/pricing-service";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PricingListPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const wrappedFetchItem = useWrap((...args) => PricingService.gets(...args));
  const wrappedDeleteItem = useWrap((id) => PricingService.delete(id));

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("price", {
      cell: (info) => info.getValue(),
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: () => <span>Description</span>,
    }),
    columnHelper.accessor("interval", {
      cell: (info) => info.getValue(),
      header: () => <span>Interval</span>,
    }),
    columnHelper.accessor("user_tier", {
      cell: (info) => info.getValue()?.name,
      header: () => <span>User Tier</span>,
      enableColumnFilter: false,
    }),
    columnHelper.display({
      id: "action",
      cell: (props) => {
        return (
          <TableControl
            onEditClick={() =>
              navigate(`${ROUTE_PRICING_PAGE}/${props.row.original.id}/edit`)
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
        <Button onClick={() => navigate(`${ROUTE_PRICING_PAGE}/create`)}>
          Create
        </Button>
      </div>
      <BaseTable
        columns={columns}
        fetchItems={wrappedFetchItem}
        refetch={refetch}
      />
      <ConfirmationModal
        title={`Delete "${selectedItem?.name}"?`}
        onClose={handleConfirmDelete}
        open={open}
      />
    </BasePage>
  );
}

export default PricingListPage;
