import axios from 'axios';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const CompanyInfoServices = {
  postInfo: async (data) => {
    const isFormData = data instanceof FormData;
    console.log('Sending data as:', isFormData ? 'FormData' : 'JSON');

    try {
      // Create base headers
      const headers = {
        Authorization: `Bearer ${getCookie('access')}`,
      };

      // Set the correct content type based on the data type
      if (isFormData) {
        // For FormData, let axios handle the Content-Type
        // This is important so it can set the correct boundary
        console.log('Using FormData - headers will include boundary');

        // Log FormData contents for debugging
        if (isFormData) {
          console.log('FormData contents:');
          Array.from(data.entries()).forEach(([key, value]) => {
            if (value instanceof File) {
              console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
            } else {
              console.log(`${key}: ${value}`);
            }
          });
        }
      } else {
        // For JSON, explicitly set the Content-Type
        headers['Content-Type'] = 'application/json';
        console.log('Using JSON - Content-Type set to application/json');
      }

      console.log('Request headers:', headers);

      // Create the request
      const response = await axios.post(`${OnRun}/api/cart/step1/`, data, {
        headers,
      });

      console.log('Response received:', response.status);
      return response.data;
    } catch (error) {
      console.error('API error:', error.message);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },
};

export default CompanyInfoServices;
