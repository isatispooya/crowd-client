/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query';
import { getDashbord } from './api/dashbordapi';


const useGetDashbord = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashbord'],
    queryFn: () =>  getDashbord(),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetDashbord;


// return (
//   <Tooltip
//     title={
//       <div>
//         <Typography variant="body1" fontWeight="bold">
//           {event.details.plan_name}
//         </Typography>
//         <Typography variant="body2">
//           مبلغ: {event.details.amount.toLocaleString()} تومان
//         </Typography>
//         {event.type === '2' ? (
//           <Typography variant="body2">
//             سود مربوطه از مشارکت شما در طرح {event.details.plan_name}.
//           </Typography>
//         ) : (
//           <Typography variant="body2">
//             اصل پول مربوطه از مشارکت شما در طرح {event.details.plan_name}.
//           </Typography>
//         )}
//       </div>
//     }
//     placement="top"
//     arrow
//   >
//     <div
//       style={{
//         backgroundColor: getEventColor(event.type), // تعیین رنگ بر اساس نوع رویداد
//         color: 'white',
//         padding: '5px',
//         borderRadius: '4px',
//         cursor: 'pointer',
//       }}
//     >
//       {event.title}
//     </div>
//   </Tooltip>
// );
