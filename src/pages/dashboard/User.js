import React, { useState, useEffect } from 'react';
import Ediit from '.././../assets/icons/Ediit';
import Del from '.././../assets/icons/Del';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { routes } from '../../contant';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import {
  setupLMS,
  getUserList,
  createEmployee,
  updateUser,
  deleteUser,
} from '../../redux/action/auth';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [QRCode, setQRCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userslist } = useSelector((state) => state.auth);
  const [lmsStatus, setLmsStatus] = useState(true);
  useEffect(() => {
    dispatch(getUserList());
  }, [1000]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [1000]);

  useEffect(() => {
    let count = 1;
    for (let x = 0; x < userslist?.length; x++) {
      if (userslist[x]?.userType == 'Admin') {
        count = count + 1;
      }
    }
    setFormData({ employeeCode: `A00${count}` });
  }, [userslist]);

  const [editUser, setEditUser] = useState(null);
  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = () => {
    const data = {
      email: editUser?.email,
      name: editUser?.name,
      phone: editUser?.phone,
      userType: editUser?.userType,
    };
    dispatch(updateUser(data, editUser?._id));
    setTimeout(() => dispatch(getUserList()), 2000);
    setEditUser(null);
  };

  const handleExport = () => {
    const exportData = userslist?.map((data) => ({
      _id: data._id,
      email: data?.email,
      phone: data.phone,
      address: data?.address,
      verified: data?.verified,
      userType: data?.userType,
      registerDate: data?.registerDate,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Requests Data');
    XLSX.writeFile(wb, `users_list.xlsx`);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.employeeCode
    ) {
      dispatch(createEmployee(formData));
      setIsModalOpen(false);
      setTimeout(() => dispatch(getUserList()), 2000);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate(routes.signin);
  };

  const [isToolTipOpen, setIsToolTipOpen] = useState(null);
  const openToolTip = (userId) => setIsToolTipOpen(userId);
  const closeToolTip = () => setIsToolTipOpen(null);
  const confirmDelete = (userId) => {
    dispatch(deleteUser(userId));
    setTimeout(() => dispatch(getUserList()), 2000);
    closeToolTip();
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState('');

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <ToastContainer />

      {!loading ? (
        <>
          <div className='flex items-center justify-between bg-[#FFFFFF] p-2'>
            <h1 className='text-2xl font-bold'>Users</h1>
            <div className='ml-auto flex items-center space-x-4'>
              <span
                onClick={() => handleExport()}
                className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg  hover:text-[black] transition-colors duration-300 ease-in-out cursor-pointer'
              >
                Export Excel
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg  hover:text-[black] transition-colors duration-300 ease-in-out cursor-pointer'
              >
                Create Admin
              </button>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto'>
              <thead className='text-gray-600 uppercase text-sm leading-normal'>
                <tr>
                  <th className='py-3 px-6 text-left'>Names</th>
                  <th className='py-3 px-6 text-left'>Emails</th>
                  <th className='py-3 px-6 text-left'>Type</th>
                  <th className='py-3 px-6 text-left'>Registration</th>
                  <th className='py-3 px-6 text-left'>LMS</th>
                  <th className='py-3 px-6 text-center'>Actions</th>
                </tr>
              </thead>

              <tbody className='text-gray-700 text-sm'>
                {userslist?.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <td className='py-3 px-6 text-left flex items-center gap-3'>
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt={user.name}
                          className='w-10 h-10 rounded-full object-cover'
                        />
                      ) : (
                        <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700'>
                          {user.name?.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span>{user.name}</span>
                    </td>

                    <td className='py-3 px-6 text-left'>{user.email}</td>
                    <td className='py-3 px-6 text-left '>
                      <span
                        className={
                          user.userType === 'Admin'
                            ? `p-1 rounded bg-[green] text-[white]`
                            : user.userType === 'Student'
                            ? `p-1 rounded bg-[#1E90FE] text-[white]`
                            : `p-1 rounded bg-[#32CD33] text-[white]`
                        }
                      >
                        {user.userType === 'Student'
                          ? 'Student'
                          : user.userType === 'Admin'
                          ? 'Admin'
                          : 'Admin'}
                      </span>
                    </td>
                    <td className='py-3 px-6 text-left'>
                      {new Date(user.registerDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className='py-3 px-6 text-center'>
                      <div className='flex justify-center space-x-4 relative'>
                        {user?.lmsPassword ? (
                          // LMS Already Setup Icon
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setPassword(user?.lmsPassword);
                              setShowModal(true);
                              setLmsStatus(user?.LMSStatus);
                            }}
                            className={user?.LMSStatus ? 'text-green-600 hover:text-green-800': 'text-[#FF0133] hover:text-[#FF0133]'}
                            title={user?.LMSStatus ? 'LMS is active':'LMS is blocked'}
                          >
                            <i className='fas fa-book-open text-xl'></i>
                          </button>
                        ) : (
                          // Create LMS Icon
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setPassword('');
                              setShowModal(true);
                              setLmsStatus(true);
                            }}
                            className='text-blue-600 hover:text-blue-800'
                            title='Create LMS'
                          >
                            <i className='fas fa-plus-circle text-xl'></i>
                          </button>
                        )}
                      </div>
                    </td>

                    <td className='py-3 px-6 text-center'>
                      <div className='flex justify-center space-x-4 relative'>
                        <button
                          className='text-green-500 hover:text-green-700'
                          onClick={() => handleEdit(user, index)}
                        >
                          <Ediit />
                        </button>
                        <button
                          className='text-red-500 hover:text-red-700'
                          onClick={() => openToolTip(user._id)}
                        >
                          <Del />
                        </button>
                        {isToolTipOpen === user._id && (
                          <div className='absolute top-10 left-[-40px] mt-2 bg-white p-4 rounded shadow-lg border z-[9999]'>
                            <p className='text-gray-700'>
                              Do you really want to delete this user?
                            </p>
                            <div className='flex justify-between mt-4'>
                              <button
                                className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
                                onClick={closeToolTip}
                              >
                                Cancel
                              </button>
                              <button
                                className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                                onClick={() => confirmDelete(user._id)}
                              >
                                OK
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-4 rounded-lg shadow-lg text-center'>
                <h2 className='text-lg font-bold text-center'>QR Code</h2>
                <img
                  className='w-40 h-40 mx-auto my-4'
                  src={QRCode}
                  alt='QR Code'
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className='text-center bg-red-500 text-white px-4 py-2 rounded-md'
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-semibold mb-4'>Set LMS Password</h2>
                <input
                  type='text'
                  className='w-full border border-gray-300 p-2 rounded mb-4'
                  placeholder='Enter new LMS password'
                  disabled
                  value={selectedUser?.email}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type='text'
                  className='w-full border border-gray-300 p-2 rounded mb-4'
                  placeholder='Enter LMS password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex items-center mb-4'>
                  <div className='flex gap-6 items-center mb-4'>
                    Status
                    {/* Active */}
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        type='radio'
                        name='lmsStatus'
                        className='form-radio text-green-500'
                        checked={lmsStatus === true}
                        onChange={() => setLmsStatus(true)}
                      />
                      <span className='ml-2 text-sm text-gray-700'>Active</span>
                    </label>
                    {/* Blocked */}
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        type='radio'
                        name='lmsStatus'
                        className='form-radio text-red-500'
                        checked={lmsStatus === false}
                        onChange={() => setLmsStatus(false)}
                      />
                      <span className='ml-2 text-sm text-gray-700'>
                        Blocked
                      </span>
                    </label>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={() => {
                        dispatch(
                          setupLMS({
                            email: selectedUser.email,
                            password,
                            status: lmsStatus,
                          })
                        );
                        setShowModal(false); // Close modal
                        setPassword(''); // Clear password field
                        setSelectedUser(null); // Reset selected user
                        setTimeout(()=>{
                          dispatch(getUserList())
                        },2000)
                      }}
                      className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    >
                      Save
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setShowModal(false);
                      setPassword('');
                      setSelectedUser(null);
                    }}
                    className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {editUser && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
                <h2 className='text-xl font-bold mb-4'>Edit User</h2>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Name</label>
                  <input
                    type='text'
                    className='w-full p-2 border border-gray-300 rounded'
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-gray-700'>Phone</label>
                  <input
                    type='text'
                    className='w-full p-2 border border-gray-300 rounded'
                    value={editUser.phone}
                    onChange={(e) =>
                      setEditUser({ ...editUser, phone: e.target.value })
                    }
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Email</label>
                  <input
                    type='email'
                    className='w-full p-2 border border-gray-300 rounded'
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                </div>

                <div className='mb-4'>
                  <label className='block text-gray-700'>User Type</label>
                  <select
                    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={editUser.userType}
                    onChange={(e) =>
                      setEditUser({ ...editUser, userType: e.target.value })
                    }
                  >
                    <option
                      value=''
                      disabled
                    >
                      Select a user type
                    </option>
                    <option value='Admin'>Admin</option>
                    <option value='Student'>Student</option>
                  </select>
                </div>

                <div className='flex justify-end'>
                  <button
                    className='px-4 py-2 bg-gray-300 rounded mr-2'
                    onClick={() => setEditUser(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className='px-4 py-2 bg-blue-500 text-white rounded'
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
              onClick={() => setIsModalOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-lg shadow-lg p-6 w-96'
              >
                <h2 className='text-xl font-bold mb-4'>Add Employees</h2>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <input
                      type='text'
                      name='name'
                      placeholder='Enter user name'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Enter user email'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Enter password'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      type='text'
                      disabled
                      name='employeeCode'
                      placeholder='Enter Admin code (e.g., E001)'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.employeeCode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='flex justify-end space-x-2'>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className='absolute bottom-2 right-8'>
            <button
              onClick={logout}
              className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Circles
            height='40'
            width='40'
            color='#1E90FF'
            ariaLabel='loading'
          />
        </div>
      )}
    </div>
  );
};

export default User;
