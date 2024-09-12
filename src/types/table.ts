export type TableRow = {
  id?: string;
  companySigDate: string | null;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string | null;
  employeeSignatureName: string;
};

export type TableState = {
  table: TableRow[];
  status: "pending" | "fulfilled" | "rejected";
  error: any;
};
