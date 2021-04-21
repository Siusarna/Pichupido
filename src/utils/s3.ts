import AWS from 'aws-sdk';
import { DeleteObjectRequest } from 'aws-sdk/clients/s3';
import config from 'config';
import { v4 as uuidv4 } from 'uuid';

const s3conf: {
  bucketName: string,
} = config.get('aws');

const s3 = new AWS.S3({
  region: 'eu-north-1',
  accessKeyId: 'AKIA43CQWWEMP3ZFIJD7',
  secretAccessKey: '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'
});

export const deleteImage = async (url: string): Promise<void> => {
  const name = url
    .split('/').pop();
  if (!name) throw new Error('Invalid image url');
  const params: DeleteObjectRequest = {
    Bucket: s3conf.bucketName,
    Key: name,
  }
  await s3.deleteObject(params).promise();
}

export const uploadImage = async (photo: string): Promise<string> => {
  try {
    const base64Data = Buffer.from(photo.replace(/^ ?data:image\/\w+;base64,/, ''), 'base64');
    const type = photo.split(';')[0].split('/')[1] || 'png';
    const name = uuidv4();
    const uploadParams = {
      Bucket: s3conf.bucketName,
      Key: `${name}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };
    const { Location } = await s3.upload(uploadParams)
      .promise();
    return Location;
  } catch (error) {
    throw new Error(error.message);
  }
};
