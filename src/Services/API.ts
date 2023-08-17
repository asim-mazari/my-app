import axios from "axios";

const baseUrl = "http://localhost:3000"; // Replace with your API base URL

export async function loginUserApi(formData: any) {
  const loginApi = `${baseUrl}/auth/login`;
  try {
    const response = await axios.post(loginApi, formData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in. Please check your credentials.');
  }
}

export async function registerApi(formData: any) {
  const registerUser = `${baseUrl}/register`;
  try {
    const response = await axios.post(registerUser, formData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register user. Please try again later.');
  }
}
