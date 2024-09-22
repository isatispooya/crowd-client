/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/services/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'داشبورد',
    path: '/dashboard',
    icon: icon('ic_sheet'),
  },
  {
    title: 'پروفایل',
    path: '/ProfilePage',
    icon: icon('ic_blog'),
  },
  {
    title: 'کیف پول',
    path: '/wallet',
    icon: (
      <svg
        style={{ width: '22px', height: '23px', fill: '#000000' }}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
      </svg>
    ),
  },
  {
    title: 'ایجاد و پیگیری درخواست',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'مشاهده طرح ها',
    path: '/plans',
    icon: icon('ic_sheet'),
  },
  {
    title: 'گواهی نامه',
    path: 'certificate',
    icon: icon('ic_sheet'),
  },
];

export default navConfig;
