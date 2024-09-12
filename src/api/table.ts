import { api } from "./api";
import type { TableRow } from "../types/table";

export const getTable = (token: string) => {
  return api.get("/ru/data/v3/testmethods/docs/userdocs/get", {
    headers: { "x-auth": token },
  });
};

export const updateRow = (token: string, newRow: TableRow) => {
  const { id } = newRow;
  return api.post(
    `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    {
      ...newRow,
    },
    { headers: { "x-auth": token } }
  );
};

export const deleteRowById = (token: string, id: string) => {
  return api.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    headers: { "x-auth": token },
  });
};

export const addRow = (token: string, newRow: TableRow) => {
  return api.post(
    "/ru/data/v3/testmethods/docs/userdocs/create",
    { ...newRow },
    { headers: { "x-auth": token } }
  );
};
