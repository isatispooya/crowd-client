import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const CompanyInfoServices = {
  postInfo: async (data) => {
    const isFormData = data instanceof FormData;
    try {
      const headers = {
        Authorization: `Bearer ${getCookie('access')}`,
      };

      if (isFormData) {
        if (isFormData) {
          Array.from(data.entries()).forEach(([key, value]) => {
            if (value instanceof File) {
              console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
            } else {
              console.log(`${key}: ${value}`);
            }
          });
        }
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.post(`${OnRun}/api/cart/step1/`, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      toast.error('API error:', error.message);
      throw error;
    }
  },
};

export default CompanyInfoServices;
