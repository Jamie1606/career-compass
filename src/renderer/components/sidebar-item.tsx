import { URLLink } from "@/constant/url";
import clsx from "clsx";
import { IconProps } from "@/types/icon-definition";
import { Link, useLocation } from "react-router";

interface SidebarItemProps {
  url: URLLink;
  label: string;
  icon: React.ElementType<IconProps>;
  noti?: number;
}

export default function SidebarItem({ url, label, icon: Icon, noti }: SidebarItemProps) {
  const location = useLocation();
  const active = location.pathname === url;

  return (
    <Link draggable={false} to={url} className={clsx("flex items-center w-full ps-3 py-2.5 select-none hover:bg-[#1d4ed8]/10 rounded-lg focus-visible:outline-[#1d4ed8]/25", active && "bg-[#1d4ed8]/25 hover:bg-[#1d4ed8]/25")}>
      <Icon width={20} height={20} className="mr-1" fill={active ? "#1d4ed8" : "#1e293b"} />
      <span className={clsx(active && "text-[#1d4ed8] font-semibold")}>{label}</span>
      {noti && <span className="ms-auto me-2 text-[11px] w-5 h-5 flex justify-center items-center bg-[#fb2c36]/90 text-[#f8fafc] font-bold rounded-full">{noti > 99 ? "99+" : noti}</span>}
    </Link>
  );
}
