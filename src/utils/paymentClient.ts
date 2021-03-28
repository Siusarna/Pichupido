import axios from 'axios';

export const pay: (input: { amount: number, currency: string }) => Promise<{ id: string, client_secret: string }> = async (input) => {
  // const response1 = await axios.post('http://127.0.0.1:5000/api/payment/delay', JSON.stringify({
  //     delay: 5000,
  //   }), { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    await axios.post('http://10.103.109.201:5000/api/payment/pay', JSON.stringify({
      price: input.amount,
      balance: 200000,
    }), { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

  return {
    id: 'pi_1IZQ0OD2ybAp44H7GAZacKMD',
    client_secret: 'pi_1IZQ0OD2ybAp44H7GAZacKMD_secret_VHe5JmvANPVNaP5wuO6JgkWc8',
  };
};
