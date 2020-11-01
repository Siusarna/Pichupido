import Jimp from 'jimp';

const checkHeightWidthSizeAndExtension = (img: Jimp, byteLength: number) => (
  img.bitmap.height >= 512
  && img.bitmap.height <= 1024
  && img.bitmap.width >= 515
  && img.bitmap.height <= 1024
  && (byteLength / 1e6) <= 1
  && ['png', 'jpeg', 'jpg'].includes(img.getExtension()));

export const checkImage = async (imgBuffer: string): Promise<boolean> => {
  const base64Data = Buffer.from(imgBuffer.replace(/^ ?data:image\/\w+;base64,/, ''), 'base64');
  const img = await Jimp.read(base64Data);
  return checkHeightWidthSizeAndExtension(img, base64Data.length);
};
