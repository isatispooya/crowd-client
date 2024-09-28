import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "src/api/cookie";
import { OnRun } from "src/api/OnRun";



export const getManager = async (cartId) => {
  const access = await getCookie('access');
    if (cartId) {
        const response = await axios.get(`${OnRun}/api/manager/${cartId}/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });
        
        return response.data;
    }
    return null;
};

export const postManager = async ({cartId, sanitizedField}) =>{
        const response =   await axios.post(
        `${OnRun}/api/manager/${cartId}/`,
        {managers :sanitizedField},
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('اطلاعات با موفقیت ارسال شد');
      return response.data    


}
