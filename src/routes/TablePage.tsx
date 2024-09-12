import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { deleteRowByID, fetchTable } from "../redux/slices/tableSlice";

import { TableItemForm } from "../components/TableItemForm";
import {
  CircularProgress,
  IconButton,
  Box,
  Typography,
  Button,
  Stack,
  Modal,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import type { TableRow } from "../types/table";
import { deleteRowById, updateRow } from "../api/table";

const TablePage = () => {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: RootState) => state.token);
  const { table } = useSelector((state: RootState) => state.table);

  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    await dispatch(fetchTable(token));
    setLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteRowById(token, id);
      if (response?.data?.error_code === 0) {
        toast.success("Запись удалена.");
        dispatch(deleteRowByID(id));
      } else {
        console.log(response);
        toast.error("Ошибка при удалении записи!");
      }
    } catch (err) {
      toast.error("Ошибка при удалении записи!");
      console.log(err);
    }
  };

  const handleRowUpdate = async (updatedRow: TableRow) => {
    const originalRow = table.find(
      (row) => row.id === updatedRow.id
    ) as TableRow;

    const isChanged =
      JSON.stringify(originalRow) !== JSON.stringify(updatedRow);

    if (!isChanged) {
      return updatedRow;
    }

    try {
      const response = await updateRow(token, { ...updatedRow });
      if (response?.data?.error_code === 0) {
        toast.success("Запись обновлена.");
      } else {
        toast.error("Ошибка при обновлении записи!");
      }
    } catch (err) {
      toast.error("Ошибка при обновлении записи!");
      console.error(err);
    }

    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      field: "companySigDate",
      headerName: "Дата подписи компании",
      width: 200,
      editable: true,
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "dd.MM.yyyy");
      },
    },
    {
      field: "companySignatureName",
      headerName: "Подпись компании",
      width: 160,
      editable: true,
    },
    {
      field: "documentName",
      headerName: "Название документа",
      width: 180,
      editable: true,
    },
    {
      field: "documentStatus",
      headerName: "Статус документа",
      width: 160,
      editable: true,
    },
    {
      field: "documentType",
      headerName: "Тип документа",
      width: 160,
      editable: true,
    },
    {
      field: "employeeNumber",
      headerName: "Номер сотрудника",
      width: 160,
      editable: true,
    },
    {
      field: "employeeSigDate",
      headerName: "Дата подписи сотрудника",
      width: 200,
      editable: true,
      renderCell: (params) => {
        const date = new Date(params.value);
        return format(date, "dd.MM.yyyy");
      },
    },
    {
      field: "employeeSignatureName",
      headerName: "Подпись сотрудника",
      width: 160,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ textAlign: "center" }}>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Modal open={isAdding} onClose={() => setIsAdding(false)}>
        <TableItemForm onSuccess={() => setIsAdding(false)} />
      </Modal>
      <Stack alignItems={"center"} direction="row" gap={3}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginLeft: "1rem",
            height: "4rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          Таблица
        </Typography>
        <Button onClick={() => setIsAdding(true)} variant="outlined">
          <AddBoxIcon sx={{ marginRight: ".5rem" }} />
          Добавить запись
        </Button>
        {loading && <CircularProgress size={30} />}
      </Stack>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={table}
          columns={columns}
          processRowUpdate={handleRowUpdate}
          sx={{ width: "100vw", height: "calc(100lvh - 4rem)" }}
        />
      </Box>
    </Box>
  );
};

export default TablePage;
