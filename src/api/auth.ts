import { api } from "./api";
import type { LoginParams } from "../types/auth";

export const login = (params: LoginParams) => {
  return api.post("/ru/data/v3/testmethods/docs/login", { ...params });
};
