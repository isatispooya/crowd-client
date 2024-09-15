/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/services/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'پروفایل',
    path: '/ProfilePage',
    icon: icon('ic_blog'),
  },
  {
    title: 'کیف پول',
    path: '/wallet',
    icon: icon('ic_blog'),
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
];

export default navConfig;
