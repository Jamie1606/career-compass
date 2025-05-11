import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Career Compass | Dashboard";
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Coming Soon</h1>
      <p className="text-xl text-gray-200 mb-8 drop-shadow-md">I&apos;m working hard to bring this page to you!</p>
    </div>
  );
};

export default DashboardPage;
