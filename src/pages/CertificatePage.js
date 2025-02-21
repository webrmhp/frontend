import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footur';


const CertificatePage = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [error, setError] = useState(null);

  // Mock function to simulate certificate check
  const checkCertificate = async (rollNumber) => {
    // Replace this with your actual API call
    const mockData = {
      '12345': 'https://example.com/certificate1.pdf',
      '67890': 'https://example.com/certificate2.pdf',
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockData[rollNumber]) {
          resolve(mockData[rollNumber]);
        } else {
          reject('No certificate found for this roll number.');
        }
      }, 1000); // Simulate API delay
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCertificateUrl(null);

    try {
      const url = await checkCertificate(rollNumber);
      setCertificateUrl(url);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Check Your Certificate
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your roll number to view and download your certificate.
            </p>
          </div>

          {/* Roll Number Input Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="rollNumber" className="sr-only">
                  Roll Number
                </label>
                <input
                  id="rollNumber"
                  name="rollNumber"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Check Certificate
              </button>
            </div>
          </form>

          {/* Display Certificate or Error */}
          {certificateUrl && (
            <div className="mt-6 text-center">
              <iframe
                src={certificateUrl}
                className="w-full h-96 border border-gray-300 rounded-lg"
                title="Certificate"
              />
              <a
                href={certificateUrl}
                download="certificate.pdf"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download Certificate
              </a>
            </div>
          )}

          {/* Error Popup */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default CertificatePage;