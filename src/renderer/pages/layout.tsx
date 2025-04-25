import SidebarItem from "@/components/sidebar-item";
import URL from "@/constant/url";
import ArchiveIcon from "@/icons/archive-icon";
import CalendarIcon from "@/icons/calendar-icon";
import DashboardIcon from "@/icons/dashbard-icon";
import ExtensionIcon from "@/icons/extension-icon";
import InfoIcon from "@/icons/info-icon";
import OfficeTypeIcon from "@/icons/office-type-icon";
import PersonIcon from "@/icons/person-icon";
import SettingIcon from "@/icons/setting-icon";
import StepIcon from "@/icons/step-icon";
import TaskIcon from "@/icons/task-icon";
import WorkIcon from "@/icons/work-icon";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden max-h-screen text-[#1e293b] bg-[#f8fafc]">
      <div className="flex flex-col h-full w-[230px] shadow-lg">
        <div className="flex flex-col min-h-0 overflow-y-auto p-2 gap-y-2">
          <SidebarItem url={URL.DASHBOARD} label="Dashboard" icon={DashboardIcon} />
          <SidebarItem url={URL.JOB} label="Jobs" icon={WorkIcon} />
          {/* <SidebarItem url={URL.PEOPLE} label="People" icon={PersonIcon} />
          <SidebarItem url={URL.TASK} label="Tasks" icon={TaskIcon} />
          <SidebarItem url={URL.ARCHIVE} label="Archive" icon={ArchiveIcon} />
          <SidebarItem url={URL.CALENDAR} label="Calendar" icon={CalendarIcon} /> */}
          <SidebarItem url={URL.JOB_STATUS} label="Job Status" icon={StepIcon} />
          <SidebarItem url={URL.OFFICE_TYPE} label="Office Type" icon={OfficeTypeIcon} />
          {/* <SidebarItem url={URL.EXTENSION} label="Extension" icon={ExtensionIcon} /> */}
        </div>
        <div className="mt-auto flex flex-col p-2 gap-y-2">
          {/* <SidebarItem url={URL.SETTING} label="Setting" icon={SettingIcon} /> */}
          <SidebarItem url={URL.ABOUT} label="About" icon={InfoIcon} />
        </div>
      </div>
      <div className="flex w-full overflow-y-auto p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
