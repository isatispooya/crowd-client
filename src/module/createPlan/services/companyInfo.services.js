import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const CompanyInfoServices = {
  patchInfo: async (data, id) => {
    const isFormData = data instanceof FormData;
    try {
      const headers = {
        Authorization: `Bearer ${getCookie('access')}`,
      };

      if (isFormData) {
        console.log('Sending FormData to:', `${OnRun}/api/cart/step1/${id}`);
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.patch(`${OnRun}/api/cart/step1/${id}/`, data, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
};

export default CompanyInfoServices;
