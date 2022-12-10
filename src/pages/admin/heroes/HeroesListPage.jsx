import {
  BasePage,
  Button,
  ConfirmationModal,
  FilterBox,
} from "@/components/common";
import { BaseTable, TableControl } from "@/components/common/table";
import { Autocomplete } from "@/components/form";
import { ROUTE_HEROES } from "@/config/routes";
import useToast from "@/hooks/useToast";
import { useWrap } from "@/hooks/useWrap";
import HeroesRoleService from "@/service/heroes-roles-service";
import HeroService from "@/service/heroes-service";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroesListPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState(null);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const wrappedFetchItem = useWrap((...args) => HeroService.gets(...args));
  const wrappedDeleteItem = useWrap((id) => HeroService.delete(id));

  const wrappedFetchRoleData = useWrap((...args) =>
    HeroesRoleService.gets(...args)
  );

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("heroes_roles", {
      cell: (info) =>
        info
          .getValue()
          .map((item) => item.name)
          .join(", "),
      header: () => <span>Role</span>,
      enableColumnFilter: false,
    }),
    columnHelper.display({
      id: "action",
      cell: (props) => {
        return (
          <TableControl
            onEditClick={() =>
              navigate(`${ROUTE_HEROES}/${props.row.original.id}/edit`)
            }
            onViewClick={() => {
              navigate(`${ROUTE_HEROES}/${props.row.original.id}`);
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

  const getParams = useCallback(() => {
    const params = {};
    if (selectedRoles) {
      params.heroes_role_id = selectedRoles?.id;
    }
    return params;
  }, [selectedRoles]);
  return (
    <BasePage title="Pricing List">
      <div className="flex justify-end mb-3">
        <Button onClick={() => navigate(`${ROUTE_HEROES}/create`)}>
          Create
        </Button>
      </div>
      <FilterBox>
        <Autocomplete
          fetchItems={(params) => wrappedFetchRoleData({ name: params })}
          renderOptions={(opt) => opt?.name}
          onChange={(val) => {
            setSelectedRoles(val);
          }}
        />
      </FilterBox>
      <BaseTable
        columns={columns}
        fetchItems={wrappedFetchItem}
        refetch={refetch}
        getParams={getParams}
      />
      <ConfirmationModal
        title={`Delete "${selectedItem?.name}"?`}
        onClose={handleConfirmDelete}
        open={open}
      />
    </BasePage>
  );
}

export default HeroesListPage;
