import { getQrCode } from '../qrCode';
import { checkImage } from '../checkImg';

//jest.unmock('axios');

describe('qrCode test', () => {
  test('should return valid image', async() => {
    const qrCode = await getQrCode('example');
    const isValid = await checkImage(qrCode);
    expect(isValid).toBe(true);
  })
})