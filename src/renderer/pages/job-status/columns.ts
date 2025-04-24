import { Column } from "../../components/data-table";

export type StatusData = {
  key: React.Key;
  no: string;
  name: string;
  badge: React.ReactNode;
  action: React.ReactNode;
};

export const columns: Column<StatusData>[] = [
  {
    key: "no",
    label: "No.",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "badge",
    label: "Badge",
  },
  {
    key: "action",
    label: "Action",
  },
];
