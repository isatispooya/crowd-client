/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { LuRefreshCw } from 'react-icons/lu';
import Loader from 'src/components/loader';
import ProfileField from '../components/profileField';
// import useGetProfile from '../hooks/useGetProfile';
import Refresh from '../components/refresh';
import useRefreshOTP from '../hooks/useGetOTP';

const Profile = () => {
  const access = getCookie('access');
  const [profileData, setProfileData] = useState(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const { mutate } = useRefreshOTP();

  const getProfile = () => {
    axios
      .get(`${OnRun}/api/information/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  useEffect(getProfile, [access]);

  const openModal = () => {
    // mutate();
    setShowRefresh(true);
  };

  return profileData ? (
    <div className="max-w-8xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">پروفایل کاربر</h1>
        <button
          onClick={openModal}
          className="transition-colors p-3 text-white font-medium hover:scale-110 duration-700"
        >
          <LuRefreshCw className="text-black text-3xl" />
        </button>
      </div>

      {showRefresh && <Refresh setShowRefresh={setShowRefresh} profileData={profileData} />}

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات فردی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileField
            label="نام"
            value={profileData?.acc?.private_person?.[0]?.firstName || ''}
          />
          <ProfileField
            label="نام خانوادگی"
            value={profileData?.acc?.private_person?.[0]?.lastName || ''}
          />
          <ProfileField
            label="نام پدر"
            value={profileData?.acc?.private_person?.[0]?.fatherName || ''}
          />
          <ProfileField
            label="جنسیت"
            value={
              profileData?.acc?.private_person?.[0]?.gender === 'Male'
                ? 'مرد'
                : profileData?.acc?.private_person?.[0]?.gender === 'Female'
                ? 'زن'
                : ''
            }
          />
          <ProfileField
            label="کد ملی"
            value={profileData?.acc?.private_person?.[0]?.shNumber || ''}
          />
          <ProfileField
            label="سریال شناسنامه"
            value={profileData?.acc?.private_person?.[0]?.serial || ''}
          />
          <ProfileField
            label="محل تولد"
            value={profileData?.acc?.private_person?.[0]?.placeOfBirth || ''}
          />
          <ProfileField
            label="محل صدور"
            value={profileData?.acc?.private_person?.[0]?.placeOfIssue || ''}
          />
          <ProfileField label="ایمیل" value={profileData?.acc?.addresses?.[0]?.email || ''} />
          <ProfileField label="فکس" value={profileData?.acc?.addresses?.[0]?.fax || ''} />
          <ProfileField label="شماره موبایل" value={profileData?.acc?.mobile || ''} />
        </div>
      </section>

  
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات بانکی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileField label="بانک" value={profileData.acc.accounts[0].bank || ''} />
          <ProfileField label="شعبه بانک" value={profileData.acc.accounts[0].branchName || ''} />
          <ProfileField label="شماره شبا" value={profileData.acc.accounts[0].sheba || ''} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          اطلاعات شغلی
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileField label="شغل" value={profileData.acc.job_info[0].job || ''} />
          <ProfileField label="نوع شغل" value={profileData.acc.job_info[0].position || ''} />
          <ProfileField label="محل کار" value={profileData.acc.job_info[0].companyAddress || ''} />
          <ProfileField
            label="شماره تلفن محل کار"
            value={profileData.acc.job_info[0].companyPhone || ''}
          />
          <ProfileField
            label="ایمیل محل کار"
            value={profileData.acc.job_info[0].companyEmail || ''}
          />
          <ProfileField
            label="کدپستی محل کار"
            value={profileData.acc.job_info[0].companyPostalCode || ''}
          />
        </div>
      </section>


      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-gray-300">
          آدرس
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileField label="استان" value={profileData.acc.addresses[0].province} />
          <ProfileField label="شهر" value={profileData.acc.addresses[0].city} />
          <ProfileField label="خیابان" value={profileData.acc.addresses[0].remnantAddress} />
          <ProfileField label="کوچه" value={profileData.acc.addresses[0].alley} />
          <ProfileField label="کدپستی" value={profileData.acc.addresses[0].postalCode} />
        </div>
      </section>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;
