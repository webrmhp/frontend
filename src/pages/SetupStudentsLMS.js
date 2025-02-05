import React from "react";
import Header from "../components/Header";
import Footer from "../components/footur";

const SetupStudentsLMS = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How to Set Up Student's LMS
          </h2>
          <p className="text-gray-600 mb-6">
            Setting up the LMS requires admin access. Follow these steps to ensure proper configuration.
          </p>

          <div className="space-y-6">
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                1. Obtain Admin Credentials
              </h3>
              <p className="text-gray-700">
                Ensure you have the required admin credentials provided by your institution.
              </p>
            </div>

            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                2. Access the LMS Portal
              </h3>
              <p className="text-gray-700">
                Visit the LMS portal using the official link provided by the institution.
              </p>
            </div>

            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                3. Configure User Accounts
              </h3>
              <p className="text-gray-700">
                Add student accounts, assign roles, and set permissions for course access.
              </p>
            </div>

            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                4. Upload Course Materials
              </h3>
              <p className="text-gray-700">
                Upload relevant course materials, including PDFs, videos, and assignments.
              </p>
            </div>

            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                5. Test the Setup
              </h3>
              <p className="text-gray-700">
                Conduct a test run to ensure students can log in and access their courses without issues.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SetupStudentsLMS;
