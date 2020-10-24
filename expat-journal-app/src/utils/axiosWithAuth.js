import axios from "axios";
/////////////////////
//      AXIOS      //
/////////////////////
const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: "https://expatjournalbw1020.herokuapp.com/",
  });
};
export default axiosWithAuth;
