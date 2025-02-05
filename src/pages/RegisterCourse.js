import React from "react";
import Header from "../components/Header";
import Footer from "../components/footur";

const RegisterCourse = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How to Register for a Course
          </h2>
          <p className="text-gray-600 mb-6">
            Follow these steps to successfully register for a course:
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                1. Log in to Your Account
              </h3>
              <p className="text-gray-700">
                Use your student credentials to log in to the platform. Ensure your login details are correct.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                2. Navigate to the Courses Section
              </h3>
              <p className="text-gray-700">
                Click on the "Courses" tab in the navigation menu to view the available courses.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                3. Select Your Desired Course
              </h3>
              <p className="text-gray-700">
                Browse through the list of available courses and select the one you wish to register for.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                4. Complete Registration
              </h3>
              <p className="text-gray-700">
                Fill out the required details and click on the "Register" button to complete the process.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                5. Confirmation
              </h3>
              <p className="text-gray-700">
                You will receive a confirmation email or message once the registration is successful.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterCourse;
