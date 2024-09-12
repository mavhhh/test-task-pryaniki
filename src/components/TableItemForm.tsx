import React, { FormEvent, useState } from "react";
import { parseISO } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale/ru";

import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchTable } from "../redux/slices/tableSlice";
import { addRow } from "../api/table";
import { TableRow } from "../types/table";

const style = {
  width: "max(300px, 70vw)",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fffff",
  borderRadius: "20px",
  boxShadow: 32,
  p: 4,
};

export const TableItemForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: RootState) => state.token);

  const [newRecord, setNewRecord] = useState<Record<string, string | null>>({
    companySigDate: null,
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: null,
    employeeSignatureName: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await addRow(token, newRecord as TableRow);
      if (response.status === 200) {
        toast.success("Запись успешно добавлена.");
        dispatch(fetchTable(token));
        onSuccess();
      } else {
        toast.error("Ошибка при создании записи!");
      }
    } catch (error) {
      toast.error("Ошибка при создании записи!");
      console.error(error);
    }
  };

  return (
    <Container component="div">
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <Stack gap={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Дата подписи компании"
              value={parseISO(newRecord?.companySigDate || "")}
              onChange={(newValue) =>
                setNewRecord({
                  ...newRecord,
                  companySigDate: newValue?.toISOString() || "",
                })
              }
            />
          </LocalizationProvider>

          <TextField
            required
            label="Подпись компании"
            value={newRecord?.companySignatureName}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                companySignatureName: e.target.value,
              })
            }
            fullWidth
          />

          <TextField
            required
            label="Название документа"
            value={newRecord?.documentName}
            onChange={(e) =>
              setNewRecord({ ...newRecord, documentName: e.target.value })
            }
            fullWidth
          />

          <TextField
            required
            label="Тип документа"
            value={newRecord?.documentType}
            onChange={(e) =>
              setNewRecord({ ...newRecord, documentType: e.target.value })
            }
            fullWidth
          />

          <TextField
            required
            label="Статус документа"
            value={newRecord?.documentStatus}
            onChange={(e) =>
              setNewRecord({ ...newRecord, documentStatus: e.target.value })
            }
            fullWidth
          />

          <TextField
            required
            label="Номер сотрудника"
            value={newRecord?.employeeNumber}
            onChange={(e) =>
              setNewRecord({ ...newRecord, employeeNumber: e.target.value })
            }
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <DatePicker
              label="Дата подписи сотрудника"
              value={parseISO(newRecord?.employeeSigDate || "")}
              onChange={(newValue) =>
                setNewRecord({
                  ...newRecord,
                  employeeSigDate: newValue?.toISOString() || "",
                })
              }
            />
          </LocalizationProvider>

          <TextField
            required
            label="Подпись сотрудника"
            value={newRecord?.employeeSignatureName}
            onChange={(e) =>
              setNewRecord({
                ...newRecord,
                employeeSignatureName: e.target.value,
              })
            }
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: "3rem" }}
          >
            Добавить
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
