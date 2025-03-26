import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const CompanyInfoServices = {
  patchInfo: async (data, id) => {
    try {
      const headers = {
        Authorization: `Bearer ${getCookie('access')}`,
      };

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
