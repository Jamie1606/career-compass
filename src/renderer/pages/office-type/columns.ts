import { Column } from "../../components/data-table";

export type OfficeTypeData = {
  key: React.Key;
  no: string;
  name: string;
  action: React.ReactNode;
};

export const columns: Column<OfficeTypeData>[] = [
  {
    key: "no",
    label: "No.",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "action",
    label: "Action",
  },
];
