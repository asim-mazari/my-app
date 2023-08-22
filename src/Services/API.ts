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

export async function checkToken(tokenObject: any) {
  const registerUser = `${baseUrl}/auth/check-token`;
  try {
    const response = await axios.post(registerUser, tokenObject);
    return response.data;
  } catch (error) {
    throw new Error('Incorrect token. Please try again later.');
  }
}


export async function companyInformation(data1: any) {
  const companyData = `${baseUrl}/company`;
  try {
    const response = await axios.post(companyData, data1);
    return response.data;
  } catch (error) {
    throw new Error(' Please try again later.');
  }
}

export async function removeInfo(data1: any) {
  const companyData = `${baseUrl}/company/delete`;
  try {
    const response = await axios.delete(companyData, data1);
    return response.data;
  } catch (error) {
    throw new Error('Invalid Id Please try again later.');
  }
}
export async function getInfo() {
  const companyData = `${baseUrl}/company/fetchinfo`;
  try {
    const response = await axios.get(companyData);
    return response.data;
  } catch (error:any) {
    throw new Error(error.response?.data?.message || 'Please try again later.');
  }
}

