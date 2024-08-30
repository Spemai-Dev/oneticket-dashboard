export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // return token !== null;
    return true;
  };
  
  export const getToken = () => {
    const token = localStorage.getItem('token');
  
    return token || '';
  };
  
  
  export const deleteToken = () => {
    const token =  localStorage.removeItem('token');
   
    return token !== null;
  };
  