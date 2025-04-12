import React from 'react';
import { Users, BookOpen, Video, Activity } from 'lucide-react';
import { useSelector } from 'react-redux';
import TruckImage from '../../assets/image/Truck.png';
import Car from '../../assets/image/Mini.png';
const SiteStatesSection = () => {
  const { adminUnReadNotification } = useSelector((state) => state.auth);
  const getVehicleIcon = (vehicleType) => {
    if (!vehicleType) {
      console.warn('vehicleType is undefined or null');
      return null;
    }

    switch (vehicleType.toLowerCase()) {
      case 'car':
        return (
          <img
            src={Car}
            alt='Car'
            className='w-8 h-auto'
          />
        ); // Replace with car image
      case 'bike':
        return '';
        // <img
        //   src={BicycleImage}
        //   alt='Bicycle'
        //   className='w-8 h-auto'
        // />
      case 'commercial vehicle':
        return (
          <img
            src={TruckImage}
            alt='Commercial Vehicle'
            className='w-8 h-auto'
          />
        );

      default:
        return null;
    }
  };
  return (
    <div className='bg-white p-4'>
      <h2 className='text-lg font-semibold mb-4'>States Overview</h2>

      <div className='grid grid-cols-4 gap-4'>
        {/* Active Users */}
        <div className='bg-[#0DC143] shadow-md rounded-2xl border border-gray-200 p-4 text-center text-white'>
          <Users className='mx-auto mb-2' />
          <h3 className='text-sm font-semibold'>Active Users</h3>
          <p className='text-xl'>100</p>
        </div>

        {/* Courses */}
        <div className='bg-[#6359E9] shadow-md rounded-2xl border border-gray-200 p-4 text-center text-white'>
          <BookOpen className='mx-auto mb-2' />
          <h3 className='text-sm font-semibold'>Courses</h3>
          <p className='text-xl'>8</p>
        </div>

        {/* Videos */}
        <div className='bg-[#64CFF6] shadow-md rounded-2xl border border-gray-200 p-4 text-center text-white'>
          <Video className='mx-auto mb-2' />
          <h3 className='text-sm font-semibold'>Videos</h3>
          <p className='text-xl'>44</p>
        </div>

        {/* Activity */}
        <div className='bg-[#0DC143] shadow-md rounded-2xl border border-gray-200 p-4 text-center text-white'>
          <Activity className='mx-auto mb-2' />
          <h3 className='text-sm font-semibold'>Activity</h3>
          <p className='text-xl'>100</p>
        </div>
      </div>
    </div>
  );
};

export default SiteStatesSection;
