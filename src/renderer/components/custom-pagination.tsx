import { Pagination } from "@heroui/react";

interface CustomPaginationProps {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export default function CustomPagination({ page, total, limit, onChange }: CustomPaginationProps) {
  return <Pagination classNames={{ item: "cursor-pointer", cursor: "bg-[#1d4ed8]/90" }} showShadow page={page} total={Math.ceil(total / limit)} onChange={(page) => onChange(page)} />;
}
