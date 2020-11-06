/* eslint-disable @typescript-eslint/no-unused-vars */

export const defaultUrl = 'https://pichupido.s3.eu-north-1.amazonaws.com/7609305c-4979-44fe-be57-7c336bd7f6ac.png';

export const deleteImage = async (_url: string): Promise<void> => {
  return;
}

export const uploadImage = async (_photo: string): Promise<string> => {
  return defaultUrl;
};
