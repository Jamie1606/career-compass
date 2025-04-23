import { Button } from "@heroui/react";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Career Compass | Dashboard";
  }, []);

  return (
    <div className="flex flex-col w-full">
      <label>Dashboard</label>
      <Button color="primary">HELLO</Button>
    </div>
  );
};

export default DashboardPage;
