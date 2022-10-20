export const baseUrl = "https://okrmanagement.azurewebsites.net";
// export const baseUrl = "http://localhost:3002";


export const Headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
  
  export const getToken = {
    setToken: function(data) {
      Headers.Authorization = data;
    }
  };
  