import axios from "axios";

const BASE_URL = '';

export const uploadFile = async (blob: Blob) => {
  const timestamp = Math.floor(Date.now() / 1000);

  let formData = new FormData();
  let fileName = `${timestamp}.wav`;
  formData.append('file', blob, fileName);

  let axiosConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    }
  }
  // return await fetch(BASE_URL + '/upload', {
  //   method: "POST",
  //   body: formData,
  // });
  return await axios.post(BASE_URL + '/regUser',formData, axiosConfig);
}
