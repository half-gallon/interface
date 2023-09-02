import axios from "axios";

export const BASE_URL = 'http://192.168.50.243:8000';

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  }
});


export const uploadFile = async (blob: Blob) => {
  const timestamp = Math.floor(Date.now() / 1000);

  let formData = new FormData();
  let fileName = `${timestamp}.wav`;
  formData.append('audio', blob, fileName);

  const {data} = await instance.post('/prove',formData);
  return data;
}
