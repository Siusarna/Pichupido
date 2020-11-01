import axios from 'axios';

export const getQrCode = async (data: string): Promise<string> => {
  const response = await axios.request({
    method: 'GET',
    url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`,
    responseType: 'arraybuffer',
  });
  return response.data.toString('base64');
};
