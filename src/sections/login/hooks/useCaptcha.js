import axios from "axios";
import { OnRun } from "src/api/OnRun";

// const useCaptcha = () => {
//     axios
//       .get(`${OnRun}/api/captcha/`)
//       .then((response) => {
//         setEncrypted_response(response.data.captcha.encrypted_response);
//         setCaptchaImage(response.data.captcha.image);
//       })
//       .catch((err) => {
//         console.error('error captcha', err);
//       });
//   };