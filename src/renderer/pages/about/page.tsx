import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Career Compass | About";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
      <div className="max-w-2xl text-center space-y-8 bg-white p-10 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Career Compass</h1>
        <p className="text-xl text-gray-600">Version 0.0.1 (Beta)</p>

        <div className="space-y-6">
          <p className="text-gray-600">Career Compass is a desktop application designed to help you manage and track your job search journey. Keep track of job applications, interviews, and career progress all in one place.</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
            <ul className="text-gray-600 space-y-3 text-left w-[350px] mx-auto">
              <li>• Track job applications and their statuses</li>
              <li>• Manage different office types and preferences</li>
              <li>• Clean and intuitive dashboard</li>
              <li>• Easy-to-use interface</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Developed by&nbsp;
            <a href="https://www.zayyartun.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline hover:underline-offset-2 font-semibold">
              Zay Yar Tun
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
