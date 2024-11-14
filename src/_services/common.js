import axios from "axios";
import { base_url_new } from "../environment/enviroment";
import { getToken } from "../_auth/auth";


export async function unauth_add(endpoint, data) {
    try {
      const response = await axios.post(base_url_new + endpoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data == 401) {
        window.location.href = "/sign";
      }
      return response.data;
     
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

// export async function get(endpoint) {
//   let data = await axios.get(base_url_new + endpoint, {
//     headers: {
//      'Content-Type': 'text/plain',
//       Authorization: `Bearer ` + getToken(),
//     },
//   });
//   console.log(data, "tttttttccccccc");

//   let decrypt_data = data;
//   if (decrypt_data.status === 401) {
//     window.location.href = "/sign";
//   }
//   return decrypt_data;
// }

export async function get(endpoint) {
    try {
     
      const response = await axios.get(base_url_new + endpoint, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${getToken()}`,
        },
      });
  
      console.log(response, "API Response");
  
      
      if (response.status === 401) {
        window.location.href = "/sign";  
        return;  
      }
  
      return response; 
    } catch (error) {
      console.error('Error in GET request:', error);
      
    
      if (error.response && error.response.status === 401) {
        window.location.href = "/sign";  
      } else {
       
        alert("Something went wrong. Please try again later.");
      }
      throw error;  
    }
  }






