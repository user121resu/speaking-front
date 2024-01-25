// export const API = "https://speaking-obie.onrender.com/api/v1"; //global
export const API = "http://localhost:8080/api/v1"; // local

export const token = {
    'Authorization': `Bearer ${localStorage.getItem("token")}`
}