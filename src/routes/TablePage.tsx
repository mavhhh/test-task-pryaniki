import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, IconButton, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

const HOST = "https://test.v5.pryaniky.com";

type DataRow = {
  id: number;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
};

const TablePage: React.FC<{ token: string }> = ({
  token,
}: {
  token: string;
}) => {
  const [data, setData] = useState<GridRowsProp<DataRow>>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/get`,
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        {
          headers: {
            "x-auth": token,
          },
        }
      );
      setData(data.filter((row) => row.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: true },
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
      width: 150,
      editable: true,
    },
    {
      field: "documentName",
      headerName: "Название документа",
      width: 170,
      editable: true,
    },
    {
      field: "documentStatus",
      headerName: "Статус документа",
      width: 150,
      editable: true,
    },
    {
      field: "documentType",
      headerName: "Тип документа",
      width: 150,
      editable: true,
    },
    {
      field: "employeeNumber",
      headerName: "Номер сотрудника",
      width: 150,
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
      width: 90,
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
    <div>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          marginLeft: "1rem",
          height: "5vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        Таблица данных
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            sx={{ width: "100vw", height: "95vh" }}
          />
        </Box>
      )}
    </div>
  );
};

export default TablePage;
