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
  
      // console.log(response, "API Response");
  
      
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

  export async function getIpgReportNew(url) {
    try {
        const fullUrl = `${base_url_new}${url}`; // Construct the full URL

        // Prepare headers
        const httpHeaders = {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${getToken()}`, // Ensure getToken() is implemented correctly
        };

        // Fetch the file data from the API
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: httpHeaders,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch the report: ${response.statusText}`);
        }

        // Process the response stream
        const reader = response.body.getReader();
        const chunks = [];
        let done = false;

        while (!done) {
            const { value, done: isDone } = await reader.read();
            if (value) {
                chunks.push(value);
            }
            done = isDone;
        }

        // Combine all chunks into a single Uint8Array
        const combinedChunks = new Uint8Array(
            chunks.reduce((acc, chunk) => [...acc, ...chunk], [])
        );

        // Create a Blob with the correct MIME type
        const blob = new Blob([combinedChunks], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        // Trigger the file download
        const downloadUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = downloadUrl;
        anchor.download = 'Report.xlsx'; // Set your desired filename
        document.body.appendChild(anchor);
        anchor.click();

        // Clean up
        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(anchor);
    } catch (error) {
        console.error('Error downloading the report:', error);
    }
}









