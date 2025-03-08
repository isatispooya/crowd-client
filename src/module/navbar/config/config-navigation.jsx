/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/services/svg-color';

import { GoProjectRoadmap } from 'react-icons/go';
import { PiCertificateFill } from 'react-icons/pi';
import { MdModelTraining, MdDashboard } from 'react-icons/md';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'داشبورد',
    path: '/',
    icon: <MdDashboard className="text-2xl" />,
  },
  {
    title: 'پروفایل',
    path: '/ProfilePage',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'ایجاد و پیگیری طرح',
  //   path: '/createPlan',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'مشاهده طرح ها',
    path: '/plans',
    icon: <GoProjectRoadmap className="text-2xl" />,
  },
  {
    title: 'گواهی شراکت',
    path: '/certificate',
    icon: <PiCertificateFill className="text-2xl" />,
  },
  {
    title: 'آموزش',
    path: '/training',
    icon: <MdModelTraining className="text-2xl" />,
  },
];

export default navConfig;
