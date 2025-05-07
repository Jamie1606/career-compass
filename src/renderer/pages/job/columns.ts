import { Column } from "../../components/data-table";

export type JobData = {
  key: React.Key;
  no: string;
  title: string;
  employer: string;
  office_type: string;
  location: string | undefined;
  document: React.ReactNode;
  status: React.ReactNode;
  action: React.ReactNode;
};

export const columns: Column<JobData>[] = [
  {
    key: "no",
    label: "No.",
  },
  {
    key: "title",
    label: "Role",
  },
  {
    key: "employer",
    label: "Employer",
  },
  {
    key: "office_type",
    label: "Office Type",
  },
  {
    key: "document",
    label: "Documents",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "action",
    label: "Action",
  },
];
