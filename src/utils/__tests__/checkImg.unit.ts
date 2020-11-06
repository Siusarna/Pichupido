import { checkImage } from '../checkImg';
import { badImg, goodImg, invalidImg } from '../../testing.utils/images';

describe('checkImage tests', () => {
  test('should return true if image is okey', async () => {
    const res = await checkImage(goodImg);
    expect(res).toBe(true);
  });

  test('should return false if image is too big', async () => {
    const res = await checkImage(badImg)
    expect(res).toBe(false);
  });

  test('should return false if image is invalid', async () => {
    const res = await checkImage(invalidImg)
    expect(res).toBe(false);
  });
});

