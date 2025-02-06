import React from "react";
import Header from "../components/Header";
import Footer from "../components/footur";

const CreateAccount = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How to Create an Account
          </h2>
          <p className="text-gray-600 mb-6">
            Follow these simple steps to create an account on our platform:
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                1. Go to the Homepage
              </h3>
              <p className="text-gray-700">
                Navigate to the homepage of our platform and locate the "Sign Up" button in the top right corner.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                2. Click on "Sign Up"
              </h3>
              <p className="text-gray-700">
                Click the "Sign Up" button to be redirected to the account creation form.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                3. Fill Out the Form
              </h3>
              <p className="text-gray-700">
                Enter your personal details, including your name, email address, and a secure password.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                4. Submit the Form
              </h3>
              <p className="text-gray-700">
                After filling out the form, click the "Create Account" button to complete the process.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-blue-600">
                5. Confirmation
              </h3>
              <p className="text-gray-700">
                You will receive a confirmation email. Follow the link in the email to activate your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateAccount;
