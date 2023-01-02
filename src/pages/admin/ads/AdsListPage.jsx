import { BasePage, Button, ConfirmationModal } from "@/components/common";
import { BaseTable, TableControl } from "@/components/common/table";
import { ROUTE_ADS, ROUTE_HEROES } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import AdService from "@/service/ads-service";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdsListPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const wrappedFetchItem = useWrap((...args) => AdService.gets(...args));
  const wrappedDeleteItem = useWrap((id) => AdService.delete(id));

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("ratio", {
      cell: (info) => info.getValue(),
      header: () => <span>Ratio</span>,
    }),
    columnHelper.display({
      id: "action",
      cell: (props) => {
        return (
          <TableControl
            onEditClick={() =>
              navigate(`${ROUTE_ADS}/${props.row.original.id}/edit`)
            }
            onViewClick={() => {
              navigate(`${ROUTE_ADS}/${props.row.original.id}`);
            }}
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
        console.log({ selectedItem });
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
    <BasePage title="Ads List">
      <div className="flex justify-end mb-3">
        <Button onClick={() => navigate(`${ROUTE_ADS}/create`)}>Create</Button>
      </div>
      <BaseTable
        columns={columns}
        fetchItems={wrappedFetchItem}
        refetch={refetch}
      />
      <ConfirmationModal
        title={`Delete "${selectedItem?.ratio}" ads?`}
        onClose={handleConfirmDelete}
        open={open}
      />
    </BasePage>
  );
}

export default AdsListPage;
