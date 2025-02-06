import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyAddToCartCourse,
  removeMyAllCourse,
} from '../redux/action/request';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts?.pdfMake?.vfs;

export default function Cart() {
  const { addToCartCourse } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [total, setTotal] = useState(0);
  const toggleModal = () => {
    setShowInvoiceModal(!showInvoiceModal);
  };

  useEffect(() => {
    dispatch(getMyAddToCartCourse('Pending'));
  }, [1000]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCheckboxChange = (courseId, isChecked) => {
    if (isChecked) {
      setSelectedCourses((prev) => {
        const updatedCourses = [...prev, courseId];
        const course = addToCartCourse.find(
          (course) => course?.courseDetails._id == courseId
        );
        setTotal(total + course?.courseDetails?.prize);
        return updatedCourses; // Update selected courses
      });
    } else {
      // Remove the course ID from the selected courses
      setSelectedCourses((prev) => {
        const updatedCourses = prev.filter((id) => id !== courseId);

        const course = addToCartCourse.find(
          (course) => course?.courseDetails._id == courseId
        );
        setTotal(total - course?.courseDetails?.prize);
        return updatedCourses; // Update selected courses
      });
    }
  };

  const removeCourseFromCart = () => {
    const data = { courseIds: selectedCourses };
    dispatch(removeMyAllCourse(data));
    setTimeout(() => {
      dispatch(getMyAddToCartCourse('Pending'));
      setSelectedCourses([]);
    }, [2000]);
  };

  useEffect(() => {
    console.log(addToCartCourse);
  }, [addToCartCourse]);

  const generateInvoice = () => {
    toggleModal(); // Close the modal after PDF is generated
  };

  const download = () => {
    const totalAmount = addToCartCourse.reduce(
      (total, course) => total + course?.courseDetails?.prize,
      0
    );

    const docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        { text: 'Selected Courses:', style: 'subheader' },
        ...addToCartCourse.map((course) => ({
          text: `${course?.courseDetails?.title} - Rs: ${course?.courseDetails?.prize}`,
          style: 'bodyText',
        })),
        {
          text: `Grand Total: Rs ${totalAmount}`,
          style: 'totalAmount',
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: 'blue',
        },
        subheader: {
          fontSize: 16,
          italics: true,
          margin: [0, 10, 0, 5],
        },
        bodyText: {
          fontSize: 12,
          margin: [0, 5],
        },
        totalAmount: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5],
        },
      },
    };

    // Generate PDF
    pdfMake.createPdf(docDefinition).download('invoice.pdf');
  };
  return (
    <>
      <ToastContainer />
      <section className='cart-area min-h-screen'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap'>
            {/* Product List */}
            <div className='w-full lg:w-8/12'>
              <div className='product-list overflow-x-auto bg-white p-3 rounded-lg shadow-lg'>
                <table className='table-auto border border-gray-300 w-full'>
                  <thead>
                    <tr>
                      <td
                        colSpan='4'
                        className='text-red-600 text-center py-4 font-medium border-b border-gray-300'
                      >
                        Finally, you have selected your course. Now click on the
                        <strong> GENERATE INVOICE </strong> button to get your
                        fee slip.
                      </td>
                    </tr>
                    <tr className='bg-gray-200'>
                      <th className='p-3 text-left'>Action</th>
                      <th className='p-3 text-left'>Thumbnail</th>
                      <th className='p-3 text-left'>Course</th>
                      <th className='p-3 text-left'>Duration</th>
                      <th className='p-3 text-left'>Fee</th>
                    </tr>
                  </thead>
                  {addToCartCourse.length > 0 ? (
                    <tbody>
                      {addToCartCourse.map((course) => (
                        <tr
                          key={course.id}
                          className='border-b border-gray-300'
                        >
                          <td className='p-3 text-center'>
                            <input
                              type='checkbox'
                              className='form-checkbox h-5 w-5 text-blue-600'
                              onChange={(e) =>
                                handleCheckboxChange(
                                  course?.courseDetails?._id,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td className='p-3'>
                            <a href='#!'>
                              <img
                                src={course?.courseDetails.courseImage}
                                alt={course?.courseDetails?.title}
                                className='w-16 h-16 object-cover rounded'
                              />
                            </a>
                          </td>
                          <td className='p-3'>
                            <a
                              href='#!'
                              className='text-blue-500 hover:underline hover:text-blue-700 no-underline'
                            >
                              {course?.courseDetails?.title}
                            </a>
                          </td>
                          <td className='p-3 text-gray-800'>
                            {' '}
                            {course?.courseDetails?.duration}
                          </td>

                          <td className='p-3 text-gray-800'>
                            Rs: {course?.courseDetails?.prize}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <body className='relative left-[200%] text-center'>
                      <small>No course yet enrolled </small>
                    </body>
                  )}
                </table>

                {/* Actions */}
                <div className='actions flex justify-between mt-4'>
                  <form
                    action='#!'
                    className='flex items-center gap-2'
                    onSubmit={(e) => e.preventDefault()}
                  ></form>
                  <a
                    onClick={() => {
                      if (selectedCourses.length > 0) removeCourseFromCart();
                    }}
                    className={`px-4 py-2 rounded transition-colors no-underline ${
                      selectedCourses.length === 0
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-800 cursor-pointer'
                    }`}
                    style={{
                      pointerEvents:
                        selectedCourses.length === 0 ? 'none' : 'auto',
                    }}
                  >
                    Remove From Cart
                  </a>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className='w-full lg:w-4/12 px-4 mt-8 lg:mt-0'>
              <div className='cart-summary bg-white p-6 rounded-lg shadow-lg'>
                <div className='cs-title text-center mb-4'>
                  <h5 className='text-2xl font-bold text-gray-700'>
                    Cart Summary
                  </h5>
                </div>
                <div className='cs-content'>
                  <ul className='list-none mb-4'>
                    <li className='flex justify-between py-2 text-gray-600'>
                      <span>Sub Total</span>
                      <span>{total}</span>
                    </li>
                    <li className='flex justify-between py-2 text-gray-600'>
                      <span>Discount (0%)</span>
                      <span>0</span>
                    </li>
                  </ul>
                  <p className='cart-total flex justify-between text-lg font-bold border-t border-gray-300 pt-4 text-gray-700'>
                    <span>Grand Total</span>
                    <span>{total}</span>
                  </p>
                  <button
                    className={`px-4 py-2 rounded transition-colors no-underline ${
                      selectedCourses.length === 0
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 text-white hover:bg-gray-800 cursor-pointer'
                    }`}
                    style={{
                      pointerEvents:
                        selectedCourses.length === 0 ? 'none' : 'auto',
                    }}
                    onClick={generateInvoice}
                  >
                    <i className='las la-file-invoice text-xl'></i> Generate
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Modal */}
        {showInvoiceModal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
              <h3 className='text-xl font-bold mb-4 text-gray-800'>Invoice</h3>
              <p className='text-gray-600 mb-4'>
                Your invoice has been successfully generated! Download or print
                your fee slip below.
              </p>
              <div className='flex justify-end gap-4'>
                <button
                  className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
                  onClick={toggleModal}
                >
                  Close
                </button>
                <a
                  onClick={() => download()}
                  className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                  download
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
